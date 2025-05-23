import express, { json } from "express";
import dotenv from 'dotenv';
import customerRoute from './routes/customer_route.js';
import categoryRoute from './routes/category_route.js';
import checkoutRoute from './routes/checkout_route.js';
import adminRoute from './routes/admin_route.js';

dotenv.config();

const app = express()
const port = 3000

app.use(json());

app.use("/", customerRoute);
app.use("/", categoryRoute);
app.use("/", checkoutRoute);
app.use("/", adminRoute);

app.listen(port, () => {
    console.log(`App está executando na porta ${port}.`)
})