Multiplayer.Level = function(game) {

    this.game = game;
    this.circle;
};

Multiplayer.Level.prototype = {
    create: function() {
        this.game.stage.backgroundColor = "#79A8FF";

        this.game.input.onDown.add(this.displayMousePosition, this);

        this.circle = new Phaser.Circle(this.game.world.centerX, this.game.world.centerY, 32);
    },

    update: function() {
    },

    render: function() {
        this.game.debug.renderCircle(this.circle, 'red');
    },

    displayMousePosition: function(pointer, event) {
        this.circle.x = pointer.x;
        this.circle.y = pointer.y;
    }
};