'use strict';

angular.
    module('gameTable').
    component('gameTable', {
        templateUrl: 'game-table/game-table.template.html',
        controller: function GameTableController() {
            let self = this;
            self.activeGame = '';
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
            self.testButton = function() {
                self.name = 'yes';
            };
            self.newGameSubmit = function() {
                self.games.push(self.newGameName);
                self.newGameName = '';
            };
            self.openGameDetails = function(gameName) {
                // Submit the details of game in json form in future.
                self.activeGame = gameName;
                self.visible = true;
            };
            self.returnDetails = function(details) {
                self.details = details;
                self.visible = false;
            };
        },
});
