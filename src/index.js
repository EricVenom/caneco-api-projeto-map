const express = require("express")
const app = express()
const port = 3000

app.use(express.json());

app.get("/", (req, res) => {
    res.send("olá, mundo!")
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