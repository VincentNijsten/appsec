import express, { Request, Response, NextFunction } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     UserInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *     AuthenticationRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token for authentication
 *         user:
 *           $ref: '#/components/schemas/User'
 *   tags:
 *     - name: Users
 *       description: User management
 */

// get users by email
/**
* @swagger
* /users/email:
*   get:
*     security:
*        - bearerAuth: []
*     summary: Get user details by email.
*     parameters:
*       - in: query
*         name: email
*         required: true
*         schema:
*           type: string
*         description: The email of the user to retrieve
*     responses:
*       200:
*         description: User details retrieved successfully
*         content:
*           application/json:
*             schema:
*               $ref= '#/components/schemas/User'
*/
userRouter.get('/email', async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { email } = req.query;
      if (!email || typeof email !== "string") {
        res.status(400).send({ error: "Valid email is required" });
        return;
      }
      const user = await userService.getUserByEmail(email);
      res.status(200).json(user);
  } catch (error) {
      next(error)
  }
})

// login 
/**
 * @swagger
 * /users/login:
 *   post:
 *     security:
 *         - bearerAuth: []
 *     summary: Login using email/password. Returns an object with JWT token and user name when succesful.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: The created user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const UserInput = <UserInput>req.body;
      const response = await userService.authenticate(UserInput);
      res.status(200).json({ message: 'Authentication successful', ...response });
    } catch(error) {
      next(error);
    }
});

// create users
/**
 * @swagger
 * /users/signup:
 *   post:
 *     security:
 *         - bearerAuth: []
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/signup', async (req: Request, res:Response, next: NextFunction) => {
  try {
      const UserInput = <UserInput>req.body;
      const user = await userService.createUser(UserInput);
      res.status(200).json(user);
  } catch(error) {
      next(error)
  }
});

export { userRouter };