'use strict';

angular.
    module('vote').
    component('vote', {
        templateUrl: 'vote/vote.template.html',
        controller: function VoteController($firebaseObject, $firebaseArray) {
            let self = this;
            self.ref = firebase.database().ref();
            self.games = $firebaseObject(self.ref.child('Games'));
            self.votePool = $firebaseObject(self.ref.child('Votes'));
            self.vote = function() {
                if (self.votes == undefined) {
                    alert('Please select your choices of games');
                    return;
                };
                let firstVotes = self.votePool['Date']['First Choice'];
                if (Object.keys(firstVotes).includes(self.votes[0])) {
                    firstVotes[self.votes[0]]++;
                    self.votePool.$save();
                } else {
                    let voteEntry = {};
                    voteEntry[self.votes[0]] = 1;
                    self.ref.child('Votes/Date/First Choice').update(voteEntry);
                };
                let secondVotes = self.votePool['Date']['Second Choice'];
                if (Object.keys(secondVotes).includes(self.votes[1])) {
                    secondVotes[self.votes[1]]++;
                    self.votePool.$save();
                } else {
                    let voteEntry = {};
                    voteEntry[self.votes[1]] = 1;
                    self.ref.child('Votes/Date/Second Choice').update(voteEntry);
                }
            };
            self.openGameDetails = function(name) {
                if (self.chosenGame == null) {
                    self.chosenGame = name;
                } else {
                    alert('close previous game first');
                }
            };
            self.closeGameDetails = function() {
                self.games.$save();
                self.chosenGame = null;
            };
            self.saveNewGame = function(name) {
                let gameEntry = {};
                let entryDetails = {
                    Name: name,
                    PlayTime: '',
                    PlayerCount: '',
                    Description: '',
                };
                gameEntry[name] = entryDetails;
                self.ref.child('Games').update(gameEntry);
            };
    },
});
