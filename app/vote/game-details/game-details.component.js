'use strict';

angular.
    module('gameDetails').
    component('gameDetails', {
        templateUrl: 'vote/game-details/game-details.template.html',
        bindings: {
            game: '=',
            close: '<',
        },
        controller: function GameDetailsController() {
            let self = this;
            self.$onInit = function() {
                self.gameDB = firebase.database().ref('/Games/'+self.game['Name']+'/');
                self.gameDB.once('value', function(data) {
                    self.game = data.val();
                });
            };
            self.closeDetails = function() {
                self.gameDB.update(self.game);
                self.close();
            };
        },
});
