import { Router } from "express";
import labResultController from "../controllers/labResultController";
import authMiddleware from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddlewares";
import { validateInputMiddleware } from "../middleware/validateInputMiddleware";
import { validatePaginationQuery } from "../middleware/validatePaginationQuery";
import { validateParameter } from "../middleware/validateParameter";
import { RoleNumber } from "../utils/enum";
import {
  labResultSchema,
  labResultUpdateSchema,
} from "../validation/labResultSchema";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /lab-result/{nftToken}:
 *   get:
 *     summary: Get lab result by nft
 *     tags: [Doctor - Patient]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: nftToken
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *           default: 1
 *           minimum: 1
 *         example: 1
 *       - name: page
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *           default: 1
 *           minimum: 1
 *         example: 1
 *         description: Page number (starts from 1)
 *       - name: limit
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *           default: 1
 *           minimum: 1
 *           maximum: 100
 *         example: 10
 *         description: Number of items per page (max 100)
 *     responses:
 *       200:
 *         description: Diagnosis by type retrieved successfully
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
 *                   example: "Diagnosis by type retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Diagnosis'
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
 *       404:
 *         description: Not found - No diagnosis found for the given type
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
 *                   example: "No diagnosis found for this type"
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
  labResultController.findByNft
);

/**
 * @swagger
 * /lab-result:
 *   post:
 *     summary: Create Lab Result
 *     tags: [Lab Result - Doctor]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LabResult'
 *     responses:
 *       201:
 *         description: Lab Result created successfully
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
 *                   example: "Lab Result created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/LabResult'
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
  validateInputMiddleware(labResultSchema),
  labResultController.addLabResult
);

/**
 * @swagger
 * /lab-result/{id}:
 *   put:
 *     summary: Update Lab Result
 *     tags: [Lab Result - Doctor]
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
 *             $ref: '#/components/schemas/LabResultUpdate'
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
 *                   example: "Lab Result updated successfully"
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
  validateInputMiddleware(labResultUpdateSchema),
  labResultController.updateLabResult
);

/**
 * @swagger
 * /lab-result/{id}:
 *   delete:
 *     summary: Delete lab result
 *     tags: [Lab Result - Doctor]
 *     description: Delete lab result by id
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
 *         description: Lab Result deleted successfully
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
 *                   example: "Lab Result deleted successfully"
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
 *         description: Not found - Appointment not found
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
 *                   example: "Appointment not found"
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
  labResultController.deleteLabResult
);

export default router;
