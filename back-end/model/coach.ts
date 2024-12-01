import { Coach as CoachPrisma} from '@prisma/client';

export class Coach {
  
    public naam!: string; 
    public coachLicentie!: string; 

    constructor(coach:{naam: string, coachLicentie: string}) {
       
        this.setNaam(coach.naam);
        this.setCoachlicentie(coach.coachLicentie);
    }

    // Getters
    public getNaam(): string {
        return this.naam;
    }

    public getCoachlicentie(): string {
        return this.coachLicentie;
    }

    // Setters
    public setNaam(naam: string) {
        if (!naam || naam.trim().length === 0) {
            throw new Error('Naam van de coach is verplicht.');
        }
        this.naam = naam;
    }

    public setCoachlicentie(coachLicentie: string) {
        const licentieRegex = /^[0-9]{7}$/; // Reguliere expressie voor zeven cijfers

        if (!coachLicentie.match(licentieRegex)) {
            throw new Error('Coachlicentie moet uit zeven cijfers bestaan.');
        }
        this.coachLicentie = coachLicentie;
    }



    static from({
       naam,
       coachLicentie

    }: CoachPrisma 
        
    ) {
        return new Coach({
            naam,
            coachLicentie

        });
    }
}
