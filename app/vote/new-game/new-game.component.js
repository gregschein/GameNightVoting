'use strict';

angular.
    module('newGame').
    component('newGame', {
        bindings: {
            saveNewGame: '<',
        },
        templateUrl: 'vote/new-game/new-game.template.html',
        controller: function NewGameController() {
            let self = this;
            self.newGameSubmit = function() {
                self.saveNewGame(self.newGameName);
                self.newGameName = '';
            };
        },
});
