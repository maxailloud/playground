Multiplayer.Preloader = function(game) {
    this.background = null;
    this.loadingBar = null;
};

Multiplayer.Preloader.prototype = {

    preload: function() {
        this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.loadingBar = this.add.sprite(this.world.width - (this.world.width / 2) - 150, 50, 'preloaderBar');

        this.load.setPreloadSprite(this.loadingBar);

        this.game.load.image('user', 'assets/sprites/user.png');
    },

    create: function() {
        var tween = this.add.tween(this.loadingBar)
            .to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.startGame, this);
    },

    startGame: function() {
        this.game.state.start('Game');
    }

};
