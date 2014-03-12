BasicGame.MainMenu = function (game) {
    this.music = null;
    this.playButton = null;
};

BasicGame.MainMenu.prototype = {

    create: function () {
        this.add.sprite(0, 0, 'titlepage');
    },

    update: function () {
    },

    startGame: function (pointer) {
        this.game.state.start('Game');
    }

};
