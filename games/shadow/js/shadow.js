window.onload = function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas-container');

    game.state.add('Boot',      Shadow.Boot);
    game.state.add('Preloader', Shadow.Preloader);
    game.state.add('MainMenu',  Shadow.MainMenu);
    game.state.add('Game',      Shadow.Game);

    game.state.start('Boot');
};