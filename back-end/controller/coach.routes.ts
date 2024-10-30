/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Coach:
 *          type: object
 *          properties:
 *            naam:
 *              type: string
 *              description: Coach naam.
 *            coachlicentie:
 *              type: string
 *              description: Coach licentie.
 *            ploeg:
 *              type: object
 *              description: De ploeg van de coach.
 *              properties:
 *                ploegnaam:
 *                  type: string
 *                  description: Naam van de ploeg.
 *                niveau:
 *                  type: string
 *                  description: Niveau van de ploeg.
 */

import express, { NextFunction, Request, Response } from 'express';
import coachService from '../service/coach.service';

const coachRouter = express.Router();

/**
 * @swagger
 * /coaches:
 *   get:
 *     summary: Retrieve all coaches
 *     tags: [coaches]
 *     responses:
 *       200:
 *         description: A list of coaches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coach'
 */
coachRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coaches = await coachService.getAllCoaches();
        res.status(200).json(coaches);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /coaches/{naam}:
 *   get:
 *     summary: Retrieve a coach by name
 *     tags: [coaches]
 *     parameters:
 *       - in: path
 *         name: naam
 *         required: true
 *         description: The name of the coach to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A coach object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coach'
 *       404:
 *         description: Coach not found
 */
coachRouter.get('/:naam', async (req: Request, res: Response, next: NextFunction) => {
    const naam = req.params.naam; // Get the name from the request parameters
    try {
        const coach = await coachService.getCoachByNaam(naam);
        res.status(200).json(coach); // Send the coach if found
    } catch (error) {
        res.status(400).json({status:"error", message: "Could not find coach "});
     
    }
});

/**
 * @swagger
 * /coaches:
 *   post:
 *     summary: Add a new coach
 *     tags: [coaches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coach'
 *     responses:
 *       201:
 *         description: Coach successfully added
 *       400:
 *         description: Invalid input
 */
coachRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const newCoach = req.body; 
    try {
        const result = await coachService.addCoach(newCoach);
        res.status(201).json({ message: result }); 
    } catch (error) {
        next(error); 
    }
});

export { coachRouter };