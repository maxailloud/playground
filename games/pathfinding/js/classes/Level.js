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
    this.path = {};
};

Pathfinding.Level.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.map = this.game.add.tilemap('desert');
        this.map.addTilesetImage('Desert', 'tiles');
        this.map.setCollisionBetween(1, 29);
        this.map.setCollisionBetween(31, 45);
        this.map.setCollisionBetween(47, 48);

        this.layer = this.map.createLayer('Ground');
        this.layer.debug = true;
        this.layer.resizeWorld();

        var walkables = [30];

        this.pathfinder = this.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(this.map.layers[0].data, walkables);

        this.sprite = this.game.add.sprite(250, 250, 'car');
        this.sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;

        this.game.camera.follow(this.sprite);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.marker = this.game.add.graphics();
        this.marker.lineStyle(2, 0x000000, 1);
        this.marker.drawRect(0, 0, 32, 32);
    },

    update: function() {
        this.game.physics.arcade.collide(this.sprite, this.layer);

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
            this.sprite.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.sprite.angle, 300));
        }

        var newPosition = this.game.input.activePointer;

        if (0 <= newPosition.worldX && this.game.world.width >= newPosition.worldX && 0 <= newPosition.worldY && this.game.world.height >= newPosition.worldY) {
            this.marker.x = this.layer.getTileX(newPosition.worldX) * 32;
            this.marker.y = this.layer.getTileY(newPosition.worldY) * 32;

            if (this.game.input.mousePointer.isDown)
            {
                this.blocked = true;
                this.findPathTo(this.layer.getTileX(this.marker.x), this.layer.getTileY(this.marker.y));
            }
        }
    },

    render: function() {
    },

    findPathTo: function(tileX, tileY) {
        var $this = this;
        for(var index in this.path) {
            this.map.putTile(30, this.path[index].x, this.path[index].y);
        }

        this.pathfinder.setCallbackFunction(function(path) {
            path = path || [];
            for(var i = 0, ilen = path.length; i < ilen; i++) {
                $this.path[i] = path[i];
                $this.map.putTile(46, path[i].x, path[i].y);
            }
            $this.blocked = false;
        });

        this.pathfinder.preparePathCalculation([this.layer.getTileX(this.sprite.x), this.layer.getTileY(this.sprite.y)], [tileX,tileY]);
        this.pathfinder.calculatePath();
    }
};