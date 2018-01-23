'use strict';

angular.
    module('gameTable').
    component('gameTable', {
        templateUrl: 'game-table/game-table.template.html',
        controller: function GameTableController() {
            let self = this;
            this.games = [
                'agricola', 'spartacus', 'keyflower',
            ];
            this.firstChoice = 'agricola';
            this.horizontalExclusive = function(column) {
                if (self.secondChoice == self.firstChoice) {
                    if (column == 'first') {
                        self.secondChoice = '';
                    } else {
                        self.firstChoice = '';
                    }
                }
            };
            this.testButton = function() {
                document.getElementById('gametable').append('yes');
            };
            this.newGameSubmit = function() {
                this.games.push(this.newGameName);
                this.newGameName = '';
            };
        },
});
