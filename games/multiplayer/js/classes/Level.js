Multiplayer.Level = function(game) {

    this.game = game;
    this.point;
};

Multiplayer.Level.prototype = {
    create: function() {
        this.game.stage.backgroundColor = "#79A8FF";

        this.game.input.onDown.add(this.displayMousePosition, this);

        this.point = new Phaser.Point(this.game.world.centerX, this.game.world.centerY);
    },

    update: function() {
    },

    render: function() {
        this.game.debug.renderPoint(this.point, 'red');
    },

    displayMousePosition: function(pointer, event) {
        this.point.x = pointer.x;
        this.point.y = pointer.y;
    }
};