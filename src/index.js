import express, { json } from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const port = 3000

app.use(json());

app.get("/", (req, res) => {
    res.send(`${process.env.DB_URL}`)
})

app.post("/cadastro", (req, res) => {
    const { nome, email } = req.body
    return res.json({
        nome, email
    })
})

app.listen(port, () => {
    console.log(`App está executando na porta ${port}.`)
})