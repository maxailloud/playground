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

        var wood_Block = this.game.add.sprite(101, 171, 'world');
        wood_Block.frameName = 'wood_block';

        var wood_Block = this.game.add.sprite(101, 171, 'object');
        wood_Block.frameName = 'character_boy';
    },

    update: function() {
    },

    render: function() {
    }
};