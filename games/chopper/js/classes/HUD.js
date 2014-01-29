HUD = function(game) {

    this.game        = game;
    this.soundToggle = null;
    this.soundMuted  = false;
};

HUD.prototype = {
    preload: function() {
        this.game.load.spritesheet('button', 'assets/interface/sound.png', 16, 16);
    },

    create: function() {
        this.soundToggle = this.game.add.button(this.game.world.width - 30, 15, 'button', this.toggleSound, this);
        this.soundToggle.frame = 1;

        this.game.onPause.add(this.onGamePause, this);
        this.game.onResume.add(this.onGameResume, this);
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
            this.soundMuted        = false;
            this.soundToggle.frame = 1;
        }
        else {
            this.game.sound.mute   = true;
            this.soundMuted        = true;
            this.soundToggle.frame = 0;
        }
    },

    onGamePause: function() {
        this.game.sound.mute = true;
    },

    onGameResume: function() {
        if (!this.soundMuted) {
            this.game.sound.mute = false;
        }
    }
};