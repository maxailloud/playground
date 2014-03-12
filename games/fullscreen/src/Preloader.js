BasicGame.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

BasicGame.Preloader.prototype = {

    preload: function () {
        this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('titlepage', 'assets/interface/title.gif');
    },

    create: function () {
        //Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;
    },

    update: function () {
        this.ready = true;
        this.game.state.start('MainMenu');
    }

};
