import pool from "../services/db.js";
import { formatarCPF } from "../utils/validators.js";

const cadastrarCliente = async (req, res) => {
    const { cpf, first_name, last_name } = req.body;

    if (!cpf || !first_name || !last_name) {
        return res.status(400).json({
            error: "Todos os campos são obrigatórios."
        })
    }
    const cpfFormatado = formatarCPF(cpf)
    try {
        const query = `
            INSERT INTO tb_costumer (cpf, first_name, last_name)
            VALUES ($1, $2, $3)
            RETURNING *;
        `

        const values = [cpfFormatado, first_name, last_name]
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