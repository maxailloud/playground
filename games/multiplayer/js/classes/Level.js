Multiplayer.Level = function(game) {

    this.game     = game;
    this.users    = null;
    this.userIndex = null;
};

Multiplayer.Level.prototype = {
    create: function() {
        this.game.stage.backgroundColor = "#79A8FF";

        this.game.input.onDown.add(this.displayMousePosition, this);

        this.users     = this.game.add.group();
        var user       = this.users.create(this.game.world.centerX, this.game.world.centerY, 'user');
        this.userIndex = this.users.getIndex(user);

        var $this = this;

        this.game.socket.on('display', function (data) {
            $this.updateUser(data);
        });

        this.game.socket.on('newUser', function (data) {
            $this.addUser(data);
        });
    },

    update: function() {
    },

    render: function() {
    },

    displayMousePosition: function(pointer, event) {
        var newPosition = pointer.positionDown;

        if (0 <= newPosition.x && this.game.world.width >= newPosition.x && 0 <= newPosition.y && this.game.world.height >= newPosition.y) {

            var user = this.users.getAt(this.userIndex);
            user.x = pointer.positionDown.x;
            user.y = pointer.positionDown.y;

            this.game.socket.emit('click', { index: this.userIndex, x: pointer.positionDown.x, y: pointer.positionDown.y });
        }
    },

    addUser: function(data) {
        var user = this.game.add.sprite(data.x, data.y, 'user');
        var user = this.users.addAt(user, data.index);
    },

    updateUser: function(data) {
        var user = this.users.getAt(data.index);
        user.x = data.x;
        user.y = data.y;
    }
};