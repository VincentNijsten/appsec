import express from 'express';
import zaalDb from '../repository/zaal.db';
import zaalService from '../service/zaal.service';

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
zaalRouter.get('/', (req, res) => {
    try {
        const zalen = zaalService.getAllZalen();
        res.json(zalen);
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
    const newZaal = req.body;
    try {
        zaalService.addZaal(newZaal);
        res.status(201).json(newZaal);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error adding room' });
    }
});

export { zaalRouter };