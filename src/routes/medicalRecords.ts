import express from "express";
import { Register, loginUser } from "../controllers/authentication";
import { validateRegistration } from "../validations/validateRegistration";
import { validateLogin } from "../validations/validateLogin";
import ensureAuthenticatedUser from "../middlewares/ensureAuthenticatedUser";
import { validateUserRole } from "../middlewares/validateRole";
import { UserRolesEnum } from "../enums/userRole.enum";
import { validateMedicalRecord } from "../validations/validateCreateMedicalRecord";
import { createMedicalRecord } from "../controllers/medicalRecords";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Medical Records
 *     description: Operations related to Medical Records
 */

/**
 * @swagger
 * /api/records/create:
 *   post:
 *     summary: Create a medical record (Doctor Only)
 *     tags:
 *       - Medical Records
 *     security:
 *       - bearerAuth: [] # Use the security scheme defined below
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *                 example: Patient presented with flu-like symptoms.
 *               message:
 *                 type: string
 *                 example: Prescribed medication for treatment.
 *               diagnosis:
 *                 type: string
 *                 example: Influenza
 *               session_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-09-20T12:00:00.000Z
 *     responses:
 *       '201':
 *         description: Medical record created successfully
 *       '400':
 *         description: Bad request, validation failed
 *       '401':
 *         description: Unauthorized, user is not a doctor
 *       '403':
 *         description: Forbidden, user does not have the required role
 *       '500':
 *         description: Internal server error
 */

router.post(
  "/create",
  ensureAuthenticatedUser,
  validateUserRole([UserRolesEnum.Doctor]),
  validateMedicalRecord,
  createMedicalRecord
);

export default router;
