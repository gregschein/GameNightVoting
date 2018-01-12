let app = angular.module('GameNightVoting', []);

app.controller('MainController', ['$scope', function($scope) {
    $scope.butts = function(thing) {
        console.log(thing);
        this.NewGameName = '';
    };
    return;
    $scope.NewGame = function(gameInput) {
        if (gameInput == '') {
            alert('Please submit a Game Name');
            return;
        };
        if ($('tr[id="'+gameInput+'"]').length) {
            alert('Game already exists');
            return;
        };
        $('input[id="New Game"]').val('');
        PageViews.renderNewGame(gameInput);
        boardGameDetails(gameInput);
        PageViews.games.push(gameInput);
        localStorage.setItem('games', PageViews.games);
    };
}]);

app.factory('testfact', function testingfactFactory() {
    return 'this is the output of testingfact';
});
