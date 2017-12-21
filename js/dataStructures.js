/** Creates a new Vote object.
 * @param {string} name - Name of the Player casting the vote.
 * @param {string} game - Name of the Game.
 * @param {integer} date - Date of game night, using yyyymmdd format.
 * @return {object} - A new Vote object.
 */
function createVote(name, game, date) {
    vote = {};
    vote['VoterName'] = name;
    vote['GameName'] = game;
    vote['Date'] = date;
    return vote;
};
/** Creates a new Player object.
 * @param {string} name - Name of the player.
 * @return {object} - A new player object.
 */
function createPlayer(name) {
    player = {};
    player['PlayerName'] = name;
    return player;
};
/** Creates a new boardGame object
 * @param {string} title - Game's title.
 * @param {string} description - Game's description.
 * @param {string} playerCount - Amount of players game can support.
 * @param {string} playTime - Average time game takes to play.
 * @return {object} - A new BoardGame object.
 */
function createBoardGame(title, description, playerCount, playTime) {
    BoardGame = {};
    BoardGame['Title'] = title;
    BoardGame['Description'] = description;
    BoardGame['PlayerCount'] = playerCount;
    BoardGame['Playtime'] = playTime;
    return BoardGame;
};
/** Creates a new Play Occurance Object
 * @param {object} game - BoardGame object representing game played.
 * @param {list} players - List of Player objects representing players
 *  of the game.
 * @param {integer} date - Data played, using yyyymmdd format.
 * @return {object} - A new PlayCccurance object.
 */
function newPlayOccurance(game, players, date) {
    playOccurance = {};
    playOccurance['GameName'] = game;
    playOccurance['Players'] = players;
    playOccurance['Date'] = date;
    return playOccurance;
};

exports.createVote = createVote;
