window.onload = function() {
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'canvas-container');

    game.state.add('Boot',      Multiplayer.Boot);
    game.state.add('Preloader', Multiplayer.Preloader);
    game.state.add('MainMenu',  Multiplayer.MainMenu);
    game.state.add('Game',      Multiplayer.Game);

    game.state.start('Boot');
};