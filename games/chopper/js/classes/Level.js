Level = function(game) {

    this.game    = game;
    this.map     = null;
    this.tileset = null;
    this.layer   = null;
};

Level.prototype = {
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