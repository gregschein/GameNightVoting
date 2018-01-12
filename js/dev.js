let gameList = [
    'Agricola',
    'Spartacus',
    'Keyflower',
    'Five Tribes',
];

function devStuff(command) {
    if (command == 'test') {
        boardGameDetails('test');
    }
    if (command == 'clear') {
        localStorage.clear();
        return;
    }
    if (command == 'change') {
        $('#voted').html('huh');
    }
    if (command == 'set') {
        let gamesDeets = {
            'Agricola': {
                'BoardGameTitle': 'Agricola',
                'BoardGamePlayerCount': '2-5',
                'BoardGamePlayTime': '90-120 minutes',
                'BoardGameDescription': 'Try to not starve',
            },
        };
        console.log(gamesDeets);
        // boardGameDetails('Agricola');
        // $('#BoardGamePlayerCount').val(
        //     gamesDeets.Agricola.BoardGamePlayerCount);
        // $('#BoardGamePlayTime').val(
        //     gamesDeets.Agricola.BoardGamePlayTime);
        // $('#BoardGameDescription').val(
        //     gamesDeets.Agricola.BoardGameDescription);
    };
};
