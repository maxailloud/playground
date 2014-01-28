window.onload = function() {
    var game = new Phaser.Game(720, 450, Phaser.CANVAS, 'canvas-container', { preload: preload, create: create, update: update , render: render });

    var player = null;
    var level = null;
    var hud = null;

    var button;

    function preload()
    {
        level = new Level(game);
        level.preload();

        player = new Player(game);
        player.preload();

        hud = new HUD(game);
        hud.preload();
    }

    function create()
    {
        level.create();
        player.create();
        hud.create();
    }

    function update()
    {
        level.update();
        player.update();
        hud.update();
    }

    function render()
    {
        game.debug.renderText("x : " + game.input.mousePointer.x, 32, 410);
        game.debug.renderText("y : " + game.input.mousePointer.y, 32, 430);
        game.debug.renderText("Sound " + !game.sound._muted, 150, 410);

        level.render();
        hud.render();
    }
};