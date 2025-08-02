import { Router } from "express";
import accessLogController from "../controllers/accessLogController";
import authMiddleware from "../middleware/authMiddleware";
import { validateInputMiddleware } from "../middleware/validateInputMiddleware";
import { validatePaginationQuery } from "../middleware/validatePaginationQuery";
import { validateParameter } from "../middleware/validateParameter";
import { accessLogSchema } from "../validation/accessLogSchema";

const router = Router();

router.use(authMiddleware);
/**
 * @swagger
 * /access-log/:
 *   post:
 *     summary: Create access log
 *     tags: [Doctor - Patient]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccessLog'
 *     responses:
 *       201:
 *         description: Access log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Access log created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/AccessLog'
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
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
 *                   type: boolean
 *                   example: false
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
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post(
  "/",
  validateInputMiddleware(accessLogSchema),
  accessLogController.addAccessLog
);

/**
 * @swagger
 * /access-log/{nftToken}:
 *   get:
 *     summary: find access log by nft
 *     tags: [Doctor - Patient]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: nftToken
 *         in: path
 *         required: true
 *         schema:
 *           type: number
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
 *           default: 10
 *           minimum: 1
 *           maximum: 100
 *         example: 10
 *         description: Number of items per page (max 100)
 *     responses:
 *       200:
 *         description: Access logs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Access logs retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AccessLog'
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
 *                   type: boolean
 *                   example: false
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
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Not found - No access logs found for the given NFT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No access logs found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get(
  "/:nftToken",
  validateParameter("nftToken", "params"),
  validatePaginationQuery,
  accessLogController.getAccessLogByNftToken
);

export default router;
