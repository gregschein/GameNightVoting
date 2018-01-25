'use strict';

angular.
    module('gameDetails').
    component('gameDetails', {
        templateUrl: 'game-details/game-details.template.html',
        controller: function GameDetailsController() {
            let self = this;
            self.delete = function() {
                self.onDelete({output: self.name});
            };
            self.update = function(prop, value) {
                self.onUpdate({output: self.name, prop: prop, value: value});
            };
            self.openDetails = function() {
                // make details slide in from right
            };
            self.submitDetails = function() {
                // close details, and save data somehow
                self.onSubmit({details: 'a stuff'});
            };
        },
        bindings: {
            name: '<',
            visible: '<',
            onSubmit: '&',
        },
});
