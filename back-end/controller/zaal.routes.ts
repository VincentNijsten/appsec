import zaalDb from '../repository/zaal.db';
import zaalService from '../service/zaal.service';
import { ZaalInput } from '../types';
import express, { NextFunction, Request, Response } from 'express';


const zaalRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Zaal:
 *       type: object
 *       properties:
 *         naam:
 *           type: string
 *           description: Naam van de zaal.
 *         address:
 *           type: string
 *           description: Adres van de zaal.
 *         beschikbaarheid:
 *           type: boolean
 *           description: Beschikbaarheid van de zaal.
 */

/**
 * @swagger
 * /zalen:
 *   get:
 *     summary: Haal alle zalen op
 *     tags: [Zalen]
 *     responses:
 *       200:
 *         description: Een lijst van zalen
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Zaal'
 *       500:
 *         description: Fout bij het ophalen van zalen
 */
zaalRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const zalen = await zaalService.getAllZalen();
        res.status(200).json(zalen);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving rooms' });
    }
});

/**
 * @swagger
 * /zalen/{zaalnaam}:
 *   get:
 *     summary: Haal een zaal op via naam
 *     tags: [Zalen]
 *     parameters:
 *       - in: path
 *         name: zaalnaam
 *         required: true
 *         description: De naam van de zaal die je wilt ophalen
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gevonden zaal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zaal'
 *       404:
 *         description: Zaal niet gevonden
 *       500:
 *         description: Fout bij het ophalen van de zaal
 */
zaalRouter.get('/:zaalnaam', (req, res) => {
    const zaalnaam = req.params.zaalnaam;
    try {
        const zaal = zaalService.getZaalByNaam(zaalnaam);
        if (zaal) {
            res.json(zaal);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving room' });
    }
});

/**
 * @swagger
 * /zalen:
 *   post:
 *     summary: Voeg een nieuwe zaal toe
 *     tags: [Zalen]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Zaal'
 *     responses:
 *       201:
 *         description: Zaal succesvol toegevoegd
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zaal'
 *       400:
 *         description: Fout bij het toevoegen van de zaal
 *       500:
 *         description: Fout bij het toevoegen van de zaal
 */
zaalRouter.post('/', (req, res) => {
    const newZaal = <ZaalInput>req.body;
    try {
        zaalService.addZaal(newZaal);
        res.status(201).json(newZaal);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error adding room' });
    }
});


/**
 * @swagger
 * /zalen/{naam}:
 *   put:
 *     summary: Update een zaal
 *     tags: [Zalen]
 *     parameters:
 *       - in: path
 *         name: naam
 *         schema:
 *           type: string
 *         required: true
 *         description: De naam van de zaal die bijgewerkt moet worden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ZaalInput'
 *     responses:
 *       200:
 *         description: Zaal succesvol bijgewerkt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zaal'
 *       400:
 *         description: Fout bij het bijwerken van de zaal
 *       500:
 *         description: Fout bij het bijwerken van de zaal
 */
zaalRouter.put('/:naam', async (req, res) => {
    const { naam } = req.params;
    const zaalData = <Partial<ZaalInput>>req.body;
    try {
        const updatedZaal = await zaalService.updateZaal(naam, zaalData);
        res.status(200).json(updatedZaal);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error updating room' });
    }
});


/**
 * @swagger
 * /zalen/{naam}:
 *   delete:
 *     summary: Verwijder een zaal
 *     tags: [Zalen]
 *     parameters:
 *       - in: path
 *         name: naam
 *         schema:
 *           type: string
 *         required: true
 *         description: De naam van de zaal die verwijderd moet worden
 *     responses:
 *       200:
 *         description: Zaal succesvol verwijderd
 *       400:
 *         description: Fout bij het verwijderen van de zaal
 *       500:
 *         description: Fout bij het verwijderen van de zaal
 */
zaalRouter.delete('/:naam', async (req, res) => {
    const { naam } = req.params;
    try {
        await zaalService.deleteZaal(naam);
        res.status(200).json({ message: 'Zaal succesvol verwijderd' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error deleting room' });
    }
});


export { zaalRouter };