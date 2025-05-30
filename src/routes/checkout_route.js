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

router.post("/checkout/realizar-checkout", autenticarToken, realizarCheckout);
router.post("/checkout/realizar-pagamento/:checkout_code", autenticarToken, conferirPagamento, processarPagamento);
router.get("/checkout/mostrar-historico", autenticarToken, mostrarHistoricoVendas);
router.get("/checkout/emitir-nota/:checkout_code", autenticarToken, emitirNotaFiscal);

export default router;