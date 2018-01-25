'use strict';

angular.
    module('gameTable').
    component('gameTable', {
        templateUrl: 'game-table/game-table.template.html',
        controller: function GameTableController($http) {
            let self = this;
            self.details = 'butts';
            self.visible = false;
            self.games = [
                'agricola', 'spartacus', 'keyflower',
            ];
            self.firstChoice = 'agricola';
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
                // Submit the details of game in json form in future.
                if (!self.visible) {
                    self.age = age;
                    self.activeGame = gameName;
                    self.visible = true;
                } else {
                    alert('Please finish with the other game before opening a new one');
                };
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
