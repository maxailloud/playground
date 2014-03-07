Multiplayer.Level = function(game) {

    this.game        = game;
    this.socket      = null;
    this.userSprites = null;
    this.users       = [];
    this.userIndex   = null;
    this.userId      = null;
};

Multiplayer.Level.prototype = {
    create: function() {
        this.game.stage.backgroundColor = "#79A8FF";

        this.game.input.onDown.add(this.displayMousePosition, this);

        this.userSprites = this.game.add.group();

        var $this = this;

        if ('undefined' !== typeof io) {
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

            this.socket.on('user:connected', function (data) {
                console.log('user:connected');
                $this.userConnected(data);
            });

            this.socket.on('user:new', function (data) {
                console.log('user:new');
                $this.userNew(data);
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

            var user = this.userSprites.getAt(this.userIndex);
            user.x = pointer.positionDown.x;
            user.y = pointer.positionDown.y;

            this.emit('user:move', { id: this.userId, x: pointer.positionDown.x, y: pointer.positionDown.y });
        }
    },

    userConnected: function(data) {
        var currentUser       = this.userSprites.create(data.x, data.y, 'user');
        currentUser.name      = data.id;
        this.userIndex        = this.userSprites.getIndex(currentUser);
        this.userId           = data.id;
        this.users[data.id]   = {id: data.id, index: this.userIndex, x: data.x, y: data.y};

        var $this = this;
        var user;

        console.log(data);
        console.log(data.users);
        data.users.forEach(function(user) {
            if ('undefined' === typeof $this.users[user.id]) {
                var newUser  = $this.userSprites.create(user.x, user.y, 'user');
                newUser.name = user.id;
                $this.users[user.id] = {id: user.id, index: $this.userSprites.getIndex(newUser), x: user.x, y: user.y};
            }
        });
    },

    userNew: function(data) {
        var newUser  = this.userSprites.create(data.x, data.y, 'user');
        newUser.name = data.id;
        this.users[data.id] = {id: data.id, index: this.userSprites.getIndex(newUser), x: data.x, y: data.y};
    },

    updateUser: function(data) {
        var updatedUser = this.users[data.id];
        updatedUser.x = data.x;
        updatedUser.y = data.y;

        var updatedUserSprite = this.userSprites.getAt(updatedUser.index);
        updatedUserSprite.x = data.x;
        updatedUserSprite.y = data.y;
    }
};