'use strict';

angular.
    module('gameTable').
    component('gameTable', {
        templateUrl: 'game-table/game-table.template.html',
        controller: function GameTableController($firebaseObject, $firebaseAuth) {
            let self = this;
            self.visible = false;
            self.games = [];
            self.authObj = $firebaseAuth();
            self.$onInit = function() {
                let ref = firebase.database().ref('Games');
                let gamesObj = $firebaseObject(ref);
                gamesObj.$loaded().then(function() {
                    angular.forEach(gamesObj, function(key, value) {
                        self.games.push(value);
                    });
                });
            };
            self.horizontalExclusive = function(column) {
                if (self.secondChoice == self.firstChoice) {
                    if (column == 'first') {
                        self.secondChoice = '';
                    } else {
                        self.firstChoice = '';
                    }
                }
            };
            self.vote = function() {
                console.log('First: ' + self.firstChoice);
                console.log('Second: ' + self.secondChoice);
            };
            self.newGameSubmit = function() {
                if (self.games.includes(self.newGameName)) {
                    alert('Game already exists in list');
                    return;
                };
                self.games.push(self.newGameName);
                self.openGameDetails(self.newGameName, 'new');
                self.newGameName = '';
            };
            self.openGameDetails = function(gameName, age) {
                let firebaseUser = self.authObj.$getAuth();
                if (firebaseUser) {
                    if (!self.visible) {
                        self.age = age;
                        self.activeGame = gameName;
                        self.visible = true;
                    } else {
                        alert('Please finish with the other game before opening a new one');
                    };
                } else {
                    alert('Please log in first');
                }
            };
            self.returnDetails = function(details) {
                self.details = details;
                self.visible = false;
                if (!self.games.includes(self.details)) {
                    self.games.push(self.details);
                }
            };
        },
});
