import { Ploeg } from "../../model/ploeg";
import { Coach } from "../../model/coach";
import { Speler } from "../../model/speler"
describe('Ploeg', () => {
    const coach = new Coach({ naam: 'Jan', coachlicentie: '1234567' });
    const speler1 = new Speler({ naam: 'Speler 1', spelerlicentie: '1234567', leeftijd: 17 }); 
    const speler2 = new Speler({ naam: 'Speler 2', spelerlicentie: '4567890', leeftijd: 35 });

    test('given: valid values for team, when: team is created, then: team is created with those values', () => {
        // given
        const validTeamData = { niveau: 'Professioneel', ploegnaam: 'Team A', spelers: [speler1, speler2], coach };

        // when
        const ploeg = new Ploeg(validTeamData);

        // then
        expect(ploeg.getNiveau()).toEqual(validTeamData.niveau);
        expect(ploeg.getPloegnaam()).toEqual(validTeamData.ploegnaam);
        expect(ploeg.getSpelers()).toEqual(validTeamData.spelers);
        expect(ploeg.getCoach()).toEqual(coach);
    });

    test('given: an existing team, when: changing the team name, then: team name is updated correctly', () => {
        // given
        const ploeg = new Ploeg({ niveau: 'Professioneel', ploegnaam: 'Team A', spelers: [speler1], coach });

        // when
        ploeg.setPloegnaam('Team B');

        // then
        expect(ploeg.getPloegnaam()).toEqual('Team B');
    });

    test('given: an existing team, when: setting an empty team name, then: an error is thrown', () => {
        // given
        const ploeg = new Ploeg({ niveau: 'Professioneel', ploegnaam: 'Team A', spelers: [speler1], coach });

        // when
        const setEmptyTeamName = () => ploeg.setPloegnaam('');

        // then
        expect(setEmptyTeamName).toThrow('Ploegnaam is verplicht.');
    });

    test('given: an existing team, when: adding a player to the team, then: player is added correctly', () => {
        // given
        const ploeg = new Ploeg({ niveau: 'Liga 1', ploegnaam: 'Team A', spelers: [speler1], coach });

        // when
        ploeg.addSpeler(speler2);

        // then
        expect(ploeg.getSpelers()).toContain(speler2);
        expect(ploeg.getSpelers()).toHaveLength(2);
    });

    test('given: an existing team, when: removing a player from the team, then: player is removed correctly', () => {
        // given
        const ploeg = new Ploeg({ niveau: 'Liga B', ploegnaam: 'Team A', spelers: [speler1, speler2], coach });

        // when
        ploeg.removeSpeler(speler1);

        // then
        expect(ploeg.getSpelers()).not.toContain(speler1);
        expect(ploeg.getSpelers()).toHaveLength(1);
    });

    test('given: an existing team, when: setting an empty level, then: an error is thrown', () => {
        // given
        const ploeg = new Ploeg({ niveau: 'Nationale 2', ploegnaam: 'Team A', spelers: [speler1], coach });

        // when
        const setEmptyLevel = () => ploeg.setNiveau('');

        // then
        expect(setEmptyLevel).toThrow('Niveau is verplicht.');
    });
});