import { Router } from "express";
import { realizarCheckout } from '../controllers/checkout_controller.js';
import { autenticarToken } from '../middlewares/auth_middleware.js';

const router = Router();

router.post("/realizar-checkout", autenticarToken, realizarCheckout);

export default router;