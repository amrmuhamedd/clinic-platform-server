import express from "express";
import {
  Register,
  getLoggedInUserInfo,
  loginUser,
} from "../controllers/authentication";
import { validateRegistration } from "../validations/validateRegistration";
import { validateLogin } from "../validations/validateLogin";
import ensureAuthenticatedUser from "../middlewares/ensureAuthenticatedUser";

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

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get information about the logged in user
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: [] # Use the security scheme defined below
 *     responses:
 *       '200':
 *         description: Successful response with user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the user
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                 email:
 *                   type: string
 *                   description: The email address of the user
 *                 role:
 *                   type: string
 *                   description: The role of the user (e.g., patient, doctor)
 *       '401':
 *         description: Unauthorized, user is not authenticated
 *       '500':
 *         description: Internal server error
 */

router.get("/me", ensureAuthenticatedUser, getLoggedInUserInfo);
export default router;
