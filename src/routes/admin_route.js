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

router.post("/admin/cadastrar-operador", cadastrarNovoOperador);
router.post("/admin/logar", logarOperador);

router.get("/admin/mostrar-operador", autenticarToken, mostrarInfoOperador);
router.put("/admin/adicionar-saldo", autenticarToken, adicionarSaldoCaixa);
router.put("/admin/subtrair-saldo", autenticarToken, substrairSaldoCaixa);

export default router;
