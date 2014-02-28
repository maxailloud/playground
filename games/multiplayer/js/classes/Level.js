Multiplayer.Level = function(game) {

    this.game = game;
    this.circle = null;
};

Multiplayer.Level.prototype = {
    create: function() {
        this.game.stage.backgroundColor = "#79A8FF";

        this.game.input.onDown.add(this.displayMousePosition, this);

        this.circle = new Phaser.Circle(this.game.world.centerX, this.game.world.centerY, 32);

        var $this = this;

        this.game.socket.on('display', function (data) {
            $this.displayCircle(data);
        });
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

            this.game.socket.emit('click', { x: pointer.positionDown.x, y: pointer.positionDown.y });
        }
    },

    displayCircle: function(data) {
        this.circle.x = data.x;
        this.circle.y = data.y;
    }
};