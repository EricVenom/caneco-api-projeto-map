import { Router } from 'express';
import { autenticarToken } from "../middlewares/auth_middleware.js";
import { listarCategorias, listarProdutosPorCategoria } from '../controllers/category_controller.js';

const router = Router();

router.get("/listar-categorias", autenticarToken, listarCategorias);
router.get("/listar-produtos/:id_categoria/", autenticarToken, listarProdutosPorCategoria);

export default router;