import express, { NextFunction, Request, Response } from 'express';
import trainingSessionService from '../service/trainingSession.service';
import { Ploeg } from '../model/ploeg';
import { Zaal } from '../model/zaal';
import { TrainingSessionInput } from '../types';

const trainingSessionRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     TrainingSession:
 *       type: object
 *       properties:
 *         ploeg:
 *           type: object
 *           properties:
 *             ploegnaam:
 *               type: string
 *               description: Naam van de ploeg.
 *         zaal:
 *           type: object
 *           properties:
 *             naam:
 *               type: string
 *               description: Naam van de zaal.
 *         datum:
 *           type: string
 *           format: date
 *           description: Datum van de trainingssessie.
 *         startTijd:
 *           type: string
 *           description: Starttijd van de trainingssessie.
 *         eindTijd:
 *           type: string
 *           description: Eindtijd van de trainingssessie.
 */

/**
 * @swagger
 * /training-sessions:
 *   get:
 *     summary: Retrieve all training sessions
 *     tags: [TrainingSession]
 *     responses:
 *       200:
 *         description: A list of training sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainingSession'
 *       500:
 *         description: Internal server error
 */
trainingSessionRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessions = await trainingSessionService.getAllTrainingSessions();
        res.status(200).json(sessions);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /training-sessions/{ploegnaam}:
 *   get:
 *     summary: Retrieve a training session by team name
 *     tags: [TrainingSession]
 *     parameters:
 *       - in: path
 *         name: ploegnaam
 *         required: true
 *         description: The name of the team to retrieve the training session
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A training session object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingSession'
 *       404:
 *         description: Training session not found
 *       500:
 *         description: Internal server error
 */
trainingSessionRouter.get('/:ploegnaam', async (req: Request, res: Response, next: NextFunction) => {
    const ploegnaam = req.params.ploegnaam; // Get the team name from the request parameters
    try {
        const session = await trainingSessionService.getTrainingSessionByPloegNaam(ploegnaam);
        res.status(200).json(session); // Send the training session if found
    } catch (error) {
        res.status(404).json({ status: "error", message: "Could not find training session" });
    }
});

/**
 * @swagger
 * /training-sessions:
 *   post:
 *     summary: Add a new training session
 *     tags: [TrainingSession]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainingSession'
 *     responses:
 *       201:
 *         description: Training session successfully added
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
trainingSessionRouter.post('/', (req, res) => {
    const { id,ploegnaam, zaalnaam, datum, startTijd, eindTijd } = req.body;

    // Log de ontvangen waarden om te controleren of ze correct zijn
    console.log('Ontvangen ploegnaam:', ploegnaam);
    console.log('Ontvangen zaalnaam:', zaalnaam);
    console.log('Ontvangen datum:', datum);
    console.log('Ontvangen startTijd:', startTijd);
    console.log('Ontvangen eindTijd:', eindTijd);

    try {
        const message = trainingSessionService.addTrainingSession({
            id,
            ploegnaam,
            zaalnaam,
            datum: new Date(datum),
            startTijd,
            eindTijd
        });
        res.status(201).json({ message });
    } catch (error) {
        console.error(error);
        
    }
});

export { trainingSessionRouter };