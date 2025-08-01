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
 *       200:
 *         description: Access log created successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
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
 *     responses:
 *       200:
 *         description: Access log updated successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get(
  "/:nftToken",
  validateParameter("nftToken", "params"),
  validatePaginationQuery,
  accessLogController.getAccessLogByNftToken
);

export default router;
