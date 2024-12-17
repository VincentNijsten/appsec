import { PrismaClient } from '@prisma/client';
import { Zaal } from '../model/zaal';

const prisma = new PrismaClient();

// Functie om een zaal op naam te vinden
const getZaalByNaam = async (naam: string): Promise<Zaal | null> => {
    try {
        const zaalData = await prisma.zaal.findUnique({
            where: { naam }
        });
        return zaalData ? Zaal.from(zaalData) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om alle zalen op te halen
const getAllZalen = async (): Promise<Zaal[]> => {
    try {
        const zalenData = await prisma.zaal.findMany();
        return zalenData.map(zaal => Zaal.from(zaal));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om een zaal toe te voegen
const addZaal = async (zaal: Zaal): Promise<Zaal> => {
    try {
        const newZaal = await prisma.zaal.create({
            data: {
                naam: zaal.getNaam(),
                address: zaal.getAddress(),
                beschikbaarheid: zaal.getBeschikbaarheid(),
            }
        });
        console.log(`Zaal ${newZaal.naam} toegevoegd.`);
        return Zaal.from(newZaal);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};



// Functie om een zaal bij te werken
const updateZaal = async (naam: string, zaalData: Partial<Zaal>): Promise<Zaal> => {
    try {
        const updatedZaal = await prisma.zaal.update({
            where: { naam: naam },
            data: {
                address: zaalData.address,
                beschikbaarheid: zaalData.beschikbaarheid,
            },
        });
        console.log(`Zaal ${updatedZaal.naam} bijgewerkt.`);
        return Zaal.from(updatedZaal);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om een zaal te verwijderen
const deleteZaal = async (naam: string): Promise<void> => {
    try {
        await prisma.zaal.delete({
            where: { naam: naam },
        });
        console.log(`Zaal ${naam} verwijderd.`);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getZaalByNaam,
    getAllZalen,
    addZaal,
    updateZaal,
    deleteZaal
};