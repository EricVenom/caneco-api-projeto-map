import { Router } from "express";
import cadastrarCliente from "../controllers/costumer_controller.js";

const router = Router();

/**
 * @swagger
 * /cadastrar-cliente:
 *   post:
 *     summary: Cadastra um novo cliente
 *     tags:
 *       - Clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cpf
 *               - first_name
 *               - last_name
 *             properties:
 *               nome:
 *                 type: string
 *                 example: 111.111.111-11
 *               first_name:
 *                 type: string
 *                 example: Raul
 *               last_name:
 *                 type: string
 *                 example: Sousa
 *     responses:
 *       201:
 *         description: Cliente cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Cliente cadastrado com sucesso.
 *       400:
 *         description: Dados inválidos fornecidos.
 *       500:
 *         description: Erro interno do servidor.
 */

router.post("/cadastrar-cliente", cadastrarCliente);

export default router;