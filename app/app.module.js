'use strict';

firebase.initializeApp(config);

let app = angular.module('GameNightVotingApp', [
    'ui.bootstrap',
    'vote',
    'playerLogin',
    'gameTable',
    'gameDetails',
    'newGame',
    'firebase',
    'ngRoute',
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/404', {
            templateUrl: 'views/404.html',
        })
        // .when('/login', {
        //     template: '<player-login></player-login>',
        // })
        .when('/vote', {
            template: '<vote></vote>',
        })
        .otherwise({
            templateUrl: 'views/main.html',
        });
}]);

app.controller('mainCtrl', function($scope, $firebaseAuth, $firebaseObject) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.currentUser = user.displayName;
            $scope.loggedIn = true;
        } else {
            $scope.currentUser = '';
            $scope.loggedIn = false;
        }
    });
    self.getNextGameNight = function() {
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
        let totalDate = yyyy+mm+dd;
        return totalDate;
    };
    $scope.winners = 'none';
    firebase.database().ref('/Votes/'+getNextGameNight()+'/Winners/')
        .once('value', function(data) {
            // $scope.winners = Object.keys(data.val());
        });
    $scope.button = 1;
    $scope.loggedIn = false;
    $scope.change = function() {
        $scope.button++;
    };
});
