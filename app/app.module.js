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
        .when('/login', {
            template: '<player-login></player-login>',
        })
        .when('/vote', {
            template: '<vote></vote>',
        })
        .otherwise({
            templateUrl: 'views/main.html',
        });
}]);

app.controller('mainCtrl', function($scope, $firebaseAuth, $firebaseObject) {
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
        let totalDate = dd+mm+yyyy;
        return totalDate;
    };
    let gameNightDate = getNextGameNight();
    let ref = firebase.database().ref();
    let votePool = $firebaseObject(ref.child('Votes'));
    votePool.$loaded().then(function() {
        if (votePool[gameNightDate] == undefined) {
            initGameNight();
        };
    });
    let initGameNight = function() {
            let date = {};
            date[gameNightDate] = {
                'First Choice': {init: 0},
                'Second Choice': {init: 0},
                'Voted': ['init'],
            };
            ref.child('Votes').update(date);
    };
    $scope.resetVotePool = function() {
        console.log('button pressed');
        initGameNight();
    };
    $scope.button = 1;
    $scope.change = function() {
        $scope.button++;
    };
});
