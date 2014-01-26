Player = function(game) {

    this.game    = game;
    this.sprite  = null;
    this.cursors = null;
};

Player.prototype = {
    preload: function() {
        this.game.load.spritesheet('chopper', 'assets/sprites/chopper.png', 52, 36, 5);
    },

    create: function() {
        this.sprite = this.game.add.sprite(32, 100, 'chopper');

        this.sprite.animations.add('flying');
        this.sprite.animations.play('flying', 45, true);

        this.sprite.body.collideWorldBounds = true;

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
        this.game.physics.collide(this.sprite, level.layer);

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        if(this.cursors.left.isDown)
        {
            this.sprite.body.velocity.x = -250;
        }
        else if(this.cursors.right.isDown)
        {
            this.sprite.body.velocity.x = 250;
        }

        if(this.cursors.up.isDown)
        {
            this.sprite.body.velocity.y = -250;
        }
        else if(this.cursors.down.isDown)
        {
            this.sprite.body.velocity.y = 250;
        }
    }
};