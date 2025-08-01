import { Router } from "express";
import appointmentController from "../controllers/appointmentController";
import authMiddleware from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddlewares";
import { validateInputMiddleware } from "../middleware/validateInputMiddleware";
import { validatePaginationQuery } from "../middleware/validatePaginationQuery";
import { validateParameter } from "../middleware/validateParameter";
import { RoleNumber } from "../utils/enum";
import {
  appointmentSchema,
  appointmentUpdateSchema,
} from "../validation/appointmentSchema";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /appointment/:
 *   post:
 *     summary: Create appointment
 *     tags: [Appointment - Doctor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Appointment created successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.post(
  "/",
  roleMiddleware(RoleNumber.DOCTOR),
  validateInputMiddleware(appointmentSchema),
  appointmentController.addAppointment
);

/**
 * @swagger
 * /appointment/{id}:
 *   patch:
 *     summary: Update appointment
 *     tags: [Appointment - Doctor]
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
 *             $ref: '#/components/schemas/AppointmentUpdate'
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.patch(
  "/:id",
  roleMiddleware(RoleNumber.DOCTOR),
  validateInputMiddleware(appointmentUpdateSchema),
  appointmentController.updateAppointment
);

/**
 * @swagger
 * /appointment/{id}:
 *   delete:
 *     summary: Delete appointment
 *     tags: [Appointment - Doctor]
 *     description: Delete appointment by id
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
 *         description: Appointment deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.delete(
  "/:id",
  roleMiddleware(RoleNumber.DOCTOR),
  validateParameter("id", "params"),
  appointmentController.deleteAppointment
);

/**
 * @swagger
 * /appointment/:
 *   get:
 *     summary: Get appointments
 *     tags: [Doctor - Patient]
 *     description: Get appointments
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
 *         description: Appointments fetched successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.get("/", validatePaginationQuery, appointmentController.getAppointments);

export default router;
