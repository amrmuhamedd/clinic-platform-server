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
  deleteMedicalRecord,
  listMedicalRecords,
  updateMedicalRecord,
} from "../controllers/medicalRecords";
import { validateUpdateMedicalRecord } from "../validations/validateUpdateMedicalRecord";
import { validateDeleteMedicalRecord } from "../validations/validateDeleteMedicalRecord";
import { listPatients } from "../controllers/patients";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Patients
 *     description: Operations related to patients
 */

/**
 * @swagger
 * /api/patients/list:
 *   get:
 *     summary: List all patients (Paginated)
 *     tags:
 *       - Patients
 *     security:
 *       - bearerAuth: [] # Use the security scheme defined below
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve (default 1)
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: The number of patients per page (default 10)
 *     responses:
 *       '200':
 *         description: A list of patients (Paginated)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Amr Mohaemd
 *                       email:
 *                         type: string
 *                         example: amr@test.com
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
  listPatients
);

export default router;
