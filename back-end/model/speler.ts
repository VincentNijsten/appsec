import { Ploeg } from "./ploeg";
import { Coach as CoachPrisma, Speler as SpelerPrisma, Ploeg as PloegPrisma } from '@prisma/client';


export class Speler {
    public naam!: string;
    public spelerLicentie!: string;
    public leeftijd!: number;
    public ploegNaam!: string |null;
    

    constructor(speler:{naam: string, spelerLicentie: string, leeftijd: number,ploegNaam: string| null;}) {
        this.setNaam(speler.naam);
        this.setspelerLicentie(speler.spelerLicentie);
        this.setLeeftijd(speler.leeftijd);
        this.setPloegNaam(speler.ploegNaam);
    }

    public getNaam(): string {
        return this.naam;
    }

    public getspelerLicentie(): string {
        return this.spelerLicentie;
    }

    public getLeeftijd(): number {
        return this.leeftijd;
    }

    public setPloegNaam(ploegNaam: string |null) {
        this.ploegNaam = ploegNaam;

    }



    public setNaam(naam: string) {
        if (!naam || naam.trim().length === 0) {
            throw new Error('Naam van de speler is verplicht.');
        }
        this.naam = naam;
    }

    public setspelerLicentie(spelerLicentie: string) {
        const licentieRegex = /^[0-9]{7}$/; // Reguliere expressie voor zeven cijfers

        if (!spelerLicentie.match(licentieRegex)) {
            throw new Error('SpelerLicentie moet uit zeven cijfers bestaan.');
        }
        this.spelerLicentie = spelerLicentie;
    }

    public setLeeftijd(leeftijd: number) {
        if (leeftijd < 0 || leeftijd > 120) { 
            throw new Error('Leeftijd moet een geldig getal zijn tussen 0 en 120.');
        }
        this.leeftijd = leeftijd;
    }





    static from({ naam, spelerLicentie, leeftijd, ploegNaam }: SpelerPrisma) {
        return new Speler({
            naam, spelerLicentie, leeftijd, ploegNaam
        });
    }

   
}