window.onload = function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas-container');

    game.state.add('Boot',      Illuminated.Boot);
    game.state.add('Preloader', Illuminated.Preloader);
    game.state.add('MainMenu',  Illuminated.MainMenu);
    game.state.add('Game',      Illuminated.Game);

    game.state.start('Boot');
};