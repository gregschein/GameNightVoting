'use strict';

angular.
    module('gameDetails').
    component('gameDetails', {
        templateUrl: 'vote/game-details/game-details.template.html',
        bindings: {
            details: '=',
            close: '<',
        },
        controller: function GameDetailsController() {
            let self = this;
        },
});
