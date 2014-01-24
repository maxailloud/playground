Level = function(game) {

    this.game = game;
};

Level.prototype = {

    preload: function() {
        this.game.load.image('background', 'assets/background.jpg');
    },

    create: function() {
        this.game.add.sprite(0, 0, 'background');
    },

    update: function() {
    }

};