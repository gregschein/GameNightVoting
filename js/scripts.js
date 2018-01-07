if (localStorage.games) {
    gameList = localStorage.games.split(',');
}
let PageViews = new VoteViews(gameList);
let PagePool = new VotePool('today');
$(document).ready(function() {
    PageViews.rendertable();
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
        PageViews.submitNewGame(gameInput);
    });
    $('button[id="Vote"]').click(function() {
        submitVote();
    });
    $('button[id="Resolve"]').click(function() {
        PageViews.renderGameWinner(PagePool.resolveVotes());
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
 */
function submitVote() {
    let firstChoice = $('input[data-col=1]:checked').attr('name');
    if (firstChoice == undefined) {
        alert('Please select your first choice');
        return;
    }
    let firstVote = createVote('guest', firstChoice, 'today');
    PagePool.castVote(firstVote);
    PagePool.castVote(firstVote);
    let secondChoice = $('input[data-col=2]:checked').attr('name');
    if (secondChoice !== undefined) {
        let secondVote = createVote('guest', secondChoice, 'today');
        PagePool.castVote(secondVote);
    };
    PageViews.toggleVotingView();
};
