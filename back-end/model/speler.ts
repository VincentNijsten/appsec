import { Ploeg } from "./ploeg";

export class Speler {
    private naam!: string;
    private spelerlicentie!: string;
    private leeftijd!: number;
    

    constructor(speler:{naam: string, spelerlicentie: string, leeftijd: number}) {
        this.setNaam(speler.naam);
        this.setSpelerlicentie(speler.spelerlicentie);
        this.setLeeftijd(speler.leeftijd);
    }

    public getNaam(): string {
        return this.naam;
    }

    public getSpelerlicentie(): string {
        return this.spelerlicentie;
    }

    public getLeeftijd(): number {
        return this.leeftijd;
    }



    public setNaam(naam: string) {
        if (!naam || naam.trim().length === 0) {
            throw new Error('Naam van de speler is verplicht.');
        }
        this.naam = naam;
    }

    public setSpelerlicentie(spelerlicentie: string) {
        const licentieRegex = /^[0-9]{7}$/; // Reguliere expressie voor zeven cijfers

        if (!spelerlicentie.match(licentieRegex)) {
            throw new Error('Coachlicentie moet uit zeven cijfers bestaan.');
        }
        this.spelerlicentie = spelerlicentie;
    }

    public setLeeftijd(leeftijd: number) {
        if (leeftijd < 0 || leeftijd > 120) { 
            throw new Error('Leeftijd moet een geldig getal zijn tussen 0 en 120.');
        }
        this.leeftijd = leeftijd;
    }

   
}