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
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.currentUser = user.displayName;
            $scope.loggedIn = true;
        } else {
            $scope.currentUser = '';
            $scope.loggedIn = false;
        }
    });
    $scope.button = 1;
    $scope.loggedIn = false;
    $scope.change = function() {
        $scope.button++;
    };
});
