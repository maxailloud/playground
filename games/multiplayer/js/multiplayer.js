window.onload = function() {
    var socket = io.connect('http://localhost:8080');

    socket.on('connecting', function() {
        console.log('connecting');
    });
    socket.on('connect', function() {
        console.log('connected');
    });
    socket.on('disconnect', function() {
        console.log('disconnect');
    });
    socket.on('reconnecting', function() {
        console.log('reconnecting');
    });
    socket.on('reconnect', function() {
        console.log('reconnect');
    });
    socket.on('reconnecting', function() {
        console.log('reconnecting');
    });

    socket.on('error', function(reason) {
        console.error('Unable to connect Socket.IO', reason);
    });

    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'canvas-container');

    game.socket = socket;

    game.state.add('Boot',      Multiplayer.Boot);
    game.state.add('Preloader', Multiplayer.Preloader);
    game.state.add('MainMenu',  Multiplayer.MainMenu);
    game.state.add('Game',      Multiplayer.Game);

    game.state.start('Boot');
};