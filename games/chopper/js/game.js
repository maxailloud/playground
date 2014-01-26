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
}

function create()
{
    level.create();
    player.create();

    button = game.add.button(game.world.centerX - 95, 400, 'button', muteSound, this, 2, 1, 0);
}

function update()
{
    level.update();
    player.update();
}

function render()
{
    game.debug.renderText("x : " + game.input.mousePointer.x, 32, 410);
    game.debug.renderText("y : " + game.input.mousePointer.y, 32, 430);
    game.debug.renderText("Sound " + !game.sound._muted, 150, 410);
}

function muteSound () {
    if (game.sound._muted) {
        game.sound.mute = false;
    }
    else {
        game.sound.mute = true;
    }
}