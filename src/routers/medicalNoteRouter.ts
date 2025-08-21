import { Router } from "express";
import medicalNoteController from "../controllers/medicalNoteController";
import authMiddleware from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddlewares";
import { validateInputMiddleware } from "../middleware/validateInputMiddleware";
import { validatePaginationQuery } from "../middleware/validatePaginationQuery";
import { validateParameter } from "../middleware/validateParameter";
import { RoleNumber } from "../utils/enum";
import {
  medicalNoteSchema,
  medicalNoteUpdateSchema,
} from "../validation/medicalNoteSchema";

const router = Router();

router.use(authMiddleware);
/**
 * @swagger
 * /medical-note:
 *   post:
 *     summary: Create Medical Note
 *     tags: [Medical Note - Doctor]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicalNote'
 *     responses:
 *       201:
 *         description: MedicalNote created successfully
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
 *                   example: "MedicalNote created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/MedicalNote'
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
  validateInputMiddleware(medicalNoteSchema),
  medicalNoteController.createMedicalNote
);

/**
 * @swagger
 * /medical-note/{id}:
 *   put:
 *     summary: Update Medical Note
 *     tags: [Medical Note - Doctor]
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
 *             $ref: '#/components/schemas/MedicalNoteUpdate'
 *     responses:
 *       200:
 *         description: medical-note updated successfully
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
 *                   example: "medical-note updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/MedicalNote'
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
 *         description: Not found - medical-note not found
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
 *                   example: "medical-note not found"
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
  validateInputMiddleware(medicalNoteUpdateSchema),
  medicalNoteController.updateMedicalNote
);

/**
 * @swagger
 * /medical-note/{nftToken}:
 *   get:
 *     summary: Get Medical Notes
 *     tags: [Doctor - Patient]
 *     description: Get medical notes by nft
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: nftToken
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *           description: Nft token
 *     responses:
 *       200:
 *         description: Medical Notes retrieved successfully
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
 *                   example: "Medical Notes retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MedicalNote'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: number
 *                       example: 1
 *                     limit:
 *                       type: number
 *                       example: 10
 *                     total:
 *                       type: number
 *                       example: 25
 *                     totalPages:
 *                       type: number
 *                       example: 3
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
  validatePaginationQuery,
  medicalNoteController.findMedicalNoteByNft
);

export default router;
