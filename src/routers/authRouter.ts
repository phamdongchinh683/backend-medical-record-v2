import { Router } from "express";
import authController from "../controllers/authController";
import addressMiddleware from "../middleware/addressMiddleware";
import signatureMiddleware from "../middleware/signatureMiddleware";
import { validateUserMiddleware } from "../middleware/validateUserMiddleware";
import { userSchema } from "../validation/userSchema";

const router = Router();

router.get(
  "/message/:address",
  addressMiddleware,
  authController.generateMessage
);
router.post("/verify", signatureMiddleware, authController.verifyMessage);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post(
  "/register",
  validateUserMiddleware(userSchema),
  authController.register
);

export default router;
