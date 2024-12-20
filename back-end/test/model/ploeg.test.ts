import { Ploeg } from '../../model/ploeg';

describe('Ploeg', () => {
    test('given: valid values for ploeg, when: ploeg is created, then: ploeg is created with those values', () => {
        // given
        const validPloegData = {
            niveau: 'Professioneel',
            ploegnaam: 'Heren A',
            coachLicentie: '1234567',
        };

        // when
        const ploeg = new Ploeg(validPloegData);

        // then
        expect(ploeg.getNiveau()).toEqual(validPloegData.niveau);
        expect(ploeg.getPloegnaam()).toEqual(validPloegData.ploegnaam);
        expect(ploeg.getCoachLicentie()).toEqual(validPloegData.coachLicentie);
    });

    test('given: an existing ploeg, when: updating the ploegnaam, then: the name is updated', () => {
        // given
        const ploeg = new Ploeg({
            niveau: 'Professioneel',
            ploegnaam: 'Heren A',
            coachLicentie: '1234567',
        });

        // when
        ploeg.setPloegnaam('Heren B');

        // then
        expect(ploeg.getPloegnaam()).toEqual('Heren B');
    });

    test('given: an invalid ploegnaam, when: setting the ploegnaam, then: an error is thrown', () => {
        // given
        const ploeg = new Ploeg({
            niveau: 'Professioneel',
            ploegnaam: 'Heren A',
            coachLicentie: '1234567',
        });

        // when
        const setInvalidName = () => ploeg.setPloegnaam('');

        // then
        expect(setInvalidName).toThrow('Ploegnaam is verplicht.');
    });

    test('given: an invalid niveau, when: setting the niveau, then: an error is thrown', () => {
        // given
        const ploeg = new Ploeg({
            niveau: 'Professioneel',
            ploegnaam: 'Heren A',
            coachLicentie: '1234567',
        });

        // when
        const setInvalidNiveau = () => ploeg.setNiveau('');

        // then
        expect(setInvalidNiveau).toThrow('Niveau is verplicht.');
    });

    test('given: a ploeg with null coachLicentie, when: creating the ploeg, then: the coachLicentie is null', () => {
        // when
        const ploeg = new Ploeg({
            niveau: 'Professioneel',
            ploegnaam: 'Heren A',
            coachLicentie: null,
        });

        // then
        expect(ploeg.getCoachLicentie()).toBeNull();
    });
});