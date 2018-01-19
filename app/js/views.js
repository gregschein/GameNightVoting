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
    renderTable() {
        for (let i=0; i<this.games.length; i++) {
            this.renderNewGame(this.games[i]);
        }
    }
    /**
     * Renders a new row for the table of votable games.
     * @param {string} gameName - Name of new game to add to table.
     * @return {string} - HTML template of new row to be appended to table.
     */
    renderGameRow(gameName) {
        return `
            <tr id="` + gameName.replace(/ /g, '') + `" align="center">
                <td>
                    <button type="button" id="EditBoardGame" 
                    name=` + gameName.replace(/ /g, '') + ` >`+ gameName +
                    `</button>
                </td> 
                <td><input type="radio" name=`
                + gameName.replace(/ /g, '') + ` data-col="1"/></td>
                <td><input type="radio" name=`
                + gameName.replace(/ /g, '') + ` data-col="2"/></td>
            </tr>`;
    }
    renderNewGame(gameInput) {
        let template = this.renderGameRow(gameInput);
        $('#gametable').append(template);
    };
    toggleVotingView() {
        $('[title="voting"]').toggle();
    };
    renderGameWinner(winner) {
        $('#voted').html('Winner: ' + winner);
    };
    renderBoardGameDetails(game) {
        let template = `
        <span id="BoardGameDetails" style="white-space: pre-line">
            <h4>Board Game Details</h4>
            <label for="BoardGameTitle">Name</label>
            <input type="text" id="BoardGameTitle" value=`+game+`>
            <label for="BoardGamePlayerCount">Player Count</label>
            <input type="text" id="BoardGamePlayerCount">
            <label for="BoardGamePlayTime">Play Time</label>
            <input type="text" id="BoardGamePlayTime">
            <label for="BoardGameDescription">Description</label>
            <textarea id="BoardGameDescription" cols=25 rows=4></textarea>
            <button type="button" id="BoardGameSubmit">Submit</button>
        </span>
        `;
        $('div[id="BoardGameDetails"]').append(template);
    }
};
