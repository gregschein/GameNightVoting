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
        controller: function GameDetailsController($http, $firebaseObject) {
            let self = this;
            self.$onInit = function() {
                if (self.age =='old') {
                    // $http.get('games/'+self.name+'.json').
                    //     then(function(response) {
                    //         self.gameDeets = response.data;
                    // }, function errorCallBack(response) {
                    //     console.log('shit fucked');
                    // });
                    let ref = firebase.database().ref('Games').child(self.name);
                    let obj = $firebaseObject(ref);
                    obj.$loaded().then(function() {
                        self.name = obj['Name'];
                        self.playerCount = obj['PlayerCount'];
                        self.playTime = obj['PlayTime'];
                        self.description = obj['Description'];
                    //    angular.forEach(obj, function(value, key) {
                    //       console.log(key, value);
                    //    });
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
