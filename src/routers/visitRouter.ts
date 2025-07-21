import { Router } from "express";
import visitController from "../controllers/visitController";
import authMiddleware from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddlewares";
import { validateInputMiddleware } from "../middleware/validateInputMiddleware";
import { RoleNumber } from "../utils/enum";
import { visitSchema } from "../validation/visitSchema";
import { visitUpdateSchema } from "../validation/visitUpdateSchema";

const router = Router();

router.use(authMiddleware, roleMiddleware(RoleNumber.DOCTOR));

/**
 * @swagger
 * /visit/:
 *   post:
 *     summary: Create visit
 *     tags: [Auth - Doctor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Visit'
 *     responses:
 *       200:
 *         description: Visit created successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.post(
  "/",
  validateInputMiddleware(visitSchema),
  visitController.addVisit
);
/**
 * @swagger
 * /visit/:id:
 *   patch:
 *     summary: Update visit
 *     tags: [Auth - Doctor]
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
 *             $ref: '#/components/schemas/VisitUpdate'
 *     responses:
 *       200:
 *         description: Visit created successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.patch(
  "/:id",
  validateInputMiddleware(visitUpdateSchema),
  visitController.updateVisit
);

export default router;
