window.onload = function() {
    var game = new Phaser.Game(707, 800, Phaser.CANVAS, 'canvas-container');

    game.state.add('Boot',      PlanetCute.Boot);
    game.state.add('Preloader', PlanetCute.Preloader);
    game.state.add('Game',      PlanetCute.Game);

    game.state.start('Boot');
};