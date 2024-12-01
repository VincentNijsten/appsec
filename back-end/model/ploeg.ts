import { Coach as CoachPrisma, Speler as SpelerPrisma, Ploeg as PloegPrisma } from '@prisma/client';
import { Speler } from './speler'; 
import { Coach } from './coach';

export class Ploeg {
   
    public niveau!: string;
    public ploegnaam!: string;
    // public spelers: Speler[];
    public coachLicentie!: string | null; 

    constructor(ploeg: { niveau: string; ploegnaam: string; coachLicentie: string | null }) {
        this.setNiveau(ploeg.niveau);
        this.setPloegnaam(ploeg.ploegnaam);
        // this.spelers = ploeg.spelers; 
        this.setCoachLicentie(ploeg.coachLicentie);
    }

    public getNiveau(): string {
        return this.niveau;
    }

    public getPloegnaam(): string {
        return this.ploegnaam;
    }

    // public getSpelers(): Speler[] {
    //     return this.spelers;
    // }

    public getCoachLicentie(): string | null { 
        return this.coachLicentie;
    }

    public setNiveau(niveau: string) {
        if (!niveau || niveau.trim().length === 0) {
            throw new Error('Niveau is verplicht.');
        }
        this.niveau = niveau;
    }

    public setCoachLicentie(coachLicentie: string | null) { 
        this.coachLicentie = coachLicentie;
    }

    public setPloegnaam(ploegnaam: string) {
        if (!ploegnaam || ploegnaam.trim().length === 0) {
            throw new Error('Ploegnaam is verplicht.');
        }
        this.ploegnaam = ploegnaam;
    }

    // public addSpeler(speler: Speler) {
    //     this.spelers.push(speler);
    // }

    // public removeSpeler(speler: Speler) {
    //     this.spelers = this.spelers.filter(s => s !== speler);
    // }

    static from({ niveau, ploegnaam, coachLicentie }: PloegPrisma) {
        return new Ploeg({
            niveau,
            ploegnaam,
            coachLicentie,
        });
    }
}