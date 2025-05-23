import pool from '../services/db.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();
const senhaJwt = process.env.JWT_PASSWORD;

export const cadastrarNovoOperador = async (req, res) => {
    const { cpf, password, first_name } = req.body;
    if (!cpf || !password || !first_name) {
        return res.status(401).json({ error: "Todos os campos devem ser preenchidos." });
    }

    try {
        const senhaEncriptada = await bcrypt.hash(password, 10);
        const query = `INSERT INTO tb_cashier(cpf, password, first_name, total_checkout) VALUES ($1, $2, $3, $4) RETURNING *`;
        const result = await pool.query(query, [cpf, senhaEncriptada, first_name, 0]);

        return res.status(201).json({
            message: "Operador(a) cadastrado(a) com sucesso.",
            admin: result.rows[0]
        });
    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({ falha: "CPF já cadastrado." })
        }

        console.error(error)
        res.status(500).json({ falha: "Erro ao cadastrar operador." })
    }
}

export const logarOperador = async (req, res) => {
    const { cpf, password } = req.body;
    if (!cpf || !password) {
        return res.status(401).json({ error: "É preciso preencher todos os campos." })
    }

    try {
        const query = `
            SELECT * FROM tb_cashier WHERE cpf = $1
        `
        const { rows: [cashier] } = await pool.query(query, [cpf]);

        const senhaDecriptada = await bcrypt.compare(password, cashier.password);
        if (!senhaDecriptada) {
            res.status(401).json({ message: "Senha incorreta." })
        }

        const token = jwt.sign({
            cpf: cashier.cpf,
            first_name: cashier.first_name,
            total_checkout: cashier.total_checkout
        },
            senhaJwt,
            { expiresIn: '2h' }
        )

        return res.status(200).json({
            message: "Autenticado com sucesso.",
            token
        });
    } catch (error) {
        console.error(error);
    }
}