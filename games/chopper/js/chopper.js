window.onload = function() {
    var game = new Phaser.Game(720, 450, Phaser.CANVAS, 'canvas-container');

    game.state.add('Boot',      Chopper.Boot);
    game.state.add('Preloader', Chopper.Preloader);
    game.state.add('MainMenu',  Chopper.MainMenu);
    game.state.add('Game',      Chopper.Game);

    game.state.start('Boot');
};