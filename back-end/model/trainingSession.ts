import { Zaal } from './zaal'; 
import { Ploeg } from './ploeg'; 
import { Coach as CoachPrisma, Speler as SpelerPrisma, Ploeg as PloegPrisma, TrainingSession as TrainingSessionPrisma } from '@prisma/client';


export class TrainingSession {
    public id?: string;
    public ploegNaam!: string;
    public zaalNaam!: string;
    public datum!: Date;
    public startTijd!: string;
    public eindTijd!: string;

    constructor(trainingSession: {
        id: string;
        ploegNaam: string;
        zaalNaam: string;
        datum: Date;
        startTijd: string;
        eindTijd: string;
    }) {
        this.setPloegNaam(trainingSession.ploegNaam);
        this.setZaal(trainingSession.zaalNaam);
        this.setDatum(trainingSession.datum);
        this.setTijden(trainingSession.startTijd, trainingSession.eindTijd);
        this.id = trainingSession.id;
    }

    // Getters
    public getPloegNaam(): string {
        return this.ploegNaam;
    }

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



    public setTijden(startTijd: string, eindTijd: string) {
        if (startTijd >= eindTijd) {
            throw new Error('Start time cannot be after or equal to end time');
        }
        this.startTijd = startTijd;
        this.eindTijd = eindTijd;
    }

    public setPloegNaam(ploegNaam: string) {
     
        this.ploegNaam = ploegNaam;
    }

    public setZaal(zaalNaam: string) {
    
        this.zaalNaam = zaalNaam;
    }



    static from({ id, ploegNaam, zaalNaam, datum, startTijd,eindTijd}: TrainingSessionPrisma) {
        return new TrainingSession({
            id, ploegNaam, zaalNaam, datum, startTijd,eindTijd
        });
    }



}