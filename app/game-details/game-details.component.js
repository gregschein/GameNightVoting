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
        controller: function GameDetailsController($firebaseObject, $firebaseArray) {
            let self = this;
            self.$onInit = function() {
                if (self.age =='old') {
                    let ref = firebase.database().ref('Games').child(self.name);
                    self.obj = $firebaseObject(ref);
                    self.obj.$bindTo(this, 'self.details').then(function() {
                        console.log(self.details);
                    });
                    // self.name = self.obj['Name'];
                    // self.playerCount = self.obj['PlayerCount'];
                    // self.playTime = self.obj['PlayTime'];
                    // self.description = self.obj['Description'];
                } else {
                   let gameData = {};
                    let ref = firebase.database().ref('Games');
                    let newEntry = $firebaseArray(ref);
                    newEntry.$add({name: self.name});
                }
            };
            self.submitDetails = function() {
                if (self.age == 'new') {
                    let gameData = {};
                    let ref = firebase.database().ref('Games');
                    let newEntry = $firebaseArray(ref);
                    console.log(newEntry);
                }
                // self.obj['Name'] = self.name;
                // self.obj['PlayerCount'] = self.playerCount;
                // self.obj['PlayTime'] = self.playTime;
                // self.obj['Description'] = self.description;
                self.obj.$save().then(function(ref) {
                    ref.key === self.obj.$id;
                }, function(error) {
                    console.log(error);
                });
                self.onSubmit();
            };
        },
});
