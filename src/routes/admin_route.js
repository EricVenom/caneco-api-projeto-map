import { Router } from 'express';
import { cadastrarNovoOperador, logarOperador } from "../controllers/admin_controller.js";

const router = Router();

router.post("/admin/cadastrar-operador", cadastrarNovoOperador);
router.post("/admin/logar", logarOperador);

export default router;
