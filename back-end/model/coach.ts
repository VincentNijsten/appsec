import { Ploeg } from "./ploeg"; 

export class Coach {
  
    private ploeg!: Ploeg | undefined; 
    private naam!: string; 
    private coachlicentie!: string; 

    constructor(coach:{naam: string, coachlicentie: string,ploeg?: Ploeg}) {
        this.setPloeg(coach.ploeg);
        this.setNaam(coach.naam);
        this.setCoachlicentie(coach.coachlicentie);
    }

    // Getters
    public getPloeg(): Ploeg | undefined {
        return this.ploeg;
    }

    public getNaam(): string {
        return this.naam;
    }

    public getCoachlicentie(): string {
        return this.coachlicentie;
    }

    // Setters
    public setPloeg(ploeg: Ploeg |undefined) {
        this.ploeg = ploeg; 
    }





    public setNaam(naam: string) {
        if (!naam || naam.trim().length === 0) {
            throw new Error('Naam van de coach is verplicht.');
        }
        this.naam = naam;
    }

    public setCoachlicentie(coachlicentie: string) {
        const licentieRegex = /^[0-9]{7}$/; // Reguliere expressie voor zeven cijfers

        if (!coachlicentie.match(licentieRegex)) {
            throw new Error('Coachlicentie moet uit zeven cijfers bestaan.');
        }
        this.coachlicentie = coachlicentie;
    }
}