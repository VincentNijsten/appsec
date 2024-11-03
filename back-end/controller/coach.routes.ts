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
 */

import express, { NextFunction, Request, Response } from 'express';
import coachService from '../service/coach.service';
import { CoachInput } from '../types';

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
     
    try {
        const newCoach = <CoachInput>req.body;
        const result =  coachService.addCoach(newCoach);
        res.status(201).json({ message: result }); 
    } catch (error) {
        next(error); 
    }
});


/**
 * @swagger
 * /coaches/{coachLicentie}:
 *   delete:
 *     summary: Verwijder een coach
 *     description: Verwijdert een coach op basis van de gegeven coachlicentie.
 *     tags: [coaches]
 *     parameters:
 *       - name: coachLicentie
 *         in: path
 *         required: true
 *         description: De coachlicentie van de coach die verwijderd moet worden.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coach succesvol verwijderd
 *       404:
 *         description: Coach niet gevonden
 *       500:
 *         description: Fout bij het verwijderen van de coach
 */
coachRouter.delete('/:coachLicentie', async (req : Request, res : Response) => {
    const  {coachLicentie}  = req.params;

    try {
        const message = coachService.removeCoach(coachLicentie);
        return res.status(200).json({ message });
    } catch (error) {
     
        return res.status(500).json({ message: 'Fout bij het verwijderen van de coach' });
    }
});


export { coachRouter };