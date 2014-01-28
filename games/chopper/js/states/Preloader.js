Chopper.Preloader = function(game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

Chopper.Preloader.prototype = {

    preload: function() {
        this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.preloadBar = this.add.sprite(this.world.width - (this.world.width / 2) - 150, 50, 'preloaderBar');

        this.load.setPreloadSprite(this.preloadBar);

        //Player
        this.load.spritesheet('chopper', 'assets/sprites/chopper.png', 52, 36, 5);
        this.load.audio('chopper_hovering', ['assets/audio/chopper_hovering.mp3']);

        //MainLenu
        this.load.spritesheet('playButton', 'assets/interface/button_sprite_sheet.png', 193, 71);

        //Level
        this.load.image('background', 'assets/sprites/background.jpg');
        this.load.tilemap('ground', 'assets/maps/ground.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tileset('tiles', 'assets/tiles/tileset.gif', 48, 48);
    },

    create: function() {
        this.game.state.start('MainMenu');
    }

};
