'use strict';

angular.module('GameNightVotingApp', [
    'playerLogin',
    'gameTable',
    'gameDetails',
    'firebase',
]);

firebase.initializeApp(config);