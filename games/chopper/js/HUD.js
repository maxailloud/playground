HUD = function(game) {

    this.game    = game;
    this.soundToggle   = null;
};

HUD.prototype = {
    preload: function() {
//        this.game.load.spritesheet('button', 'assets/interface/sound.png', 32, 16);
        this.game.load.image('sound_on', 'assets/interface/sound_on.png');
        this.game.load.image('sound_off', 'assets/interface/sound_off.png');
    },

    create: function() {
//        this.soundToggle = this.game.add.button(game.world.width - 150, 15, 'button', this.muteSound, this, 2, 1, 0);

        this.soundToggle = game.add.sprite(game.world.width - 150, 15, 'sound_on');
        this.soundToggle.inputEnabled=true;
        this.soundToggle.events.onInputDown.add(this.muteSound,this);
        this.soundToggle.events.onInputOver.add(this.overSoundToggle,this);
        this.soundToggle.events.onInputOut.add(this.outSoundToggle,this);
    },

    update: function() {
    },

    overSoundToggle: function()
    {
        this.game.stage.canvas.style.cursor = "pointer";
    },

    outSoundToggle: function()
    {
        this.game.stage.canvas.style.cursor = "default";
    },

    muteSound: function()
    {
        if (this.game.sound._muted) {
            this.game.sound.mute   = false;
            this.soundToggle.loadTexture('sound_on', 0);
        }
        else {
            this.game.sound.mute   = true;
            this.soundToggle.loadTexture('sound_off', 0);
        }
    }
};