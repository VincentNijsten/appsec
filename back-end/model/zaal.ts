export class Zaal {
    private address!: string;
    private naam!: string;
    private beschikbaarheid!: boolean;

    constructor(zaal: { address: string; naam: string; beschikbaarheid: boolean }) {
        this.setAddress(zaal.address);
        this.setNaam(zaal.naam);
        this.setBeschikbaarheid(zaal.beschikbaarheid);
    }

    // Getters voor zaal
    public getAddress(): string {
        return this.address;
    }

    public getNaam(): string {
        return this.naam;
    }

    public getBeschikbaarheid(): boolean {
        return this.beschikbaarheid;
    }

    // Setters voor zaal met validaties

    public setAddress(address: string) {
        // const addressPattern = /^\d+\s[A-z]+\s[A-z]+/; // Basis patroon voor straatnaam en huisnummer
        // if (!address || !addressPattern.test(address)) {
        //     throw new Error('Ongeldig adres. Zorg ervoor dat het adres een straatnaam en huisnummer bevat.');
        // }
        this.address = address;
    }

    public setNaam(naam: string) {
        if (!naam || naam.trim().length === 0) {
            throw new Error('Naam is verplicht.');
        }
        this.naam = naam;
    }

    public setBeschikbaarheid(value: boolean) {
        this.beschikbaarheid = value; 
    }
}