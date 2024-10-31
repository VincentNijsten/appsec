import express from 'express';
import ploegDb from '../repository/ploeg.db';
import ploegService from '../service/ploeg.service';

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
 *         spelers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Speler'
 *           description: De spelers van de ploeg.
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ploeg'
 *       500:
 *         description: Fout bij het ophalen van ploegen
 */
ploegRouter.get('/', (req, res) => {
    try {
        const ploegen = ploegService.getAllPloegen();
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
 * type: array
 *               items:
 *                 $ref: '#/components/schemas/Speler'
 *       404:
 *         description: Ploeg niet gevonden
 *       500:
 *         description: Fout bij het ophalen van de spelers
 */
ploegRouter.get('/:ploegnaam/spelers', (req, res) => {
    const ploegnaam = req.params.ploegnaam;
    try {
        const spelers = ploegService.getSpelersInPloeg(ploegnaam);
        res.json(spelers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving players' });
    }
});

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
    const newPloeg = req.body;
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
 * /ploegen/{ploegnaam}/{spelerslicentie}:
 *   put:
 *     summary: Voeg een speler toe aan een ploeg op basis van spelerslicentie
 *     tags: [Ploegen]
 *     parameters:
 *       - in: path
 *         name: ploegnaam
 *         required: true
 *         description: De naam van de ploeg waaraan je een speler wilt toevoegen
 *         schema:
 *           type: string
 *       - in: path
 *         name: spelerslicentie
 *         required: true
 *         description: De spelerslicentie van de speler die je wilt toevoegen
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Speler succesvol toegevoegd aan de ploeg
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ploeg'
 *       404:
 *         description: Ploeg of speler niet gevonden
 *       500:
 *         description: Fout bij het toevoegen van de speler aan de ploeg
 */
ploegRouter.put('/:ploegnaam/:spelerslicentie', (req, res) => {
    const ploegnaam = req.params.ploegnaam;
    const spelerslicentie = req.params.spelerslicentie; 

    console.log(`Zoeken naar ploeg: ${ploegnaam}`);
    console.log(`Zoeken naar speler met licentie: ${spelerslicentie}`);

    try {
        const updatedPloeg = ploegService.addSpelerToPloeg(ploegnaam, spelerslicentie);
        res.json(updatedPloeg);
    } catch (error) {
        console.error(error);
  
    }
});

/**
 * @swagger
 * /ploegen/add-coach/{coachLicentie}/{ploegnaam}:
 *   put:
 *     summary: Add a coach to a team
 *     description: Adds a coach to a specified team using the coach's license and team name.
 *     tags: [Ploegen]
 *     parameters:
 *       - name: coachLicentie
 *         in: path
 *         required: true
 *         description: The license of the coach to be added.
 *         schema:
 *           type: string
 *       - name: ploegnaam
 *         in: path
 *         required: true
 *         description: The name of the team to which the coach will be added.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coach successfully added to the team.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Bad request, either the team or coach was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */


ploegRouter.put('/add-coach/:coachLicentie/:ploegnaam', (req, res) => {
    const { coachLicentie, ploegnaam } = req.params;

    try {
        const result = ploegService.addCoach(coachLicentie, ploegnaam);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

export { ploegRouter };