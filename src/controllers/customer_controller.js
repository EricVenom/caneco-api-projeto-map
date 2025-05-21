import pool from "../services/db.js";

const cadastrarCliente = async (req, res) => {
    const { cpf, first_name, last_name } = req.body;

    if (!cpf || !first_name || !last_name) {
        return res.status(400).json({
            error: "Todos os campos são obrigatórios."
        })
    }

    try {
        const query = `
            INSERT INTO tb_customer (cpf, first_name, last_name)
            VALUES ($1, $2, $3)
            RETURNING *;
        `

        const values = [cpf, first_name, last_name]
        const result = await pool.query(query, values)

        res.status(201).json({
            message: `Cliente cadastrado com sucesso.`,
            cliente: result.rows[0]
        })
    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({ falha: "CPF já cadastrado." })
        }

        console.error(error)
        res.status(500).json({ falha: "Erro ao cadastrar cliente." })
    }
}

export default cadastrarCliente