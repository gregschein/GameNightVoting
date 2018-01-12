if (localStorage.games) {
    gameList = localStorage.games.split(',');
}
let PageViews = new VoteViews(gameList);
let PagePool = new VotePool('today');
$(document).ready(function() {
    PageViews.renderTable();
    $('div[class="initiallyHidden"]').toggle();
    bindForm();
    bindSubmit();
});
/** Binds verticalExlusive to radio buttons. */
function bindForm() {
    $('input[type=radio]').click(function() {
        verticalExclusive($(this));
    });
};
/** Binds Buttons*/
function bindSubmit() {
    $('button[id="New Game"]').click(function() {
        let gameInput = $('input[id="New Game"]').val();
        submitNewGame(gameInput);
    });
    $('button[id="PlayerName"]').click(function() {
        let playerName = $('input[id="PlayerName"]').val();
        playerLogIn(playerName);
    });
    $('button[id="Vote"]').click(function() {
        submitVote('guest');
    });
    $('button[id="Resolve"]').click(function() {
        PageViews.renderGameWinner(PagePool.resolveVotes());
    });
    $('button[id="EditBoardGame"]').click(function() {
        boardGameDetails($(this).attr('name'));
    });
    $('button[id="Dev"]').click(function() {
        let devCMD = $('input[id="Dev"]').val();
        devStuff(devCMD);
    });
}
/** Prevents multiple votes for same rank.
 * @param {element} element - Radio Button.
 */
function verticalExclusive(element) {
    let col = element.data('col');
    $('input[data-col=' + col + ']').prop('checked', false);
    element.prop('checked', true);
};
/** Function submits votes for first and second choice.
 * @param {string} playerName - Name of voting player
 */
function submitVote(playerName) {
    if (localStorage.PlayerName == undefined) {
        alert('Please Log in to vote.');
        return;
    }
    let firstChoice = $('input[data-col=1]:checked').attr('name');
    if (firstChoice == undefined) {
        alert('Please select your first choice');
        return;
    }
    let firstVote = createVote(playerName, firstChoice, 'today');
    PagePool.castVote(firstVote);
    PagePool.castVote(firstVote);
    let secondChoice = $('input[data-col=2]:checked').attr('name');
    if (secondChoice !== undefined) {
        let secondVote = createVote(
            localStorage.PlayerName, secondChoice, 'today');
        PagePool.castVote(secondVote);
    };
    PageViews.toggleVotingView();
};
function playerLogIn(playerName) {
    localStorage.setItem('PlayerName', playerName);
    PagePool.players[playerName] = 'No Vote';
    $('span[id=PlayerNameButton]').hide();
    alert('Thanks for logging in ' + playerName);
}

function boardGameDetails(gamename) {
    if ($('span[id="BoardGameDetails"]').length > 0) {
        alert('Please close other game before editing a new one');
        return;
    };
    PageViews.renderBoardGameDetails(gamename);
    $('button[id="BoardGameSubmit"]').click(function() {
        let gameDetailsName = $('input[id="BoardGameTitle"]').val();
        if (!$('tr[id="'+gameDetailsName+'"]'.length)) {
            PageViews.renderNewGame(gameDetailsName);
        };
        $('span[id="BoardGameDetails"]').remove();
    });
}
function submitNewGame(gameInput) {
    if (gameInput == '') {
        alert('Please submit a Game Name');
        return;
    };
    if ($('tr[id="'+gameInput+'"]').length) {
        alert('Game already exists');
        return;
    }
    $('input[id="New Game"]').val('');
    PageViews.renderNewGame(gameInput);
    boardGameDetails(gameInput);
    PageViews.games.push(gameInput);
    localStorage.setItem('games', PageViews.games);
};
