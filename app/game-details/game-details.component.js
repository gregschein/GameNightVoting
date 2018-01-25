'use strict';

angular.
    module('gameDetails').
    component('gameDetails', {
        templateUrl: 'game-details/game-details.template.html',
        bindings: {
            name: '<',
            age: '<',
            onSubmit: '&',
        },
        controller: function GameDetailsController($http) {
            let self = this;
            self.$onInit = function() {
                if (self.age =='old') {
                    $http.get('games/'+self.name+'.json').
                        then(function(response) {
                            self.gameDeets = response.data;
                    }, function errorCallBack(response) {
                        console.log('shit fucked');
                    });
                } else {
                    self.gameDeets = {'Name': self.name};
                }
            };
            self.openDetails = function() {
                // make details slide in from right
            };
            self.submitDetails = function() {
                // close details, and save data somehow
                self.onSubmit({name: self.gameDeets.Name});
            };
        },
});
