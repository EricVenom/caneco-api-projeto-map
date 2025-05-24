import { Router } from "express";
import { autenticarToken } from '../middlewares/auth_middleware.js';
import {
    realizarCheckout,
    mostrarHistoricoVendas,
    emitirNotaFiscal
} from '../controllers/checkout_controller.js';

const router = Router();

router.post("/checkout/realizar-checkout", autenticarToken, realizarCheckout);
router.get("/checkout/mostrar-historico", autenticarToken, mostrarHistoricoVendas);
router.get("/checkout/emitir-nota/:checkout_code", autenticarToken, emitirNotaFiscal);

export default router;