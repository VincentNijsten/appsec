import { Zaal } from './zaal'; 
import { Ploeg } from './ploeg'; 
import { Coach as CoachPrisma, Speler as SpelerPrisma, Ploeg as PloegPrisma, TrainingSession as TrainingSessionPrisma } from '@prisma/client';


export class TrainingSession {
    public id?: string;
    public zaalNaam!: string;
    public datum!: Date;
    public startTijd!: string;
    public eindTijd!: string;
    public ploegen!: Ploeg[];

    constructor(trainingSession: {
        id: string;
        zaalNaam: string;
        datum: Date;
        startTijd: string;
        eindTijd: string;
        ploegen?: Ploeg[];
    }) {
        this.setZaal(trainingSession.zaalNaam);
        this.setDatum(trainingSession.datum);
        this.setTijden(trainingSession.startTijd, trainingSession.eindTijd);
        this.id = trainingSession.id;
        this.setPloegen(trainingSession.ploegen || []);
    }

    // Getters
   

    public getZaalNaam(): string {
        return this.zaalNaam;
    }

    public getDatum(): Date {
        return this.datum;
    }

    public getStartTijd(): string {
        return this.startTijd;
    }

    public getEindTijd(): string {
        return this.eindTijd;
    }

    // Setters
    public setDatum(datum: Date) {
        this.datum = datum;
    }

    public getPloegen(): Ploeg[] {
        return this.ploegen;
    }

    public setPloegen(ploegen: Ploeg[]) {
        this.ploegen = ploegen;
    }

    public addPloeg(ploeg: Ploeg) {
        this.ploegen.push(ploeg);
    }



    public setTijden(startTijd: string, eindTijd: string) {
        if (startTijd >= eindTijd) {
            throw new Error('Start time cannot be after or equal to end time');
        }
        this.startTijd = startTijd;
        this.eindTijd = eindTijd;
    }

  

    public setZaal(zaalNaam: string) {
    
        this.zaalNaam = zaalNaam;
    }



    static from({
        id,
        zaalNaam, 
        datum, 
        startTijd,
        eindTijd,
        ploegen
    
    }: TrainingSessionPrisma &{ploegen : PloegPrisma[]}) {
        return new TrainingSession({
            id, 
            zaalNaam, 
            datum, 
            startTijd,
            eindTijd, 
            ploegen: ploegen.map((ploeg) => Ploeg.from(ploeg))
        });
    }



}