import { Router } from 'express';
import { autenticarToken } from "../middlewares/auth_middleware.js";
import { listarCategorias, listarProdutosPorCategoria } from '../controllers/category_controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Operações relacionadas a categorias de produtos
 */

/**
 * @swagger
 * /listar-categorias:
 *   get:
 *     summary: Lista todas as categorias disponíveis
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: Bebidas
 */

router.get("/listar-categorias", autenticarToken, listarCategorias);

/**
 * @swagger
 * /listar-produtos/{id_categoria}:
 *   get:
 *     summary: Lista os produtos de uma categoria específica
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria desejada
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de produtos da categoria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 10
 *                   nome:
 *                     type: string
 *                     example: Coca-Cola 2L
 *                   preco:
 *                     type: number
 *                     format: float
 *                     example: 7.99
 *       404:
 *         description: Nenhum produto nessa categoria.
 *       500:
 *         description: Erro interno ao buscar produtos.
 */

router.get("/listar-produtos/:id_categoria/", autenticarToken, listarProdutosPorCategoria);

export default router;