'use strict';

angular.
    module('vote').
    component('vote', {
        templateUrl: 'vote/vote.template.html',
        controller: function VoteController($firebaseObject) {
            let self = this;
            self.$onInit = function() {
                self.ref = firebase.database().ref();
                self.games = $firebaseObject(self.ref.child('Games'));
                self.votePool = $firebaseObject(self.ref.child('Votes'));
                self.gameNightDate = self.getNextGameNight();
            };
            self.getNextGameNight = function() {
                let gameDay = new Date();
                gameDay.setDate(gameDay.getDate() + (4+(7-gameDay.getDay()))%7);
                let dd = gameDay.getDate();
                if (dd<10) {
                    dd = '0'+dd;
                };
                let mm = gameDay.getMonth()+1;
                if (mm<10) {
                    mm = '0'+mm;
                };
                let yyyy = gameDay.getFullYear();
                let totalDate = dd+mm+yyyy;
                return totalDate;
            };
            self.vote = function() {
                if (self.votes == undefined) {
                    alert('Please select your choices of games');
                    return;
                };
                self.currentUser = firebase.auth().currentUser;
                let voter = {};
                        voter[self.currentUser.uid] = self.currentUser.displayName;
                        self.ref.child('Votes/'+self.gameNightDate+'/Voted').update(voter);
                if (Object.keys(self.votePool[self.gameNightDate]['Voted']).includes(self.currentUser.uid)) {
                    alert('You already voted son');
                    return;
                } else {
                        let firstVotes = self.votePool[self.gameNightDate]['First Choice'];
                        if (Object.keys(firstVotes).includes(self.votes[0])) {
                            firstVotes[self.votes[0]]++;
                            self.votePool.$save();
                        } else {
                            let voteEntry = {};
                            voteEntry[self.votes[0]] = 1;
                            self.ref.child('Votes/'+self.gameNightDate+'/First Choice').update(voteEntry);
                        };
                        let secondVotes = self.votePool[self.gameNightDate]['Second Choice'];
                        if (Object.keys(secondVotes).includes(self.votes[1])) {
                            secondVotes[self.votes[1]]++;
                            self.votePool.$save();
                        } else {
                            let voteEntry = {};
                            voteEntry[self.votes[1]] = 1;
                            self.ref.child('Votes/'+self.gameNightDate+'/Second Choice').update(voteEntry);
                        }
                        let voter = {};
                        voter[self.currentUser.uid] = self.currentUser.displayName;
                        self.ref.child('Votes/'+self.gameNightDate+'/Voted').update(voter);
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
