import { Router } from "express";
import permissionController from "../controllers/permissionController";
import authMiddleware from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddlewares";
import { validateInputMiddleware } from "../middleware/validateInputMiddleware";
import { validatePaginationQuery } from "../middleware/validatePaginationQuery";
import { validateParameter } from "../middleware/validateParameter";
import { RoleNumber } from "../utils/enum";
import { permissionSchema } from "../validation/permissionSchema";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /permission/:
 *   get:
 *     summary: Get permission
 *     tags: [Doctor - Patient]
 *     description: Get permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *       - name: limit
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Permission fetched successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get(
  "/",
  validatePaginationQuery,
  permissionController.getPermissionByWallet
);
/**
 * @swagger
 * /permission/:
 *   post:
 *     summary: Add permission
 *     tags: [Permission - Patient]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Permission'
 *     responses:
 *       200:
 *         description: Permission created successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.post(
  "/",
  roleMiddleware(RoleNumber.PATIENT),
  validateInputMiddleware(permissionSchema),
  permissionController.addPermission
);

/**
 * @swagger
 * /permission/{id}:
 *   put:
 *     summary: Update permission
 *     tags: [Permission - Patient]
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
 *             $ref: '#/components/schemas/PermissionUpdate'
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.put(
  "/:id",
  roleMiddleware(RoleNumber.PATIENT),
  validateParameter("id", "params"),
  validateInputMiddleware(permissionSchema),
  permissionController.updatePermission
);

export default router;
