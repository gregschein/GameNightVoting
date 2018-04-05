'use strict';

angular.
    module('vote').
    component('vote', {
        templateUrl: 'vote/vote.template.html',
        controller: function VoteController($firebaseObject) {
            let self = this;
            self.$onInit = function() {
                self.ref = firebase.database().ref();
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
                let totalDate = yyyy+mm+dd;
                return totalDate;
            };
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    self.currentUser = user;
                } else {
                    self.currentUser = null;
                }
            });
            self.vote = function() {
                if (self.votes == undefined) {
                    alert('Please select your choices of games');
                    return;
                };
                if (false) {
                    alert('You already voted son');
                    return;
                } else {
                    if (self.votes[0] !== undefined) {
                        self.ref.child('Votes/'+self.gameNightDate+'/First Choice').once('value', function(data) {
                            self.voteEntry = {};
                            try {
                                if (self.votes[0] in data.val()) {
                                    self.voteEntry[self.votes[0]] = data.val()[self.votes[0]]+1;
                                } else {
                                    self.voteEntry[self.votes[0]] = 1;
                                };
                            } catch (error) {
                                console.log(error);
                                self.voteEntry[self.votes[0]] = 1;
                            }
                            self.ref.child('Votes/'+self.gameNightDate+'/First Choice').update(self.voteEntry);
                        });
                    } else {
                        alert('Please choose your preferred game to play. (Second Choice is optional)');
                        return;
                    };
                    if (self.votes[1] !== undefined) {
                        self.ref.child('Votes/'+self.gameNightDate+'/Second Choice').once('value', function(data) {
                            self.voteEntry = {};
                            try {
                                if (self.votes[1] in data.val()) {
                                    self.voteEntry[self.votes[1]] = data.val()[self.votes[1]]+1;
                                } else {
                                    self.voteEntry[self.votes[1]] = 1;
                                };
                            } catch (error) {
                                console.log(error);
                                self.voteEntry[self.votes[1]] = 1;
                            }
                            self.ref.child('Votes/'+self.gameNightDate+'/Second Choice').update(self.voteEntry);
                        });
                    };
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
                self.gamesObj.$save();
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
