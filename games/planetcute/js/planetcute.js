window.onload = function() {
    var game = new Phaser.Game(1280, 1024, Phaser.AUTO, 'canvas-container');

    game.state.add('Boot',      PlanetCute.Boot);
    game.state.add('Preloader', PlanetCute.Preloader);
    game.state.add('MainMenu',  PlanetCute.MainMenu);
    game.state.add('Game',      PlanetCute.Game);

    game.state.start('Boot');
};