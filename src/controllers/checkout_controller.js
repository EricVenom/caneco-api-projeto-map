import pool from '../services/db.js';
import { v4 as uuidv4 } from 'uuid';

export const realizarCheckout = async (req, res) => {
    const { customer_cpf, items } = req.body;

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
            checkout_code, customer_cpf, sale_day, sale_month, sale_year, sale_hour, sale_minute, total_price
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
        }

        await client.query(insertCheckoutQuery, [
            checkoutCode,
            customer_cpf,
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
