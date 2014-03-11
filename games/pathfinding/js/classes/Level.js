Pathfinding.Level = function(game) {

    this.game = game;
    this.map;
    this.tileset;
    this.layer;
    this.pathfinder;

    this.cursors;
    this.sprite;
    this.marker;
    this.blocked = false;
};

Pathfinding.Level.prototype = {
    create: function() {
        this.map = this.game.add.tilemap('desert');
        this.map.addTilesetImage('Desert', 'tiles');
        this.layer = this.map.createLayer('Ground');
        this.layer.resizeWorld();

        var walkables = [30];

        this.pathfinder = this.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(this.map.layers[0].data, walkables);

        this.sprite = this.game.add.sprite(250, 250, 'car');
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.body.collideWorldBounds = true;

        this.game.camera.follow(this.sprite);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.marker = this.game.add.graphics();
        this.marker.lineStyle(2, 0x000000, 1);
        this.marker.drawRect(0, 0, 32, 32);
    },

    update: function() {
        this.game.physics.collide(this.sprite, this.layer);

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.sprite.body.angularVelocity = 0;

        if (this.cursors.left.isDown)
        {
            this.sprite.body.angularVelocity = -200;
        }
        else if (this.cursors.right.isDown)
        {
            this.sprite.body.angularVelocity = 200;
        }

        if (this.cursors.up.isDown)
        {
            this.sprite.body.velocity.copyFrom(this.game.physics.velocityFromAngle(this.sprite.angle, 300));
        }

        this.marker.x = this.layer.getTileX(this.game.input.activePointer.worldX) * 32;
        this.marker.y = this.layer.getTileY(this.game.input.activePointer.worldY) * 32;

        if (this.game.input.mousePointer.isDown)
        {
            this.blocked = true;
            this.findPathTo(this.layer.getTileX(this.marker.x), this.layer.getTileY(this.marker.y));
        }
    },

    render: function() {
    },

    findPathTo: function(tileX, tileY) {
        var $this = this;

        this.pathfinder.setCallbackFunction(function(path) {
            path = path || [];
            for(var i = 0, ilen = path.length; i < ilen; i++) {
                $this.map.putTile(46, path[i].x, path[i].y);
            }
            $this.blocked = false;
        });

        this.pathfinder.preparePathCalculation([this.layer.getTileX(this.sprite.x), this.layer.getTileY(this.sprite.y)], [tileX,tileY]);
        this.pathfinder.calculatePath();
    }
};