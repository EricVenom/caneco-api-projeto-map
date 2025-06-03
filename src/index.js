import express, { json } from "express";
import dotenv from 'dotenv';
import customerRoute from './routes/costumer_route.js';
import categoryRoute from './routes/category_route.js';
import checkoutRoute from './routes/checkout_route.js';
import adminRoute from './routes/admin_route.js';
import { swaggerUi, swaggerSpec } from "./config/swaggerConfig.js";

dotenv.config();

const app = express()
const port = 3000

app.use(json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", customerRoute);
app.use("/", categoryRoute);
app.use("/", checkoutRoute);
app.use("/", adminRoute);

app.listen(port, () => {
    console.log(`App está executando na porta ${port}.`)
    console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
})