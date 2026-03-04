import express, { json } from "express";
import dotenv from 'dotenv';
import customerRoute from './routes/costumer_route.js';
import categoryRoute from './routes/category_route.js';
import checkoutRoute from './routes/checkout_route.js';
import adminRoute from './routes/admin_route.js';
import { swaggerUi, swaggerSpec } from "./config/swaggerConfig.js";
import cors from 'cors';
dotenv.config();

const app = express()
const port = 3000
const server = swaggerSpec.servers?.[0].url

app.use(cors())
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", customerRoute);
app.use("/", categoryRoute);
app.use("/", checkoutRoute);
app.use("/", adminRoute);

app.listen(port, () => {
    console.log(`App está executando na porta ${port}.`)
    console.log(`Documentação disponível em ${server}/api-docs`);
})