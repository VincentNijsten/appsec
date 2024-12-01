// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    // Verwijder bestaande gegevens
    await prisma.trainingSession.deleteMany();
    await prisma.zaal.deleteMany();
    await prisma.ploeg.deleteMany();
    await prisma.coach.deleteMany();
    await prisma.speler.deleteMany();

    // Voeg zalen toe
    const zaal1 = await prisma.zaal.create({
        data: {
            naam: 'Haasrode Zaal 1',
            address: 'Schapenstraat 141',
            beschikbaarheid: true,
        },
    });

    const zaal2 = await prisma.zaal.create({
        data: {
            naam: 'Haasrode Zaal 2',
            address: 'Schapenstraat 141',
            beschikbaarheid: false,
        },
    });

    // Voeg coaches toe
    const coach1 = await prisma.coach.create({
        data: {
            coachLicentie: '0018728',
            naam: 'John Doe',
        },
    });

    const coach2 = await prisma.coach.create({
        data: {
            coachLicentie: '0028925',
            naam: 'Jane Smith',
        },
    });

    // Voeg spelers toe
    const speler1 = await prisma.speler.create({
        data: {
            spelerLicentie: '0050766',
            naam: 'Jan Jansen',
            leeftijd: 25,
            ploegNaam: null, // Geen ploeg toegewezen bij het aanmaken
        },
    });

    const speler2 = await prisma.speler.create({
        data: {
            spelerLicentie: '0050767',
            naam: 'Piet Pietersen',
            leeftijd: 30,
            ploegNaam: null,
        },
    });

    const speler3 = await prisma.speler.create({
        data: {
            spelerLicentie: '0050768',
            naam: 'Klaas Klaassen',
            leeftijd: 22,
            ploegNaam: null,
        },
    });

    // Voeg ploegen toe
    const ploeg1 = await prisma.ploeg.create({
        data: {
            ploegnaam: 'Heren F',
            niveau: '1e promo',
            coachLicentie: coach1.coachLicentie, // Verbind de coach
            spelers: {
                connect: [{ spelerLicentie: speler1.spelerLicentie }, { spelerLicentie: speler2.spelerLicentie }],
            },
        },
    });

    const ploeg2 = await prisma.ploeg.create({
        data: {
            ploegnaam: 'Heren A',
            niveau: 'Liga A',
            coachLicentie: coach2.coachLicentie, // Verbind de coach
            spelers: {
                connect: [{ spelerLicentie: speler3.spelerLicentie }],
            },
        },
    });

    // Voeg trainingssessies toe
    const training1 = await prisma.trainingSession.create({
        data: {
            ploegNaam: ploeg1.ploegnaam,
            zaalNaam: zaal1.naam,
            datum: new Date('2024-12-15'),
            startTijd: '10:00',
            eindTijd: '12:00',
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();