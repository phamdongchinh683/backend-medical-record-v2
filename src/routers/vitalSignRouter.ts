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
 * /vital-sign/:
 *   post:
 *     summary: Add vital sign
 *     tags: [Vital Sign - Doctor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VitalSign'
 *     responses:
 *       200:
 *         description: Vital sign added successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
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
 *       - bearerAuth: []
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
 *       401:
 *         description: Unauthorized - Invalid or missing token
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
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visit deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
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
 *       - bearerAuth: []
 *     parameters:
 *       - name: nftToken
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vital sign fetched successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get(
  "/:nftToken",
  validateParameter("nftToken", "params"),
  vitalSignController.findVitalSignByNft
);

export default router;
