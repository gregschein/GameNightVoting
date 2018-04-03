'use strict';

angular.
    module('playerLogin').
    component('playerLogin', {
        templateUrl: 'player-login/player-login.template.html',
        controller: function PlayerLoginController(firebase, $firebaseAuth) {
            // Initialize Firebase
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    self.currentUser = user;
                    self.mode = 'signOut';
                } else {
                    self.currentUser = null;
                    self.mode = 'signIn';
                }
            });
            let self = this;
            self.mode = 'signIn';
            self.loginObj = $firebaseAuth();
            self.signIn = function() {
                self.loginObj.$signInWithPopup('google').then(function(result) {
                    console.log('Signed in as:', result.user.uid);
                }).catch(function(error) {
                    console.error('Authentication failed:', error);
                });
            };
            self.signOut = function() {
                self.loginObj.$signOut();
            };
        },
});
