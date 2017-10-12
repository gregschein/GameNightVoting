var firstChoices = [
    'Agricola',
    'Spartacus',
    'Keyflower',
    "Five Tribes",
    'Spartacus',
    'Spartacus',
    'Keyflower',
    'Agricola',
];

var secondChoices = [
    'Agricola',
    'Spartacus',
    'Keyflower',
    "Five Tribes",
    'Spartacus',
    'Lords of Waterdeep',
    'Keyflower',
    'Agricola',
];
var weightedVotes = {}
function gameChoices() {
    for (i=0; i<firstChoices.length; i++){
        if (firstChoices[i] in weightedVotes){
            weightedVotes[firstChoices[i]]+=3
        }
        else {
            weightedVotes[firstChoices[i]] = 3;
        }
    }
    for (i=0; i<secondChoices.length; i++){
        if (secondChoices[i] in weightedVotes){
            weightedVotes[secondChoices[i]]++
        }
        else {
            weightedVotes[secondChoices[i]] = 1;
        }
    }
    sortedVotes = sortVotes(weightedVotes);
    console.log('First ' + sortedVotes[0][0]);
    console.log('Second ' + sortedVotes[1][0]);
}

function sortVotes(votes) {
    var sortable = [];
    for (var game in votes) {
        sortable.push([game, votes[game]]);
    }
    sortable.sort(function(a, b) { return b[1] - a[1]})
    return sortable;
    }
gameChoices();