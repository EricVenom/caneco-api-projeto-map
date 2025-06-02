import pool from '../services/db.js';
import { v4 as uuidv4 } from 'uuid';

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

        const insertCheckoutQuery = `
        INSERT INTO tb_checkout (
            checkout_code, costumer_cpf, sale_day, sale_month, sale_year, sale_hour, sale_minute, total_price
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

        let totalPrice = 0;

        for (let item of items) {
            const result = await client.query(
                'SELECT price FROM tb_product WHERE id_product = $1',
                [item.id_product]
            );

            if (result.rows.length === 0) {
                throw new Error(`Produto com ID ${item.id_product} não encontrado`);
            }

            const price = result.rows[0].price;
            totalPrice += price * item.quantity;
            
            if (costumer_cpf){
                //checar se tem no bd para aplicar o desconto
                totalPrice = totalPrice * 0.95
            }
        }

        await client.query(insertCheckoutQuery, [
            checkoutCode,
            costumer_cpf,
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

        return res.status(201).json({
            message: 'Checkout realizado com sucesso',
            checkout_code: checkoutCode,
            total_price: totalPrice
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

        for (let pagamento = 0; pagamento < pagamentos.length; pagamento++) {
            const { payment_method, payment_amount } = pagamentos[pagamento];
            const status = pagamento === pagamentos.length - 1 ? 'FINALIZADO' : 'EM ANDAMENTO';

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
    const query = `
        SELECT * FROM tb_checkout
        ORDER BY concat(sale_year, sale_month, sale_day, sale_hour, sale_minute) DESC
        LIMIT 20
    `;
    const { rows } = await pool.query(query);
    return res.status(200).json(rows)
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
        console.error(error);
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
};

