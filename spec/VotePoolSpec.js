let dataStructures = require('../js/dataStructures.js');
let VotePool = require('../js/votePool.js');
describe('Tests Resolve Votes', function() {
    it('Should create list of votes', function() {
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
    it('Should create list of games and their number of votes', function() {
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
        };
        expect(TestPool.tallyVotes()).toEqual(
            {'Spartacus': 1, 'Keyflower': 1, 'Agricola': 2, 'Five Tribes': 1}
        );
    });
    it('Should find the game with the most votes', function() {
        let TestPool = new VotePool('today');
        const TestGames = [
            'Spartacus',
            'Keyflower',
            'Agricola',
            'Five Tribes',
            'Agricola',
            'Five Tribes',
        ];
        for (i=0; i<TestGames.length; i++) {
            TestPool.castVote(dataStructures
                .createVote('Greg', TestGames[i], 'today'));
        };
        TestPool.resolveVotes();
        expect(TestPool.resolveVotes()).toEqual(['Agricola', 'Five Tribes']);
    });
});
