import express, { NextFunction, Request, Response } from 'express';
import spelerService from '../service/speler.service'; // Zorg ervoor dat je het juiste pad naar de speler service gebruikt
import { SpelerInput } from '../types';

const spelersRouter = express.Router();

/**
 * @swagger
 * components:
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
 */

/**
 * @swagger
 * /spelers:
 *   get:
 *     summary: Haal alle spelers op
 *     tags: [Spelers]
 *     responses:
 *       200:
 *         description: Een lijst van spelers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Speler'
 *       500:
 *         description: Fout bij het ophalen van spelers
 */
spelersRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const spelers = await spelerService.getAllSpelers();
        res.status(200).json(spelers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving players' });
    }
});

/**
 * @swagger
 * /spelers/{naam}:
 *   get:
 *     summary: Haal een speler op via naam
 *     tags: [Spelers]
 *     parameters:
 *       - in: path
 *         name: naam
 *         required: true
 *         description: De naam van de speler die je wilt ophalen
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gevonden speler
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Speler'
 *       404:
 *         description: Speler niet gevonden
 *       500:
 *         description: Fout bij het ophalen van de speler
 */
spelersRouter.get('/:naam', (req, res) => {
    const naam = req.params.naam;
    try {
        const speler = spelerService.getSpelerByNaam(naam);
        res.json(speler);
    } catch (error) {
        console.error(error);
    }
});

/**
 * @swagger
 * /spelers/licentie/{licentie}:
 *   get:
 *     summary: Haal een speler op via licentie
 *     tags: [Spelers]
 *     parameters:
 *       - in: path
 *         name: licentie
 *         required: true
 *         description: De licentie van de speler die je wilt ophalen
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gevonden speler
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Speler'
 *       404:
 *         description: Speler niet gevonden
 *       500:
 *         description: Fout bij het ophalen van de speler
 */
spelersRouter.get('/licentie/:licentie', (req, res) => {
    const licentie = req.params.licentie;
    try {
        const speler = spelerService.getSpelerByLicentie(licentie);
        if (speler) {
            res.json(speler);
        } else {
            res.status(404).json({ message: 'Speler niet gevonden' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving player' });
    }
});

/**
 * @swagger
 * /spelers:
 *   post:
 *     summary: Voeg een nieuwe speler toe
 *     tags: [Spelers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Speler'
 *     responses:
 *       201:
 *         description: Speler succesvol toegevoegd
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Speler'
 *       400:
 *         description: Fout bij het toevoegen van de speler
 *       500:
 *         description: Fout bij het toevoegen van de speler
 */
spelersRouter.post('/', (req, res) => {
    const newSpeler = <SpelerInput>req.body;
    try {
        spelerService.addSpeler(newSpeler);
        res.status(201).json({ message: 'Speler succesvol toegevoegd' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error adding player' });
    }
});



/**
* @swagger
* /spelers/{spelerLicentie}:
*   delete:
*     summary: Verwijder een speler
*     tags: [Spelers]
*     parameters:
*       - in: path
*         name: spelerLicentie
*         schema:
*           type: string
*         required: true
*         description: De licentie van de speler die verwijderd moet worden
*     responses:
*       200:
*         description: Speler succesvol verwijderd
*       400:
*         description: Fout bij het verwijderen van de speler
*       500:
*         description: Fout bij het verwijderen van de speler
*/
spelersRouter.delete('/:spelerLicentie', async (req, res) => {
   const { spelerLicentie } = req.params;
   try {
       await spelerService.removeSpeler(spelerLicentie);
       res.status(200).json({ message: 'Speler succesvol verwijderd' });
   } catch (error) {
       console.error(error);
       res.status(400).json({ message: 'Error deleting player' });
   }
});




/**
 * @swagger
 * /spelers/{spelerLicentie}:
 *   put:
 *     summary: Update een speler
 *     tags: [Spelers]
 *     parameters:
 *       - in: path
 *         name: spelerLicentie
 *         schema:
 *           type: string
 *         required: true
 *         description: De licentie van de speler die bijgewerkt moet worden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SpelerInput'
 *     responses:
 *       200:
 *         description: Speler succesvol bijgewerkt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Speler'
 *        400:
 *         description: Fout bij het bijwerken van de speler
 *       500:
 *         description: Fout bij het bijwerken van de speler
 */

spelersRouter.put('/:spelerLicentie', async (req, res) => {
    const { spelerLicentie } = req.params;
    const spelerData = <Partial<SpelerInput>>req.body;
    try {
        const updatedSpeler = await spelerService.updateSpeler(spelerLicentie, spelerData);
        res.status(200).json(updatedSpeler);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error updating player' });
    }
});
  
  
export { spelersRouter };