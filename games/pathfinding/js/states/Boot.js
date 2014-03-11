Pathfinding = {};

Pathfinding.Boot = function(game) {
};

Pathfinding.Boot.prototype = {

    preload: function() {
        this.load.image('preloaderBackground', 'assets/interface/preloader_background.gif');
        this.load.image('preloaderBar', 'assets/interface/preloader_bar.png');
    },

    create: function() {
        this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if(this.game.device.desktop)
        {
            //If you have any desktop specific settings, they can go in here
            this.stage.scale.pageAlignHorizontally = true;
        }
        else
        {
            //Same goes for mobile settings.
            //In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
            this.stage.scale.minWidth = 480;
            this.stage.scale.minHeight = 260;
            this.stage.scale.maxWidth = 1024;
            this.stage.scale.maxHeight = 768;
            this.stage.scale.forceLandscape = true;
            this.stage.scale.pageAlignHorizontally = true;
            this.stage.scale.setScreenSize(true);
        }

        //By this point the preloader assets have loaded to the cache, we've set the game settings
        //So now let's start the real preloader going
        this.game.state.start('Preloader');
    }
};
