var game = new Phaser.Game(720, 384, Phaser.AUTO, 'canvas-container', { preload: preload, create: create, update: update });

var player = null;
var level = null;
var hud = null;

function preload()
{
    level = new Level(game);
    level.preload();
}

function create()
{
    level.create();
}

function update()
{
    level.update();
}