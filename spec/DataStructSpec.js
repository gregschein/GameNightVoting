let dataStructures = require('../js/dataStructures.js');
describe('Create Vote', function() {
    it('Creates a vote', function() {
        expect(dataStructures.createVote('Greg', 'Agricola', '20171219'))
            .toEqual({
                VoterName: 'Greg',
                GameName: 'Agricola',
                Date: '20171219',
            });
    });
});
