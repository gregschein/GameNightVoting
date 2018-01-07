let gameList = [
    'Agricola',
    'Spartacus',
    'Keyflower',
    'Five Tribes',
];

function devStuff(command) {
    if (command == 'test') {
        let addition = '<img src=http://i0.kym-cdn.com/entries/icons/mobile/000/001/030/DButt.jpg>';
        $('body').append(addition);
    }
    if (command == 'clear') {
        localStorage.clear();
        return;
    }
    if (command == 'change') {
        $('#voted').html('huh');
    }
};
