import express from "express";
import { Register, loginUser } from "../controllers/authentication";
import { validateRegistration } from "../validations/validateRegistration";
import { validateLogin } from "../validations/validateLogin";
import ensureAuthenticatedUser from "../middlewares/ensureAuthenticatedUser";
import { validateUserRole } from "../middlewares/validateRole";
import { UserRolesEnum } from "../enums/userRole.enum";
import { validateMedicalRecord } from "../validations/validateCreateMedicalRecord";
import {
  createMedicalRecord,
  listMedicalRecords,
} from "../controllers/medicalRecords";

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

/**
 * @swagger
 * /api/records/list:
 *   get:
 *     summary: List all medical records with pagination
 *     tags:
 *       - Medical Records
 *     security:
 *       - bearerAuth: [] # Use the security scheme defined below
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number to retrieve (default 1)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: perPage
 *         in: query
 *         description: The number of records per page (default 10)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       notes:
 *                         type: string
 *                         example: Patient presented with flu-like symptoms.
 *                       message:
 *                         type: string
 *                         example: Prescribed medication for treatment.
 *                       diagnosis:
 *                         type: string
 *                         example: Influenza
 *                       session_date:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-09-20T12:00:00.000Z
 *                 page:
 *                   type: integer
 *                 perPage:
 *                   type: integer
 *                 totalCount:
 *                   type: integer
 *       '500':
 *         description: Internal server error
 */

router.get(
  "/list",
  ensureAuthenticatedUser,
  validateUserRole([UserRolesEnum.Doctor]),
  listMedicalRecords
);
export default router;
