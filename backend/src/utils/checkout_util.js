export const calcularPrecoOriginal = async (client, items) => {
    let total = 0;
    for (let item of items) {
        const result = await client.query(
            'SELECT price FROM tb_product WHERE id_product = $1',
            [item.id_product]
        );
        if (result.rows.length === 0) {
            throw new Error(`Produto com ID ${item.id_product} não encontrado`);
        }
        const price = result.rows[0].price;
        total += price * item.quantity;
    }
    return total;
};

export const aplicarDescontoParaClientesCadastrados = (calcularPrecoFn) => {
    return async (client, items, costumer_cpf) => {
        let total = await calcularPrecoFn(client, items);

        if (costumer_cpf) {
            const result = await client.query(
                "SELECT * FROM tb_costumer WHERE cpf = $1",
                [costumer_cpf]
            );
            if (result.rows.length !== 0) {
                total *= 0.95;
            }
        }

        return parseFloat(total.toFixed(2));
    };
};