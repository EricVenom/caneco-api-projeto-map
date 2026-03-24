import pool from '../services/db.js';
import { v4 as uuidv4 } from 'uuid';
import { calcularPrecoOriginal, aplicarDescontoParaClientesCadastrados } from '../utils/checkout_util.js';
import { formatarCPF } from '../utils/validators.js';

export const verificarCPF = async (req, res) => {
    try {
        const client = await pool.connect();
        await client.query('BEGIN');
        const { cpf } = req.params;

        if (cpf) {
            const { rows } = await client.query(
                'SELECT cpf FROM tb_costumer WHERE cpf = $1',
                [cpf]
            );
            await client.query('COMMIT');

            if (rows.length > 0) {
                const cpfCadastrado = rows[0].cpf;
                return res.status(200).json({ cpf: cpfCadastrado });
            }
                else {
                return res.status(404).json({ message: 'CPF não encontrado.' });
            }
            
        }
        else{
            return res.status(400).json({ message: 'CPF não fornecido.' });
        }
        
    } catch (error) {
        console.error('Erro ao verificar CPF:', error);
        return res.status(500).json({ message: 'Erro ao verificar CPF.' });
    };
};


export const realizarCheckout = async (req, res) => {
    const { costumer_cpf, items } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'Carrinho vazio' });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const checkoutCode = uuidv4();

        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = String(now.getFullYear());
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');

        const calcularPrecoComDesconto = aplicarDescontoParaClientesCadastrados(calcularPrecoOriginal);

        const cpfFormatado = formatarCPF(costumer_cpf)
        const totalPrice = await calcularPrecoComDesconto(client, items, cpfFormatado);

        let cpfValido = null;
        if (cpfFormatado) {
            const { rows } = await client.query(
                'SELECT cpf FROM tb_costumer WHERE cpf = $1',
                [cpfFormatado]
            );

            if (rows.length > 0) {
                cpfValido = rows[0].cpf;
            }
        }

        const insertCheckoutQuery = `
            INSERT INTO tb_checkout (
                checkout_code, costumer_cpf, sale_day, sale_month, sale_year, sale_hour, sale_minute, total_price
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

        await client.query(insertCheckoutQuery, [
            checkoutCode,
            cpfValido,
            day,
            month,
            year,
            hour,
            minute,
            totalPrice
        ]);

        const insertSaleQuery = `
            INSERT INTO tb_sale (quantity, id_product, checkout_code)
            VALUES ($1, $2, $3)
        `;

        for (let item of items) {
            await client.query(insertSaleQuery, [
                item.quantity,
                item.id_product,
                checkoutCode
            ]);
        }

        await client.query('COMMIT');

        return res.status(200).json({
            message: 'Compra realizada com sucesso.',
            checkout_code: checkoutCode
        });


    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Erro no checkout:', error);
        return res.status(500).json({ message: 'Erro ao realizar checkout' });
    } finally {
        client.release();
    }
};

export const processarPagamento = async (req, res) => {
    const { checkout_code } = req.params;
    const { pagamentos } = req.body;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        for (let i = 0; i < pagamentos.length; i++) {
            const { payment_method, payment_amount } = pagamentos[i];
            const status = i === pagamentos.length - 1 ? 'FINALIZADO' : 'EM ANDAMENTO';

            await client.query(
                `
                INSERT INTO tb_payment (checkout_code, payment_method, payment_amount, payment_status)
                VALUES ($1, $2, $3, $4)
                `,
                [checkout_code, payment_method, payment_amount, status]
            );
        }

        await client.query('COMMIT');

        return res.status(200).json({ message: 'Pagamento realizado com sucesso.' });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Erro no processamento do pagamento:', error);
        return res.status(500).json({ message: 'Erro no processamento do pagamento.' });
    } finally {
        client.release();
    }
};

export const mostrarHistoricoVendas = async (req, res) => {
    try {
        const { data_inicial, data_final } = req.query;

        const hasInicial = typeof data_inicial === 'string' && data_inicial.trim().length > 0;
        const hasFinal = typeof data_final === 'string' && data_final.trim().length > 0;

        const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (hasInicial && !isoDateRegex.test(data_inicial.trim())) {
            return res.status(400).json({ message: 'data_inicial inválida. Use YYYY-MM-DD.' });
        }
        if (hasFinal && !isoDateRegex.test(data_final.trim())) {
            return res.status(400).json({ message: 'data_final inválida. Use YYYY-MM-DD.' });
        }

        const params = [];
        let whereDate = '';

        if (hasInicial && hasFinal) {
            params.push(data_inicial.trim(), data_final.trim());
            whereDate = `
                WHERE make_date(ch.sale_year::int, ch.sale_month::int, ch.sale_day::int)
                  BETWEEN $1::date AND $2::date
            `;
        } else if (hasInicial) {
            params.push(data_inicial.trim());
            whereDate = `
                WHERE make_date(ch.sale_year::int, ch.sale_month::int, ch.sale_day::int)
                  >= $1::date
            `;
        } else if (hasFinal) {
            params.push(data_final.trim());
            whereDate = `
                WHERE make_date(ch.sale_year::int, ch.sale_month::int, ch.sale_day::int)
                  <= $1::date
            `;
        }

        const query = `
            WITH tb_pagos AS (
                SELECT *
                FROM tb_payment
                WHERE payment_status = 'FINALIZADO'
            )
            SELECT ch.*, p.payment_status
            FROM tb_checkout AS ch
            INNER JOIN tb_pagos AS p ON ch.checkout_code = p.checkout_code
            ${whereDate}
            ORDER BY concat(
                ch.sale_year,
                lpad(ch.sale_month::text, 2, '0'),
                lpad(ch.sale_day::text, 2, '0'),
                lpad(ch.sale_hour::text, 2, '0'),
                lpad(ch.sale_minute::text, 2, '0')
            ) DESC
            LIMIT 20;
        `;

        const { rows } = await pool.query(query, params);
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar histórico de vendas:', error);
        return res.status(500).json({ message: 'Erro ao buscar histórico de vendas.' });
    }
};

export const emitirNotaFiscal = async (req, res) => {
    const { checkout_code } = req.params;

    if (!checkout_code) {
        return res.status(400).json({ error: "É necessário informar o checkout_code." });
    }

    try {
        const { rows } = await pool.query(`
            SELECT 
                ch.checkout_code,
                ch.costumer_cpf AS cpf,
                CONCAT(ch.sale_year, '/', ch.sale_month, '/', ch.sale_day) AS sale_date,
                CONCAT(ch.sale_hour, ':', ch.sale_minute) AS sale_time,
                s.id_product,
                p.name as product_name,
                s.quantity,
                p.price,
                ch.total_price 
            FROM tb_checkout ch
            LEFT JOIN tb_sale s ON ch.checkout_code = s.checkout_code
            LEFT JOIN tb_product p ON s.id_product = p.id_product
            WHERE ch.checkout_code = $1;
        `, [checkout_code]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Nota fiscal não encontrada para este checkout_code." });
        }

        const { cpf, checkout_code: code, sale_date, sale_time, total_price } = rows[0];

        const produtos = rows
            .filter(row => row.id_product !== null)
            .map(row => ({
                id_product: row.id_product,
                product_name: row.product_name,
                price_unit: row.price,
                quantity: row.quantity
            }));

        const notaFiscal = {
            client_cpf: cpf,
            checkout_code: code,
            sale_date,
            sale_time,
            total_price,
            products: produtos
        };

        return res.status(200).json({ notaFiscal });
    } catch (error) {
        console.error('Erro ao emitir nota fiscal:', error);
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
};
