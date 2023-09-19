import express from "express";
import { Register, loginUser } from "../controllers/authentication";
import { validateRegistration } from "../validations/validateRegistration";
import { validateLogin } from "../validations/validateLogin";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Operations related to Authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Amr Mohamed
 *               email:
 *                 type: string
 *                 example: amr@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum: [patient, doctor]  # Use enum to specify allowed values
 *                 example: patient
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request, validation failed
 *       '500':
 *         description: Internal server error
 */
router.post("/register", validateRegistration, Register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate a user and generate a JWT token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: amr@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '200':
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '401':
 *         description: Authentication failed
 *       '500':
 *         description: Internal server error
 */
router.post("/login", validateLogin, loginUser);
export default router;
