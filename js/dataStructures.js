function createVote(name, game, date){
    vote = {}
    vote['Name'] = name;
    vote['Game'] = game;
    vote['Date'] = date;
    //console.log(vote);
    return vote;
}

function createPlayer(name){
    player = {}
    player['Name'] = name;
    return player;
}

function createBoardGame(title, description, player_count, playtime){
    board_game = {}
    board_game['Title'] = title;
    board_game['Description'] = description;
    board_game['Player Count'] = player_count;
    board_game['Playtime'] = playtime;
    return board_game
}

function newPlayOccurance(game, players, date){
    play_occurance = {}
    play_occurance['Game'] = game;
    play_occurance['Players'] = players;
    play_occurance['Date'] = date;
    return play_occurance
}