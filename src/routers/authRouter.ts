import { Router } from "express";
import authController from "../controllers/authController";
import addressMiddleware from "../middleware/addressMiddleware";
import signatureMiddleware from "../middleware/signatureMiddleware";

const router = Router();

router.get("/message/:address", addressMiddleware, authController.generateMessage);
router.post("/verify", signatureMiddleware, authController.verifyMessage);

export default router;
