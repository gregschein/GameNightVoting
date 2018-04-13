'use strict';

angular.
    module('gameTable').
    component('gameTable', {
        templateUrl: 'vote/game-table/game-table.template.html',
        bindings: {
            votes: '=',
            choose: '<',
        },
        controller: function GameTableController($firebaseAuth, $firebaseObject) {
            let self = this;
            self.horizontalExclusive = function(column) {
                if (self.secondChoice == self.firstChoice) {
                    if (column == 'first') {
                        self.secondChoice = undefined;
                    } else {
                        self.firstChoice = undefined;
                    }
                }
                self.votes = [self.firstChoice, self.secondChoice];
            };
            let getNextGameNight = function() {
                let gameDay = new Date();
                gameDay.setDate(gameDay.getDate() + (4+(7-gameDay.getDay()))%7);
                let dd = gameDay.getDate();
                if (dd<10) {
                    dd = '0'+dd;
                };
                let mm = gameDay.getMonth()+1;
                if (mm<10) {
                    mm = '0'+mm;
                };
                let yyyy = gameDay.getFullYear();
                let totalDate = mm+'/'+dd+'/'+yyyy;
                return totalDate;
            };
            self.date = getNextGameNight();
            let gamesDB = firebase.database().ref('/Games/');
            self.gamesObj = $firebaseObject(gamesDB);
            self.gamesObj.$loaded().then(function() {
                // angular.forEach(self.gamesObj, function(game) {
                //     self.games.push(game);
                // });
            });
            gamesDB.on('value', function(data) {
                self.games = [];
                for (let game in data.val()) {
                    if (data.val() !==null) {
                        self.games.push(data.val()[game]);
                    }
                };
            });
        },
});
