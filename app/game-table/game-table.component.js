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
            this.horizontalExclusive = function(row, column) {
                if (self.secondChoice == self.firstChoice) {
                    self.firstChoice = '';
                    self.secondChoice = '';
                    if (column == 'first') {
                        self.firstChoice = row;
                    } else {
                        self.secondChoice = row;
                    }
                }
            };
        },
});
