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
                    self.ref.child(
                        'Players/'+firebase.auth().currentUser.displayName+'/'+self.gameNightDate)
                        .once('value', function(data) {
                            self.playerInfo = data.val();
                            if ('Attendance' in data.val()) {
                                self.attendance = data.val()['Attendance'];
                            } else {
                                self.attendance = 'Attending';
                                self.ref.child(
                                    'Players/'+firebase.auth().currentUser.displayName+'/'+self.gameNightDate)
                                    .update({Attendance: 'Attending'});
                            };
                        });
                } else {
                    self.currentUser = null;
                }
            });
            self.toggleAttendance = function() {
                if (self.attendance == 'Attending') {
                    self.attendance = 'Not attending';
                    self.ref.child(
                        'Players/'+firebase.auth().currentUser.displayName+'/'+self.gameNightDate)
                        .update({Attendance: 'Not attending'});
                } else {
                    self.attendance = 'Attending';
                    self.ref.child(
                        'Players/'+firebase.auth().currentUser.displayName+'/'+self.gameNightDate)
                        .update({Attendance: 'Attending'});
                }
            };
            self.vote = function() {
                if (self.votes == undefined) {
                    alert('Please select your choices of games');
                    return;
                };
                if (self.attendance == 'Not attending') {
                    alert('You have stated you are not attending. No vote for you.');
                    return;
                };
                if ('Voted Games' in self.playerInfo) {
                    alert('You already voted son');
                    return;
                } else {
                    let votedGames = {};
                    votedGames['Voted Games'] = [];
                    if (self.votes[0] !== undefined) {
                        votedGames['Voted Games'].push(self.votes[0]);
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
                        votedGames['Voted Games'].push(self.votes[1]);
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
                    self.ref.child('Players/'+firebase.auth().currentUser.displayName+'/'+self.gameNightDate).update(votedGames);
                    self.playerInfo['Voted Games'] = true;
                    
                }
            };
            self.openGameDetails = function(game) {
                if (self.game == undefined) {
                    self.game = game;
                } else {
                    alert('close previous game first');
                }
            };
            self.closeGameDetails = function() {
                self.game = null;
            };
            self.saveNewGame = function(name) {
                let playerRef = self.ref.child('Players/'+firebase.auth().currentUser.displayName+'/'+self.gameNightDate);
                playerRef.once('value', function(data) {
                    let gCObj = {};
                    if ('Games Created' in data.val()) {
                        gCObj['Games Created'] = data.val()['Games Created']+1;
                    } else {
                        console.log('didnt');
                        gCObj['Games Created'] = 1;
                    };
                    if (gCObj['Games Created']>=4) {
                        alert('You are limited to adding 3 new games per week.');
                        return;
                    } else {
                        playerRef.update(gCObj);
                        let gameEntry = {};
                        let entryDetails = {
                            Name: name,
                            PlayTime: '',
                            PlayerCount: '',
                            Description: '',
                        };
                        gameEntry[name] = entryDetails;
                        self.ref.child('Games').update(gameEntry);
                        self.ref.child('Games/'+name).once('value', function(newGame) {
                            self.openGameDetails(newGame.val());
                        });
                    }
                });
            };
    },
});
