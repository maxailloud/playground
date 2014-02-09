PlanetCute.Level = function(game) {

    this.game = game;
    this.background;
};

PlanetCute.Level.prototype = {
    create: function() {
        var gradientBackground = this.game.add.bitmapData(this.game.width, this.game.height)
        gradientBackground
            .beginLinearGradientFill(["#79A8FF","#FFF"], [0, 1], 0, 0, 0, this.game.height)
            .fillRect(0, 0, this.game.width, this.game.height);

        var background = this.game.add.sprite(0, 0, gradientBackground);
    },

    update: function() {
    },

    render: function() {
    }
};