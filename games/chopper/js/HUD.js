HUD = function(game) {

    this.game    = game;
    this.soundToggle   = null;
};

HUD.prototype = {
    preload: function() {
        this.game.load.image('sound_on', 'assets/interface/sound_on.png');
        this.game.load.spritesheet('button', 'assets/interface/sound.png', 32, 16);
    },

    create: function() {
        this.soundToggle = this.game.add.button(game.world.width - 150, 15, 'button', this.muteSound, this, 2, 1, 0);
    },

    update: function() {
    },

    muteSound: function()
    {
        if (this.game.sound._muted) {
            this.game.sound.mute = false;
        }
        else {
            this.game.sound.mute = true;
            console.log(this.soundToggle);
        }
    }
};