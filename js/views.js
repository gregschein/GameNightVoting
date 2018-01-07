/**
 * VoteViews class handles frontend rendering.
 */
class VoteViews {
    /**
     * Initializes list of games for future use.
     * @param {Array} games - Array of game names.
     */
    constructor(games) {
        this.games = games;
    }
    /**
     * Renders table of games that can be voted on.
     */
    rendertable() {
        for (let i=0; i<this.games.length; i++) {
            let template = this.renderGameRow(this.games[i]);
            $('#gametable').append(template);
        }
    }
    /**
     * Renders a new row for the table of votable games.
     * @param {string} gameName - Name of new game to add to table.
     * @return {string} - HTML template of new row to be appended to table.
     */
    renderGameRow(gameName) {
        return `
            <tr>
                <td>`+ gameName + `</td> 
                <td><input type="radio" name=`
                + gameName.replace(/ /g, '') + ` data-col="1"/></td>
                <td><input type="radio" name=`
                + gameName.replace(/ /g, '') + ` data-col="2"/></td>
            </tr>`;
    }
    submitNewGame(gameInput) {
        if (gameInput == '') {
            alert('Please submit a Game Name');
            return;
        };
        let template = this.renderGameRow(gameInput);
        $('#gametable').append(template);
        this.games.push(gameInput);
        localStorage.setItem('games', this.games);
    }
    toggleVotingView() {
        $('[title="voting"]').toggle();
    };
    renderGameWinner(winner) {
        $('#voted').html('Winner: ' + winner);
    }
};
