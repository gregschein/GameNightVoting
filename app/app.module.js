'use strict';

firebase.initializeApp(config);

let app = angular.module('GameNightVotingApp', [
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
            templateUrl: 'views/login.html',
        })
        .when('/vote', {
            template: '<vote></vote>',
        })
        .otherwise({
            templateUrl: 'views/main.html',
        });
}]);


app.controller('mainCtrl', function($scope, $firebaseAuth) {
    // $scope.something = 'test';
    // $scope.ref = firebase.database().ref();
    // let authObj = $firebaseAuth();
    // $scope.currentUser = authObj.$getAuth();
    // $scope.visible = true;
});

