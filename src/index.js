import express, { json } from "express";
import dotenv from 'dotenv';
import customerRoute from './routes/customer_route.js';

dotenv.config();

const app = express()
const port = 3000

app.use(json());

app.use("/", customerRoute)

app.listen(port, () => {
    console.log(`App está executando na porta ${port}. \ndotenv: ${process.env.DB_URL}`)
})