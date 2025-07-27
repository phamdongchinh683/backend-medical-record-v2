import { Router } from "express";
import authController from "../controllers/authController";
import addressMiddleware from "../middleware/addressMiddleware";
import signatureMiddleware from "../middleware/signatureMiddleware";
import { userSchema } from "../validation/userSchema";
import { validateInputMiddleware } from "../middleware/validateInputMiddleware";
import { validateParameter } from "../middleware/validateParameter";
const router = Router();

/**
 * @swagger
 * /public/message/{address}:
 *   get:
 *     summary: Generate a message for verification
 *     tags: [Public]
 *     security: []
 *     parameters:
 *       - name: address
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.get(
  "/message/:address",
  validateParameter("address", "params"),
  addressMiddleware,
  authController.generateMessage
);
/**
 * @swagger
 * /public/verify:
 *   post:
 *     summary: Verify a message
 *     tags: [Public]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageVerify'
 *     responses:
 *       200:
 *         description: Message verified successfully
 *       400:
 *         description: Invalid signature or missing parameters
 */
router.post("/verify", signatureMiddleware, authController.verifyMessage);
/**
 * @swagger
 * /public/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Public]
 *     security: []
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
  validateInputMiddleware(userSchema),
  authController.register
);

export default router;
