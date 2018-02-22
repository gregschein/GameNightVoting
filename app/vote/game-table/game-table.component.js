'use strict';

angular.
    module('gameTable').
    component('gameTable', {
        templateUrl: 'vote/game-table/game-table.template.html',
        bindings: {
            games: '<',
            votes: '=',
            choose: '<',
        },
        controller: function GameTableController($firebaseObject, $firebaseAuth) {
            let self = this;
            self.horizontalExclusive = function(column) {
                if (self.secondChoice == self.firstChoice) {
                    if (column == 'first') {
                        self.secondChoice = '';
                    } else {
                        self.firstChoice = '';
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
            // self.openDetails = function(clickedName) {
            //     self.chosenGame = clickedName;
            // };
            // self.newGameSubmit = function() {
            //     if (self.games.includes(self.newGameName)) {
            //         alert('Game already exists in list');
            //         return;
            //     };
            //     self.games.push(self.newGameName);
            //     self.openGameDetails(self.newGameName, 'new');
            //     self.newGameName = '';
            // };
        },
});
