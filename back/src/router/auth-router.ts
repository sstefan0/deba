import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  resetPasswordController,
} from "../controller/auth-controller";
import authorize from "../middleware/auth-middleware";
import { Role } from "@prisma/client";
import validate from "../middleware/validation-middleware";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../schemas/auth-schema";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user account.
 *     description: Creates a new user account using info provided in the request body.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Marko
 *               lastName:
 *                 type: string
 *                 example: Markovic
 *               email:
 *                 type: string
 *                 example: mmarkovic@gmail.com
 *               password:
 *                 type: string
 *                 example: lozinka1234
 *               role:
 *                 type: string
 *                 example: USER
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - role
 *     responses:
 *       '200':
 *         description: OK
 *       '409':
 *         description: Email Unavailable
 *       '500':
 *         description: Internal server error
 */

router.post(
  "/register",
  authorize([Role.ADMIN]),
  validate(registerSchema),
  registerController
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login api.
 *     description: Log into an existing user account.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: saratlija.stefan6@gmail.com
 *               password:
 *                 type: string
 *                 example: lozinka1234
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: OK
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.post("/login", validate(loginSchema), loginController);

/**
 * @swagger
 * /auth/forgotPassword:
 *   post:
 *     summary: Forgot password.
 *     description: Request a password reset.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: saratlija.stefan6@gmail.com
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: Check your email for further instructions
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.post(
  "/forgotPassword",
  validate(forgotPasswordSchema),
  forgotPasswordController
);

/**
 * @swagger
 * /auth/resetPassword:
 *   post:
 *     summary: Forgot password.
 *     description: Request a password reset.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: 123ojir0iqwje0912e409
 *               password:
 *                 type: string
 *                 example: lozinkaaaa
 *             required:
 *               - token
 *               - password
 *     responses:
 *       '200':
 *         description: Check your email for further instructions
 *       '498':
 *         description: Token expired/invalid
 *       '500':
 *         description: Internal server error
 */
router.post(
  "/resetPassword",
  validate(resetPasswordSchema),
  resetPasswordController
);
export default router;
