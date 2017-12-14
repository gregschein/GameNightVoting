class VotePool {

    constructor(date){
        this.resolved = false;
        this.date = date;
        this.votes = [];
    }
    castVote(Vote){
        if (this.resolved == true){
            //say vote pool closed
        }
        else {
            this.votes.push(Vote);
        }
    }

    resolveVotes(){
        this.resolved = true;
        var games = [];
        for (i=0; i<this.votes.length; i++) {
            console.log(this.votes[i]['Game'])
            games[this.votes[i]['Game']] = (games[this.votes[i]['Game']] || 0) + 1;
        }
        console.log(games);
        //resolve votes in some way and return results
    }


}

var test = new VotePool('today');

var games1 = [
    'Agricola',
    'Spartacus',
    'Keyflower',
    "Five Tribes",
    'Agricola',
    
];

for (i=0; i<games1.length; i++){
    test.castVote(createVote('Greg', games1[i], 'today'));
}
console.log(test.votes);
test.resolveVotes();

