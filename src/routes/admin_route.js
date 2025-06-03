import { Router } from 'express';
import { autenticarToken } from "../middlewares/auth_middleware.js";
import {
    cadastrarNovoOperador,
    logarOperador,
    mostrarInfoOperador,
    adicionarSaldoCaixa,
    substrairSaldoCaixa
} from "../controllers/admin_controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Administrador
 *   description: Operações-mestre relacionadas a API
 */

/**
 * @swagger
 * /admin/cadastrar-operador:
 *   post:
 *     summary: Cadastra um novo operador
 *     tags:
 *       - Administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: operador1
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Operador cadastrado com sucesso.
 *       400:
 *         description: CPF já cadastrado.
 *       500:
 *         description: Erro ao cadastrar operador.
 */

router.post("/admin/cadastrar-operador", cadastrarNovoOperador);

/**
 * @swagger
 * /admin/logar:
 *   post:
 *     summary: Realiza login do operador
 *     tags:
 *       - Administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: operador1
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Autenticado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5..."
 *       401:
 *         description: Credenciais inválidas.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno ao realizar login.
 */

router.post("/admin/logar", logarOperador);

/**
 * @swagger
 * /admin/mostrar-operador:
 *   get:
 *     summary: Retorna as informações do operador logado
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações do operador retornadas com sucesso.
 *       500:
 *         description: Erro ao buscar informações do operador.
 */

router.get("/admin/mostrar-operador", autenticarToken, mostrarInfoOperador);

/**
 * @swagger
 * /admin/adicionar-saldo:
 *   put:
 *     summary: Adiciona saldo ao caixa
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *                 example: 100.00
 *     responses:
 *       200:
 *         description: Saldo adicionado com sucesso.
 *       500:
 *         description: Erro ao adicionar saldo.
 */

router.put("/admin/adicionar-saldo", autenticarToken, adicionarSaldoCaixa);

/**
 * @swagger
 * /admin/subtrair-saldo:
 *   put:
 *     summary: Subtrai saldo do caixa
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *                 example: 50.00
 *     responses:
 *       200:
 *         description: Saldo subtraído com sucesso.
 *       400:
 *         description: Valor inválido.
 *       500:
 *         description: Erro ao subtrair saldo.
 */

router.put("/admin/subtrair-saldo", autenticarToken, substrairSaldoCaixa);

export default router;
