var games = [
    'Agricola',
    'Spartacus',
    'Keyflower',
    "Five Tribes",
];

class BoardGame {
    constructor(name, description, playerCount, playtime){
        this.name = name;
        this.description = description;
        this.playerCount = playerCount;
        this.playtime = playtime;
    }
}
class Player {
    constructor(name){
        this.name = name;
    }
}

$(document).ready(function(){
    createRows(games);
    bindForm();
    bindSubmit();    
});

function bindForm() {
    $('input[type=radio]').click(function() {
        verticalExclusive($(this));
    });
}

function bindSubmit() {
    $('button[type=button]').click(function() {
        submitForm();
    });
}

function verticalExclusive(element) {
    var col = element.data('col');
    $('input[data-col=' + col + ']').prop('checked', false);
    element.prop('checked', true);
}

function createRows(games) {
    for (i=0; i<games.length; i++) {
        var template = `
            <tr>
                <td>`+ games[i] + `</td> 
                <td><input type="radio" name=` + games[i].replace(/ /g,'') + ` data-col="1"/></td>
                <td><input type="radio" name=` + games[i].replace(/ /g,'') + ` data-col="2"/></td>
            </tr>`;
        $('#gametable').append(template);
    }
}

function submitForm() {
    var firstChoice = $('input[data-col=1]:checked').attr('name');
    var secondChoice = $('input[data-col=2]:checked').attr('name');
    console.log(firstChoice + ' ' + secondChoice);
}

