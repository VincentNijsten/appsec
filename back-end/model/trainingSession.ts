import { Zaal } from './zaal'; 
import { Ploeg } from './ploeg'; 

export class TrainingSession {
    public ploeg!: Ploeg;
    public zaal!: Zaal;
    public datum!: Date;
    public startTijd!: string;
    public eindTijd!: string;

    constructor(trainingSession: {
        ploeg: Ploeg;
        zaal: Zaal;
        datum: Date;
        startTijd: string;
        eindTijd: string;
    }) {
        this.setPloeg(trainingSession.ploeg);
        this.setZaal(trainingSession.zaal);
        this.setDatum(trainingSession.datum);
        this.setTijden(trainingSession.startTijd, trainingSession.eindTijd);
    }

    // Getters
    public getPloeg(): Ploeg {
        return this.ploeg;
    }

    public getZaal(): Zaal {
        return this.zaal;
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

    public setPloeg(ploeg: Ploeg) {
     
        this.ploeg = ploeg;
    }

    public setZaal(zaal: Zaal) {
    
        this.zaal = zaal;
    }

    // Methode om de details van de trainingssessie weer te geven
    public displaySessionDetails(): string {
        return `Training Session:
        Team: ${this.ploeg.getPloegnaam()}
        Hall: ${this.zaal.getNaam()}
        Date: ${this.datum.toDateString()}
        Time: ${this.startTijd} - ${this.eindTijd}`;
    }
}