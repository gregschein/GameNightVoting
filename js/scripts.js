let games = [
    'Agricola',
    'Spartacus',
    'Keyflower',
    'Five Tribes',
];
sessionStorage.setItem('games', games);
$(document).ready(function() {
    createRows(games);
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
        submitNewGame();
    });
    $('button[id="Vote"]').click(function() {
        submitVote();
    });
}
/** Prevents multiple votes for same rank.
 * @param {element} element - Radio Button.
 */
function verticalExclusive(element) {
    let col = element.data('col');
    $('input[data-col=' + col + ']').prop('checked', false);
    element.prop('checked', true);
}
/**
 * Function creates table of games to vote on.
 * @param {list} games - List of game names.
 */
function createRows(games) {
    for (i=0; i<games.length; i++) {
        let template = `
            <tr>
                <td>`+ games[i] + `</td> 
                <td><input type="radio" name=`
                 + games[i].replace(/ /g, '') + ` data-col="1"/></td>
                <td><input type="radio" name=`
                 + games[i].replace(/ /g, '') + ` data-col="2"/></td>
            </tr>`;
        $('#gametable').append(template);
    }
    let playerSubmit = '<tr><td><input type ="text" name="playerSubmitted"';
}
/** Function adds new game to list of choices.
 */
function submitNewGame() {
    let text = $('input[id="New Game"]');
    let template = `
    <tr>
        <td>`+ text.val() + `</td> 
        <td><input type="radio" name=`
         + text.val().replace(/ /g, '') + ` data-col="1"/></td>
        <td><input type="radio" name=`
         + text.val().replace(/ /g, '') + ` data-col="2"/></td>
    </tr>`;
    $('#gametable').append(template);
    sessionStorage.setItem('games', games);
    console.log(games);
}
/** Function submits votes for first and second choice.
 */
function submitVote() {
    let firstChoice = $('input[data-col=1]:checked').attr('name');
    let secondChoice = $('input[data-col=2]:checked').attr('name');
    console.log(firstChoice + ' ' + secondChoice);
}
