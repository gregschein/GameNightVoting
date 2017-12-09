var games1 = [
    'Agricola',
    'Spartacus',
    'Keyflower',
    "Five Tribes",
];

class VotePool {
    constructor(games){
        this.resolved = false;
        this.gamelist = {}
        //Initializes games that can be voted on
        for(var i=0; i<games.length; i++){
            this.gamelist[games[i]] = 0;
        }
    }
    addGame(game){
        //add game to selection
        this[game] = 0;
    }
    castVote(firstChoice, secondChoice){
        if (this.resolved = true) {
            //Something says voting completed
            return 0;
        }
        //Takes in voter's first and second choice, and weights the results
        if (typeof this[firstChoice] !== 'undefined') {
            this.firstChoice +=3;
        }
        else {
            //Create appropriate response function later
        }
        if (typeof this[secondChoice] !== 'undefined') {
            this.secondChoice +=1;
        }
        else {
            //Create appropriate response function later
        }
        
    }
    resolveVotes(){
        //TBD
        console.log('do stuff?');
        this.resolved = true;
        this.weightedVotes = {};
        this.sortable = [];
        for (var game in this.gamelist) {
            this.sortable.push([game, this.gamelist[game]]);
        }
        this.sortable.sort(function(a, b) { return b[1] - a[1]});
        console.log('First ' + this.sortable[0][0]);
        console.log('Second ' + this.sortable[1][0]);
    }
}
var pool = new VotePool(games1);
pool.resolveVotes();
var playOccurance = []
