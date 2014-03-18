window.onload = function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas-container');

    game.state.add('Boot',      Pathfinding.Boot);
    game.state.add('Preloader', Pathfinding.Preloader);
    game.state.add('MainMenu',  Pathfinding.MainMenu);
    game.state.add('Game',      Pathfinding.Game);

    game.state.start('Boot');
};