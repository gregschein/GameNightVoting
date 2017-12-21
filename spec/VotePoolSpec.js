let dataStructures = require('../js/dataStructures.js');
let VotePool = require('../js/votePool.js');
describe('Tests Resolve Votes', function() {
    it('Should Compile all votes into a single list', function() {
        let TestPool = new VotePool('today');
        const TestGames = [
            'Spartacus',
            'Keyflower',
            'Agricola',
            'Five Tribes',
            'Agricola',
        ];
        for (i=0; i<TestGames.length; i++) {
            TestPool.castVote(dataStructures
                .createVote('Greg', TestGames[i], 'today'));
        }
        expect(TestPool.votes).toEqual([
            {VoterName: 'Greg', GameName: 'Spartacus', Date: 'today'},
            {VoterName: 'Greg', GameName: 'Keyflower', Date: 'today'},
            {VoterName: 'Greg', GameName: 'Agricola', Date: 'today'},
            {VoterName: 'Greg', GameName: 'Five Tribes', Date: 'today'},
            {VoterName: 'Greg', GameName: 'Agricola', Date: 'today'},
        ]);
    });
    // it('Should find the game with the most votes', function() {
    //     let TestPool = new VotePool('today');
    //     const TestGames = [
    //         'Spartacus',
    //         'Keyflower',
    //         'Agricola',
    //         'Five Tribes',
    //         'Agricola',
    //     ];
    // });
    it('Should find the game with the most votes', function() {
        let TestPool = new VotePool('today');
        const TestGames = [
            'Spartacus',
            'Keyflower',
            'Agricola',
            'Five Tribes',
            'Agricola',
            'Five Tribes',
            'Five Tribes',
            'Five Tribes',
        ];
        for (i=0; i<TestGames.length; i++) {
            TestPool.castVote(dataStructures
                .createVote('Greg', TestGames[i], 'today'));
        };
        expect(TestPool.resolveVotes()).toBe('Five Tribes');
    });
});
