var game = new Phaser.Game(720, 450, Phaser.CANVAS, 'canvas-container', { preload: preload, create: create, update: update , render: render });

var player = null;
var level = null;
var hud = null;

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
//    game.debug.renderSpriteCollision(player, 32, 32);
}