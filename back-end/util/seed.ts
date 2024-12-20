// Execute: npx ts-node util/seed.ts

import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    // Verwijder bestaande gegevens
    await prisma.trainingSession.deleteMany();
    await prisma.zaal.deleteMany();
    await prisma.ploeg.deleteMany();
    await prisma.coach.deleteMany();
    await prisma.speler.deleteMany();

    // voeg user toe
    const vn = await prisma.user.create({
        data: {
            password: await bcrypt.hash('vince123', 12),
            firstName: 'Vincent',
            lastName: 'Nijsten',
            email: 'nijstenvincent@gmail.com',
            role: 'admin',
        }
    })

    const user1 = await prisma.user.create({
        data: {
            password: await bcrypt.hash('user1', 12),
            firstName: 'user1',
            lastName: 'test',
            email: 'user1@email',
            role: 'player',
        }
    })

    const user2 = await prisma.user.create({
        data: {
            password: await bcrypt.hash('user2', 12),
            firstName: 'user2',
            lastName: 'test',
            email: 'user2@email',
            role: 'coach',
        }
    })

    const user3 = await prisma.user.create({
        data: {
            password: await bcrypt.hash('user3', 12),
            firstName: 'user3',
            lastName: 'test',
            email: 'user3@email',
            role: 'admin',
        }
    })

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

    const zaal3 = await prisma.zaal.create({
        data: {
            naam: 'Leuven Zaal 1',
            address: 'Bondgenotenlaan 200',
            beschikbaarheid: true,
        },
    });

    const zaal4 = await prisma.zaal.create({
        data: {
            naam: 'Leuven Zaal 2',
            address: 'Bondgenotenlaan 202',
            beschikbaarheid: true,
        },
    });

    const zaal5 = await prisma.zaal.create({
        data: {
            naam: 'Brussel Zaal 1',
            address: 'Grote Markt 1',
            beschikbaarheid: true,
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

    const coach3 = await prisma.coach.create({
        data: {
            coachLicentie: '0034567',
            naam: 'Mark Johnson',
        },
    });

    const coach4 = await prisma.coach.create({
        data: {
            coachLicentie: '0045678',
            naam: 'Emily Davis',
        },
    });

    const coach5 = await prisma.coach.create({
        data: {
            coachLicentie: '0056789',
            naam: 'Michael Brown',
        },
    });

    // Voeg spelers toe
    const speler1 = await prisma.speler.create({
        data: {
            spelerLicentie: '0050766',
            naam: 'Jan Jansen',
            leeftijd: 25,
            ploegNaam: null,
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

    const speler4 = await prisma.speler.create({
        data: {
            spelerLicentie: '0050769',
            naam: 'Anna de Vries',
            leeftijd: 28,
            ploegNaam: null,
        },
    });

    const speler5 = await prisma.speler.create({
        data: {
            spelerLicentie: '0050770',
            naam: 'Emma van Dijk',
            leeftijd: 24,
            ploegNaam: null,
        },
    });

    const speler6 = await prisma.speler.create({
        data: {
            spelerLicentie: '0050771',
            naam: 'Tom Bakker',
            leeftijd: 26,
            ploegNaam: null,
        },
    });

    const speler7 = await prisma.speler.create({
        data: {
            spelerLicentie: '0050772',
            naam: 'Lisa Smit',
            leeftijd: 27,
            ploegNaam: null,
        },
    });

    const speler8 = await prisma.speler.create({
        data: {
            spelerLicentie: '0050773',
            naam: 'Sophie Visser',
            leeftijd: 23,
            ploegNaam: null,
        },
    });

    const speler9 = await prisma.speler.create({
        data: {
            spelerLicentie: '0050774',
            naam: 'Lucas de Boer',
            leeftijd: 29,
            ploegNaam: null,
        },
    });

    const speler10 = await prisma.speler.create({
        data: {
            spelerLicentie: '0050775',
            naam: 'Eva de Jong',
            leeftijd: 21,
            ploegNaam: null,
        },
    });

    // Voeg ploegen toe
    const ploeg1 = await prisma.ploeg.create({
        data: {
            ploegnaam: 'Heren F',
            niveau: '1e promo',
            coachLicentie: coach1.coachLicentie,
            spelers: {
                connect: [{ spelerLicentie: speler1.spelerLicentie }, { spelerLicentie: speler2.spelerLicentie }],
            },
        },
    });

    const ploeg2 = await prisma.ploeg.create({
        data: {
            ploegnaam: 'Heren A',
            niveau: 'Liga A',
            coachLicentie: coach2.coachLicentie,
            spelers: {
                connect: [{ spelerLicentie: speler3.spelerLicentie }],
            },
        },
    });

    const ploeg3 = await prisma.ploeg.create({
        data: {
            ploegnaam: 'Dames B',
            niveau: '2e promo',
            coachLicentie: coach3.coachLicentie,
            spelers: {
                connect: [{ spelerLicentie: speler4.spelerLicentie }, { spelerLicentie: speler5.spelerLicentie }],
            },
        },
    });

    const ploeg4 = await prisma.ploeg.create({
        data: {
            ploegnaam: 'Dames A',
            niveau: 'Liga A',
            coachLicentie: coach4.coachLicentie,
            spelers: {
                connect: [{ spelerLicentie: speler6.spelerLicentie }, { spelerLicentie: speler7.spelerLicentie }],
            },
        },
    });

    const ploeg5 = await prisma.ploeg.create({
        data: {
            ploegnaam: 'Heren B',
            niveau: '2e promo',
            coachLicentie: coach5.coachLicentie,
            spelers: {
                connect: [{ spelerLicentie: speler8.spelerLicentie }, { spelerLicentie: speler9.spelerLicentie }, { spelerLicentie: speler10.spelerLicentie }],
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

    const training2 = await prisma.trainingSession.create({
        data: {
            ploegNaam: ploeg2.ploegnaam,
            zaalNaam: zaal2.naam,
            datum: new Date('2024-12-16'),
            startTijd: '14:00',
            eindTijd: '16:00',
        },
    });

    const training3 = await prisma.trainingSession.create({
        data: {
            ploegNaam: ploeg3.ploegnaam,
            zaalNaam: zaal3.naam,
            datum: new Date('2024-12-17'),
            startTijd: '18:00',
            eindTijd: '20:00',
        },
    });

    const training4 = await prisma.trainingSession.create({
        data: {
            ploegNaam: ploeg4.ploegnaam,
            zaalNaam: zaal4.naam,
            datum: new Date('2024-12-18'),
            startTijd: '09:00',
            eindTijd: '11:00',
        },
    });

    const training5 = await prisma.trainingSession.create({
        data: {
            ploegNaam: ploeg5.ploegnaam,
            zaalNaam: zaal5.naam,
            datum: new Date('2024-12-19'),
            startTijd: '13:00',
            eindTijd: '15:00',
        },
    });

    const training6 = await prisma.trainingSession.create({
        data: {
            ploegNaam: ploeg1.ploegnaam,
            zaalNaam: zaal3.naam,
            datum: new Date('2024-12-20'),
            startTijd: '10:00',
            eindTijd: '12:00',
        },
    });

    const training7 = await prisma.trainingSession.create({
        data: {
            ploegNaam: ploeg2.ploegnaam,
            zaalNaam: zaal4.naam,
            datum: new Date('2024-12-21'),
            startTijd: '14:00',
            eindTijd: '16:00',
        },
    });

    const training8 = await prisma.trainingSession.create({
        data: {
            ploegNaam: ploeg3.ploegnaam,
            zaalNaam: zaal5.naam,
            datum: new Date('2024-12-22'),
            startTijd: '18:00',
            eindTijd: '20:00',
        },
    });

    const training9 = await prisma.trainingSession.create({
        data: {
            ploegNaam: ploeg4.ploegnaam,
            zaalNaam: zaal1.naam,
            datum: new Date('2024-12-23'),
            startTijd: '09:00',
            eindTijd: '11:00',
        },
    });

    const training10 = await prisma.trainingSession.create({
        data: {
            ploegNaam: ploeg5.ploegnaam,
            zaalNaam: zaal2.naam,
            datum: new Date('2024-12-24'),
            startTijd: '13:00',
            eindTijd: '15:00',
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