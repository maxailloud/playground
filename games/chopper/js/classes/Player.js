Player = function(game) {

    this.game     = game;
    this.sprite ;
    this.cursors;
    this.music;
    this.missile;
    this.missiles;
    this.fireRate = 300;
    this.fireTime = 0;
};

Player.prototype = {
    create: function() {
        this.sprite = this.game.add.sprite(32, 100, 'chopper');

        this.sprite.animations.add('flying');
        this.sprite.animations.play('flying', 45, true);

        this.sprite.body.collideWorldBounds = true;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.music = this.game.add.audio('chopper_hovering', 1, true);
        this.music.play('', 0, 0.2, true);

        this.missiles = this.game.add.group();
        this.missiles.createMultiple(10, 'missile');
        this.missiles.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetMissile, this);
    },

    update: function() {
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

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.fire();
        }
    },

    render: function() {
    },

    fire: function() {
        if (this.game.time.now > this.fireTime)
        {
            this.missile = this.missiles.getFirstExists(false);

            if (this.missile)
            {
                this.missile.reset(this.sprite.x + 25, this.sprite.y + 25);
                this.missile.body.velocity.x = +300;

                this.fireTime = this.game.time.now + this.fireRate;
            }
        }
    },

    resetMissile: function(missile) {
        missile.kill();
    }
};