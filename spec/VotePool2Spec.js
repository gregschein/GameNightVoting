var dataStructures = require('../js/dataStructures.js');
var VotePool = require('../js/votePool2.js');
describe('Tests Resolve Votes', function() {
    it('should show this spec is being loaded', function(){
        expect(true).toBe(true);
    });
    
    it('Should Compile all votes into a single list', function(){
        var TestPool = new VotePool('today');
        var TestGames = [
            'Agricola',
            'Spartacus',
            'Keyflower',
            "Five Tribes",
            'Agricola',
            
        ];
        for (i=0; i<TestGames.length; i++) {
            TestPool.castVote(dataStructures.createVote('Greg', TestGames[i], 'today'));
        }
        expect(TestPool.votes).toEqual([
            {VoterName: "Greg", GameName: "Agricola", Date: "today"},
            {VoterName: "Greg", GameName: "Spartacus", Date: "today"},
            {VoterName: "Greg", GameName: "Keyflower", Date: "today"},
            {VoterName: "Greg", GameName: "Five Tribes", Date: "today"},
            {VoterName: "Greg", GameName: "Agricola", Date: "today"}
        ])
    })


})