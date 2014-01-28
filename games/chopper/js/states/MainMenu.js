Chopper.MainMenu = function(game) {

    this.music = null;
    this.playButton = null;

};

Chopper.MainMenu.prototype = {

    create: function() {
        this.playButton = this.add.button(this.world.width - (this.world.width / 2) - 80, 50, 'playButton', this.startGame, this, 2, 1, 0);
    },

    update: function() {
    },

    startGame: function(pointer) {
        this.game.state.start('Game');
    }

};
