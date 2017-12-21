var dataStructures = require('./dataStructures.js');
//console.log(dataStructures.createVote('greg', 'agricola', 'today'));
module.exports = class VotePool {

    constructor(date) {
        this.resolved = false;
        this.date = date;
        this.votes = [];
        this.game_list = {};
        this.current_winner = 0;
    }
    castVote(Vote) {
        if (this.resolved == true) {
            //say vote pool closed
        }
        else {
            this.votes.push(Vote);
        }
    }

    resolveVotes() {
        this.resolved = true;
        var game_list = {}; //this.votes.map(this._tallyVote, this);
        for (var i=0; i<this.votes.length; i++) {
            var vote = this.votes[i];
            if (Object.keys(game_list).indexOf(vote['GameName']) > -1) {
                game_list[vote['GameName']]++;
              }
              else {
                game_list[vote['GameName']] = 1;
              }
        }
        return;
        //functions up until this point (tallies votes into list of Name: number format.)
        //To do: pick a winner from tally votes.
        const something = this._findWinner().current_winner;
        //resolve votes in some way and return results
    }

    _tallyVote(vote) { 
        console.log(vote['GameName'], Object.keys(this.game_list))
        if (Object.keys(this.game_list).indexOf(vote['GameName']) > -1) {
          this.game_list[vote['GameName']]++;
          console.log(this.game_list)
        }
        else {
          this.game_list[vote['GameName']] = 1;
        }
    }

    _findWinner() {
        console.log(this.game_list);
        return Object.keys(this.game_list).reduce(function(acc, cur, i, arr) {
            if (acc.current_winner == 0) {
                acc.current_winner = acc.game_list[cur];
                return acc;
            }
            if (acc.game_list[acc.current_winner] > acc.game_list[cur]) {
                return acc;
            }
            
            acc.current_winner = acc.game_list[cur];
            if (i+1 == arr.length) {
                console.log(acc.current_winner)
            }
            return acc;
        }, this);
    }
}


