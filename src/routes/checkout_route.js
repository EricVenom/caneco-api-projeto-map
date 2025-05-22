import { Router } from "express";
import { realizarCheckout } from '../controllers/checkout_controller.js';

const router = Router();

router.post("/realizar-checkout", realizarCheckout);

export default router;