Level = function(game) {

    this.game    = game;
    this.map     = null;
    this.tileset = null;
    this.layer   = null;
};

Level.prototype = {
    preload: function() {
        console.log("Level : preload");
        this.game.load.image('background', 'assets/sprites/background.jpg');
        this.game.load.tilemap('ground', 'assets/maps/ground.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tileset('tiles', 'assets/tiles/tileset.gif', 48, 48);
    },

    create: function() {
        console.log("Level : create");
        this.game.add.sprite(0, 0, 'background');
        this.map     = this.game.add.tilemap('ground');
        this.tileset = this.game.add.tileset('tiles');

        this.layer = this.game.add.tilemapLayer(0, 0, 800, 400, this.tileset, this.map, 0);
        this.layer.resizeWorld();
        console.log("Level : end create");
    },

    update: function() {
    },

    render: function() {
        this.game.debug.renderText('Click to pouet', 32, 32);
    }
};