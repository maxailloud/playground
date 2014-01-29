Level = function(game) {

    this.game    = game;
    this.map     = null;
    this.tileset = null;
    this.layer   = null;
};

Level.prototype = {
    preload: function() {
        this.game.load.image('background', 'assets/sprites/background.jpg');
        this.game.load.tilemap('ground', 'assets/maps/ground.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tileset('tiles', 'assets/tiles/tileset.gif', 48, 48);
    },

    create: function() {
        this.game.add.sprite(0, 0, 'background');
        this.map     = this.game.add.tilemap('ground');
        this.tileset = this.game.add.tileset('tiles');
        this.tileset.setCollisionRange(0, 9, true, true, true, true);

        this.layer = this.game.add.tilemapLayer(0, 0, 720, 384, this.tileset, this.map, 0);
    },

    update: function() {
    },

    render: function() {
    }
};