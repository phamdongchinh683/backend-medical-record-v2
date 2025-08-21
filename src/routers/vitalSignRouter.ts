import { Router } from "express";
import vitalSignController from "../controllers/vitalSignController";
import authMiddleware from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddlewares";
import { validateInputMiddleware } from "../middleware/validateInputMiddleware";
import { validateParameter } from "../middleware/validateParameter";
import { RoleNumber } from "../utils/enum";
import { vitalSignSchema } from "../validation/vitalSignSchema";
import { vitalSignUpdateSchema } from "../validation/vitalSignUpdateSchema";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /vital-sign:
 *   post:
 *     summary: Add vital sign
 *     tags: [Vital Sign - Doctor]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VitalSign'
 *     responses:
 *       201:
 *         description: Vital sign created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Vital sign created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/VitalSign'
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Insufficient permissions"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post(
  "/",
  roleMiddleware(RoleNumber.DOCTOR),
  validateInputMiddleware(vitalSignSchema),
  vitalSignController.addVitalSign
);

/**
 * @swagger
 * /vital-sign/{id}:
 *   put:
 *     summary: Update vital sign
 *     tags: [Vital Sign - Doctor]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VitalSignUpdate'
 *     responses:
 *       200:
 *         description: Vital sign updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Vital sign updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/VitalSign'
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Insufficient permissions"
 *       404:
 *         description: Not found - Vital sign not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Vital sign not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put(
  "/:id",
  roleMiddleware(RoleNumber.DOCTOR),
  validateParameter("id", "params"),
  validateInputMiddleware(vitalSignUpdateSchema),
  vitalSignController.updateVitalSign
);

/**
 * @swagger
 * /vital-sign/{id}:
 *   delete:
 *     summary: Delete vital sign
 *     tags: [Vital Sign - Doctor]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vital sign deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Vital sign deleted successfully"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Insufficient permissions"
 *       404:
 *         description: Not found - Vital sign not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Vital sign not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete(
  "/:id",
  roleMiddleware(RoleNumber.DOCTOR),
  validateParameter("id", "params"),
  vitalSignController.deleteVitalSign
);

/**
 * @swagger
 * /vital-sign/{nftToken}:
 *   get:
 *     summary: Get vital sign by nft token
 *     tags: [Doctor - Patient]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: nftToken
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vital signs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Vital signs retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VitalSign'
 *       400:
 *         description: Bad request - Invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Invalid parameters"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Not found - No vital signs found for the given NFT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "No vital signs found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get(
  "/:nftToken",
  validateParameter("nftToken", "params"),
  vitalSignController.findVitalSignByNft
);

export default router;
