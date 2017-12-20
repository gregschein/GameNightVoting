exports.createVote = function createVote(name, game, date){
    vote = {}
    vote['VoterName'] = name;
    vote['GameName'] = game;
    vote['Date'] = date;
    return vote;
}

function createPlayer(name){
    player = {}
    player['PlayerName'] = name;
    return player;
}

function createBoardGame(title, description, player_count, playtime){
    board_game = {}
    board_game['Title'] = title;
    board_game['Description'] = description;
    board_game['PlayerCount'] = player_count;
    board_game['Playtime'] = playtime;
    return board_game
}

function newPlayOccurance(game, players, date){
    play_occurance = {}
    play_occurance['GameName'] = game;
    play_occurance['Players'] = players;
    play_occurance['Date'] = date;
    return play_occurance
}

function tester(){
    return 'it worked';
}