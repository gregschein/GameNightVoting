'use strict';

firebase.initializeApp(config);

let app = angular.module('GameNightVotingApp', [
    'playerLogin',
    'gameTable',
    'gameDetails',
    'firebase',
    'ngRoute',
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/404', {
            templateUrl: 'views/404.html',
        })
        .when('/login', {
            templateUrl: 'views/login.html',
        })
        .when('/vote', {
            templateUrl: 'views/vote.html',
        })
        .otherwise({
            templateUrl: 'views/main.html',
        });
}]);


app.controller('mainCtrl', function($scope, $firebaseAuth) {
    $scope.something = 'test';
    $scope.ref = firebase.database().ref();
    let authObj = $firebaseAuth();
    $scope.currentUser = authObj.$getAuth();
    $scope.visible = true;
    $scope.activeGame = 'Nothin';
});

app.controller('VoteController', function($scope) {
    $scope.something = 'in vote ctrl';
    $scope.gameList = [];
});
