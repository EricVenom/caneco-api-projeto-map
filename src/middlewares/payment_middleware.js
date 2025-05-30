import pool from '../services/db.js';

export const conferirPagamento = async (req, res, next) => {
    const { checkout_code } = req.params;
    const { pagamentos } = req.body;

    if (!pagamentos || !Array.isArray(pagamentos) || pagamentos.length === 0) {
        return res.status(400).json({ message: 'É necessário informar pelo menos um pagamento.' });
    }

    const client = await pool.connect();

    try {
        const checkoutResult = await client.query(
            'SELECT total_price FROM tb_checkout WHERE checkout_code = $1',
            [checkout_code]
        );

        if (checkoutResult.rows.length === 0) {
            return res.status(404).json({ message: 'Checkout não encontrado.' });
        }

        const totalPrice = parseFloat(checkoutResult.rows[0].total_price);

        const somaPagamentos = pagamentos.reduce(
            (acc, curr) => acc + parseFloat(curr.payment_amount),
            0
        );

        if (somaPagamentos < totalPrice) {
            await client.query(
                `
                UPDATE tb_payment 
                SET payment_status = 'CANCELADO' 
                WHERE checkout_code = $1 AND payment_status != 'CANCELADO'
                `,
                [checkout_code]
            );

            return res.status(400).json({
                message: `Valor insuficiente. Pagamento cancelado. Total necessário: ${totalPrice}.`
            });
        }

        if (somaPagamentos > totalPrice) {
            return res.status(400).json({
                message: `Valor excedente. Você deve pagar exatamente ${totalPrice}.`
            });
        }

        next();

    } catch (error) {
        console.error('Erro na conferência de pagamento:', error);
        return res.status(500).json({ message: 'Erro na conferência de pagamento.' });
    } finally {
        client.release();
    }
};
