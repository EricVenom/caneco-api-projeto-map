import { Router } from 'express';
import { listarCategorias, listarProdutosPorCategoria } from '../controllers/category_controller.js';

const router = Router();

router.get("/listar-categorias", listarCategorias);
router.get("/listar-produtos/:id_categoria/", listarProdutosPorCategoria);

export default router;