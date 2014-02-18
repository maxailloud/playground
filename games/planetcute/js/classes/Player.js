PlanetCute.Player = function(game) {

    this.game     = game;
    this.sprite;
    this.velocity = 500;
    this.cursors;
};

PlanetCute.Player.prototype = {
    create: function() {
        this.sprite = this.game.add.sprite(350, 350, 'object');
        this.sprite.frameName = "character_boy";

        this.sprite.body.collideWorldBounds = true;

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        if(this.cursors.left.isDown)
        {
            this.sprite.body.velocity.x = -this.velocity;
        }
        else if(this.cursors.right.isDown)
        {
            this.sprite.body.velocity.x = this.velocity;
        }

        if(this.cursors.up.isDown)
        {
            this.sprite.body.velocity.y = -this.velocity;
        }
        else if(this.cursors.down.isDown)
        {
            this.sprite.body.velocity.y = this.velocity;
        }
    },

    render: function() {
        this.game.debug.renderPhysicsBody(this.sprite.body, 'rgb(238,59,59)', null);
    }
};