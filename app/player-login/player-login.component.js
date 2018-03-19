'use strict';

angular.
    module('playerLogin').
    component('playerLogin', {
        templateUrl: 'player-login/player-login.template.html',
        controller: function PlayerLoginController(firebase, $firebaseAuth) {
            // Initialize Firebase
            let self = this;
            self.mode = 'signIn';
            self.loginObj = $firebaseAuth();
            self.signIn = function() {
                // let username = this.user.email;
                // let password = this.user.password;
                // self.loginObj.$signInWithEmailAndPassword(username, password).then(function(firebaseUser) {
                //     console.log('Signed in as:', firebaseUser.uid);
                // }).catch(function(error) {
                //     console.error('Authentication failed:', error);
                // });
                
                // self.user.email = '';
                // self.user.password = '';
                self.loginObj.$signInWithPopup('google').then(function(result) {
                    console.log('Signed in as:', result.user.uid);
                    self.mode = 'signOut';
                }).catch(function(error) {
                    console.error('Authentication failed:', error);
                });
            };
            self.signOut = function() {
                self.loginObj.$signOut();
                self.mode = 'signIn';
            };
        },
});
