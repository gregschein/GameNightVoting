'use strict';

angular.
    module('playerLogin').
    component('playerLogin', {
        templateUrl: 'player-login/player-login.template.html',
        controller: function PlayerLoginController(firebase, $firebaseObject) {
            // Initialize Firebase
            let self = this;
            self.signIn = function() {
                // let username = self.user.email;
                // let password = self.user.password;
                let username = 'gregschein@gmail.com';
                let password = 'chester923';
                let loginObj = new FirebaseSimpleLogin(function(error, user) {
                    if (error) {
                      console.log('Authentication error: ', error);
                    } else if (user) {
                      console.log('User ' + user.id + ' authenticated via the ' + user.provider + ' provider!');
                    } else {
                      console.log("User is logged out.")
                    }
                  });
               loginObj.login('password', {
                   email: username,
                   password: password,
               });
                // loginObj.login('password', {
                //     email: username,
                //     password: password,
                // })
                // .then(function(user) {
                //     alert('we gud');
                // }, function(error) {
                //     alert(error);
                // });
            };
            self.signIn();
        },
});
