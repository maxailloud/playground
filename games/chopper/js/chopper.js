window.onload = function() {
    var game = new Phaser.Game(2160, 500, Phaser.CANVAS, 'canvas-container');
//    var game = new Phaser.Game(2160, 384, Phaser.AUTO, 'canvas-container');

    game.state.add('Boot',      Chopper.Boot);
    game.state.add('Preloader', Chopper.Preloader);
    game.state.add('MainMenu',  Chopper.MainMenu);
    game.state.add('Game',      Chopper.Game);

    game.state.start('Boot');
};