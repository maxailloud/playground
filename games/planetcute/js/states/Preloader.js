PlanetCute.Preloader = function(game) {
    this.background = null;
    this.preloadBar = null;
};

PlanetCute.Preloader.prototype = {

    preload: function() {
        this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.preloadBar = this.add.sprite(this.world.width - (this.world.width / 2) - 150, 50, 'preloaderBar');

        this.load.setPreloadSprite(this.preloadBar);

        //Level
        this.load.atlas('world', 'assets/tilemaps/world.png', 'assets/tilemaps/world.json');
        this.load.atlas('object', 'assets/tilemaps/object.png', 'assets/tilemaps/object.json');
    },

    create: function() {
        this.game.state.start('MainMenu');
    }

};
