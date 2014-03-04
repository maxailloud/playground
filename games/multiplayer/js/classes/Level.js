Multiplayer.Level = function(game) {

    this.game      = game;
    this.socket    = null;
    this.users     = null;
    this.userIndex = null;
    this.userId    = null;
};

Multiplayer.Level.prototype = {
    create: function() {
        this.game.stage.backgroundColor = "#79A8FF";

        this.game.input.onDown.add(this.displayMousePosition, this);

        this.users     = this.game.add.group();

        var $this = this;

        if (typeof io !== 'undefined') {
            this.socket = io.connect('http://localhost:8080');

            this.socket.on('connecting', function() {
                console.log('connecting');
            });
            this.socket.on('connect', function(data) {
                console.log('connected');
                $this.socket.emit('user:connected', {id: this.socket.sessionid });
            });
            this.socket.on('disconnect', function() {
                console.log('disconnect');
            });
            this.socket.on('reconnecting', function() {
                console.log('reconnecting');
            });
            this.socket.on('reconnect', function() {
                console.log('reconnect');
            });
            this.socket.on('reconnecting', function() {
                console.log('reconnecting');
            });

            this.socket.on('error', function(reason) {
                console.error('Unable to connect server', reason);
            });

            this.socket.on('user:new', function (data) {
                console.log('user:new');

                $this.addUser(data);
            });

            this.socket.on('user:move', function (data) {
                console.log('user:move');

                $this.updateUser(data);
            });
        }
    },

    update: function() {
    },

    render: function() {
    },

    emit: function(event, data) {
        if (null != this.socket) {
            this.socket.emit(event, data);
        }
    },

    displayMousePosition: function(pointer, event) {
        var newPosition = pointer.positionDown;

        if (0 <= newPosition.x && this.game.world.width >= newPosition.x && 0 <= newPosition.y && this.game.world.height >= newPosition.y) {

            var user = this.users.getAt(this.userIndex);
            user.x = pointer.positionDown.x;
            user.y = pointer.positionDown.y;

            this.emit('user:move', { id: this.userId, x: pointer.positionDown.x, y: pointer.positionDown.y });
        }
    },

    addUser: function(data) {
        var user       = this.users.create(data.x, data.y, 'user');
        this.userIndex = this.users.getIndex(user);
        this.userId    = this.socket.sessionid;
    },

    updateUser: function(data) {
        console.log(data);
        var user = this.users.getAt(data.index);
        user.x = data.x;
        user.y = data.y;
    }
};