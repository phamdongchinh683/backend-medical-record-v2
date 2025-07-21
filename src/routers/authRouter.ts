import { Router } from "express";
import authController from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";
import { validateInputMiddleware } from "../middleware/validateInputMiddleware";
import { infoUpdateSchema } from "../validation/infoUpdateSchema";
import { statusSchema } from "../validation/statusSchema";
const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/profile", authController.profile);
/**
 * @swagger
 * /auth/profile-update:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InfoUpdate'
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.put(
  "/profile-update",
  validateInputMiddleware(infoUpdateSchema),
  authController.updateProfile
);
/**
 * @swagger
 * /auth/status:
 *   patch:
 *     summary: Update user status
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Status'
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.patch(
  "/status",
  validateInputMiddleware(statusSchema),
  authController.updateStatus
);

export default router;
