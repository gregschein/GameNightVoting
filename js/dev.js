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
};
