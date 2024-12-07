import express, { NextFunction, Request, Response } from 'express';
import ploegDb from '../repository/ploeg.db';
import ploegService from '../service/ploeg.service';
import { PloegInput } from '../types';

const ploegRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Speler:
 *       type: object
 *       properties:
 *         naam:
 *           type: string
 *           description: Naam van de speler.
 *         spelerslicentie:
 *           type: string
 *           description: Licentie van de speler.
 *         leeftijd:
 *           type: number
 *           description: Leeftijd van de speler.
 *     Ploeg:
 *       type: object
 *       properties:
 *         niveau:
 *           type: string
 *           description: Ploeg niveau.
 *         ploegnaam:
 *           type: string
 *           description: Ploegnaam.
 *         
 */

/**
 * @swagger
 * /ploegen:
 *   get:
 *     summary: Haal alle ploegen op
 *     tags: [Ploegen]
 *     responses:
 *       200:
 *         description: Een lijst van ploegen
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/Ploeg'
 *       500:
 *         description: Fout bij het ophalen van ploegen
 */
ploegRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ploegen = await ploegService.getAllPloegen();
        res.json(ploegen);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving teams' });
    }
});

/**
 * @swagger
 * /ploegen/{ploegnaam}:
 *   get:
 *     summary: Haal een ploeg op via naam
 *     tags: [Ploegen]
 *     parameters:
 *       - in: path
 *         name: ploegnaam
 *         required: true
 *         description: De naam van de ploeg die je wilt ophalen
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gevonden ploeg
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ploeg'
 *       404:
 *         description: Ploeg niet gevonden
 *       500:
 *         description: Fout bij het ophalen van de ploeg
 */
ploegRouter.get('/:ploegnaam', (req, res) => {
    const ploegnaam = req.params.ploegnaam;
    try {
        const ploeg = ploegService.getPloegByNaam(ploegnaam );
        if (ploeg) {
            res.json(ploeg);
        } else {
            res.status(404).json({ message: 'Team not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving team' });
    }
});

/**
 * @swagger
 * /ploegen/{ploegnaam}/spelers:
 *   get:
 *     summary: Haal alle spelers in een ploeg op
 *     tags: [Ploegen]
 *     parameters:
 *       - in: path
 *         name: ploegnaam
 *         required: true
 *         description: De naam van de ploeg waarvan je de spelers wilt ophalen
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Een lijst van spelers in de ploeg
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Speler'
 *       404:
 *         description: Ploeg niet gevonden
 *       500:
 *         description: Fout bij het ophalen van de spelers
 */
// ploegRouter.get('/:ploegnaam/spelers', (req, res) => {
//     const ploegnaam = req.params.ploegnaam;
//     try {
//         const spelers = ploegService.getSpelersInPloeg(ploegnaam);
//         res.json(spelers);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error retrieving players' });
//     }
// });

/**
 * @swagger
 * /ploegen:
 *   post:
 *     summary: Voeg een nieuwe ploeg toe
 *     tags: [Ploegen]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ploeg'
 *     responses:
 *       201:
 *         description: Ploeg succesvol toegevoegd
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ploeg'
 *       400:
 *         description: Fout bij het toevoegen van de ploeg
 *       500:
 *         description: Fout bij het toevoegen van de ploeg
 */
ploegRouter.post('/', (req, res) => {
    const newPloeg = <PloegInput>req.body;
    try {
        const result = ploegService.addPloeg(newPloeg);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error adding team' });
    }
});






/**
 * @swagger
 * /ploegen/{ploegnaam}:
 *   delete:
 *     summary: Verwijder een ploeg
 *     tags: [Ploegen]
 *     parameters:
 *       - in: path
 *         name: ploegnaam
 *         schema:
 *           type: string
 *         required: true
 *         description: De naam van de ploeg die verwijderd moet worden
 *     responses:
 *       200:
 *         description: Ploeg succesvol verwijderd
 *       400:
 *         description: Fout bij het verwijderen van de ploeg
 *       500:
 *         description: Fout bij het verwijderen van de ploeg
 */
ploegRouter.delete('/:ploegnaam', async (req, res) => {
    const { ploegnaam } = req.params;
    try {
        await ploegService.verwijderPloeg(ploegnaam);
        res.status(200).json({ message: 'Ploeg succesvol verwijderd' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting team' });
    }
});


/**
 * @swagger
 * /ploegen/{ploegnaam}:
 *   put:
 *     summary: Update een ploeg
 *     tags: [Ploegen]
 *     parameters:
 *       - in: path
 *         name: ploegnaam
 *         schema:
 *           type: string
 *         required: true
 *         description: De naam van de ploeg die bijgewerkt moet worden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PloegInput'
 *     responses:
 *       200:
 *         description: Ploeg succesvol bijgewerkt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ploeg'
 *       400:
 *         description: Fout bij het bijwerken van de ploeg
 *       500:
 *         description: Fout bij het bijwerken van de ploeg
 */
ploegRouter.put('/:ploegnaam', async (req, res) => {
    const { ploegnaam } = req.params;
    const ploegData = <Partial<PloegInput>>req.body;
    try {
        const updatedPloeg = await ploegService.updatePloeg(ploegnaam, ploegData);
        res.status(200).json(updatedPloeg);
    } catch (error) {
        res.status(400).json({ message: 'Error updating team' });
    }
});






export { ploegRouter };