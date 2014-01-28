HUD = function(game) {

    this.game        = game;
    this.soundToggle = null;
};

HUD.prototype = {
    preload: function() {
        this.game.load.spritesheet('button', 'assets/interface/sound.png', 16, 16);
    },

    create: function() {
        this.soundToggle = this.game.add.button(this.game.world.width - 150, 15, 'button', this.toggleSound, this);
        this.soundToggle.frame = 1;
    },

    update: function() {
    },

    render: function() {
        this.game.debug.renderSpriteBody(this.soundToggle);
    },

    toggleSound: function()
    {
        if (this.game.sound._muted) {
            this.game.sound.mute   = false;
            this.soundToggle.frame = 1;
        }
        else {
            this.game.sound.mute   = true;
            this.soundToggle.frame = 0;
        }
    }
};