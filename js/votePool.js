let dataStructures = require('./dataStructures.js');
/** VotePool class handles all votes and decides game for a given game night
 */
class VotePool {
    /** Initializes member variables for future use.
     * @param {integer} date - Date of game night in yyyymmdd format.
     */
    constructor(date) {
        this.resolved = false;
        this.date = date;
        this.votes = [];
        this.gameList = {};
        this.currentWinner = 0;
    };
    /** Casts a vote for a specific game, and stores for resolution.
     * @param {object} Vote - Uses Vote object created by createVote
     */
    castVote(Vote) {
        this.votes.push(Vote);
    };
    /** Resolves VotePool
     * @return {string} - Winning game name.
     */
    resolveVotes() {
        let tallied = this.tallyVotes();
        return this.findWinner(tallied);
    }
    /** Determines winning game based on cast votes in this.votes.
     * @return {object} - List of games with their vote counts.
     */
    tallyVotes() {
        this.resolved = true;
        let gameList = {};
        for (let i=0; i<this.votes.length; i++) {
            const vote = this.votes[i];
            if (Object.keys(gameList).indexOf(vote['GameName']) > -1) {
                gameList[vote['GameName']]++;
            } else {
                gameList[vote['GameName']] = 1;
            };
        };
        return gameList;
    }
    /** Returns the game name with most votes.
     * @param {object} talliedVotes - List of games and their vote counts.
     * @return {string} - Name of game with most votes.
     */
    findWinner(talliedVotes) {
        let currentWinner = '';
        for (let game in talliedVotes) {
            if (currentWinner === '') {
                currentWinner = game;
            } else {
                if (talliedVotes[game] > talliedVotes[currentWinner]) {
                    currentWinner = game;
                  }
            }
        };
        return currentWinner;
    };
};

module.exports = VotePool;
