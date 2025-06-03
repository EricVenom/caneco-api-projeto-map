import { Router } from "express";
import { autenticarToken } from '../middlewares/auth_middleware.js';
import {
    realizarCheckout,
    processarPagamento,
    mostrarHistoricoVendas,
    emitirNotaFiscal
} from '../controllers/checkout_controller.js';

import { conferirPagamento } from '../middlewares/payment_middleware.js';

const router = Router();

/**
 * @swagger
 * /checkout/realizar-checkout:
 *   post:
 *     summary: Realiza um novo checkout
 *     tags:
 *       - Checkout
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               costumer_cpf:
 *                 type: integer
 *                 example: 33333333333
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_product:
 *                       type: integer
 *                       example: 2
 *                     quantity:
 *                       type: integer
 *                       example: 7
 *     responses:
 *       200:
 *         description: Checkout realizado com sucesso.
 *       500:
 *         description: Erro ao realizar checkout.
 */

router.post("/checkout/realizar-checkout", autenticarToken, realizarCheckout);

/**
 * @swagger
 * /checkout/realizar-pagamento/{checkout_code}:
 *   post:
 *     summary: Processa o pagamento de um checkout específico
 *     tags:
 *       - Checkout
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: checkout_code
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do checkout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               metodo_pagamento:
 *                 type: string
 *                 example: cartão
 *               valor:
 *                 type: number
 *                 example: 99.99
 *     responses:
 *       200:
 *         description: Pagamento processado com sucesso.
 *       400:
 *         description: Erro ao processar pagamento.
 *       401:
 *         description: Não autorizado.
 */

router.post("/checkout/realizar-pagamento/:checkout_code", autenticarToken, conferirPagamento, processarPagamento);

/**
 * @swagger
 * /checkout/mostrar-historico:
 *   get:
 *     summary: Mostra o histórico de vendas finalizadas
 *     tags:
 *       - Checkout
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vendas retornada com sucesso.
 *       401:
 *         description: Não autorizado.
 */

router.get("/checkout/mostrar-historico", autenticarToken, mostrarHistoricoVendas);

/**
 * @swagger
 * /checkout/emitir-nota/{checkout_code}:
 *   get:
 *     summary: Emite uma nota fiscal para o checkout especificado
 *     tags:
 *       - Checkout
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: checkout_code
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do checkout
 *     responses:
 *       200:
 *         description: Nota fiscal emitida com sucesso.
 *       404:
 *         description: Checkout não encontrado.
 *       401:
 *         description: Não autorizado.
 */

router.get("/checkout/emitir-nota/:checkout_code", autenticarToken, emitirNotaFiscal);

export default router;