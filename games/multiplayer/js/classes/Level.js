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
        var newPosition = pointer.positionDown;

        if (0 <= newPosition.x && this.game.world.width >= newPosition.x && 0 <= newPosition.y && this.game.world.height >= newPosition.y) {

            this.circle.x = pointer.positionDown.x;
            this.circle.y = pointer.positionDown.y;

            this.game.socket.emit('click', { x: this.circle.x, y: this.circle.y });
        }
    }
};