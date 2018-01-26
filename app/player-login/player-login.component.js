'use strict';

angular.
    module('playerLogin').
    component('playerLogin', {
        templateUrl: 'player-login/player-login.template.html',
        controller: function PlayerLoginController() {
            let self = this;
            let firebaseObj = new Firebase('https://gamenightvoting.firebaseio.com/');
            let loginObj = new FirebaseSimpleLogin(firebaseObj);
            self.signIn = function() {
                let username = self.user.email;
                let password = self.user.password;
                loginObj.$login('password', {
                    email: username,
                    password: password,
                })
                .then(function(user) {
                    alert('we gud');
                }, function(error) {
                    alert('shit fukt');
                });
            };
        },
});
