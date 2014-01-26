var game = new Phaser.Game(720, 384, Phaser.CANVAS, 'canvas-container', { preload: preload, create: create, update: update, render: render });

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

function render()
{
    level.render();
}