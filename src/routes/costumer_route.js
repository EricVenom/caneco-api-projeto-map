import { Router } from "express";
import cadastrarCliente from "../controllers/costumer_controller.js";

const router = Router();

router.post("/cadastrar-cliente", cadastrarCliente);

export default router;