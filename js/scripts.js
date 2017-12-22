'use strict';

let games = [
    'Spartacus',
    'Keyflower',
    'Agricola',
    'Five Tribes',
];
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
/** Binds Submit button*/
function bindSubmit() {
    $('button[type=button]').click(function() {
        submitForm();
    });
}
/** Prevents multiple votes for same rank.
 * @param {element} element - stuff.
 */
function verticalExclusive(element) {
    let col = element.data('col');
    $('input[data-col=' + col + ']').prop('checked', false);
    element.prop('checked', true);
}
/** Creates table rows to allow voting on games.
 * @param {list} games - List of Games that can be voted on.
 */
function createRows(games) {
    for (let i=0; i<games.length; i++) {
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
}
/** Submits choices for first and second.
 */
function submitForm() {
    let firstChoice = $('input[data-col=1]:checked').attr('name');
    let secondChoice = $('input[data-col=2]:checked').attr('name');
    console.log(firstChoice + ' ' + secondChoice);
}

