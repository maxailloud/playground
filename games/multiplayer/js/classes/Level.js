Multiplayer.Level = function(game) {

    this.game        = game;
    this.socket      = null;
    this.userSprites = null;
    this.users       = [];
    this.userIndex   = null;
    this.userId      = null;
    this.velocity    = 200;
    this.cursors;
    this.bullet;
    this.bulletVelocity = 400;
    this.bullets;
    this.fireRate = 300;
    this.fireTime = 0;
};

Multiplayer.Level.prototype = {
    create: function() {
        this.game.stage.backgroundColor = "#79A8FF";

        this.game.input.onDown.add(this.displayMousePosition, this);

        this.userSprites = this.game.add.group();

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.bullets = this.game.add.group();
        this.bullets.createMultiple(10, 'bullet');
        this.bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this);

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
        if (null != this.userIndex) {
            var user = this.userSprites.getAt(this.userIndex);

            user.body.velocity.x = 0;
            user.body.velocity.y = 0;

            if(this.cursors.left.isDown)
            {
                user.body.velocity.x = -this.velocity;
            }
            else if(this.cursors.right.isDown)
            {
                user.body.velocity.x = this.velocity;
            }

            if(this.cursors.up.isDown)
            {
                user.body.velocity.y = -this.velocity;
            }
            else if(this.cursors.down.isDown)
            {
                user.body.velocity.y = this.velocity;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                this.fire();
            }
        }
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

        var user;

        var receivedUsers = data.users;
        for (var userId in receivedUsers) {
            var user = receivedUsers[userId];
            if ('undefined' === typeof this.users[userId]) {
                var newUser  = this.userSprites.create(user.x, user.y, 'user');
                newUser.name = userId;
                this.users[userId] = {id: userId, index: this.userSprites.getIndex(newUser), x: user.x, y: user.y};
            }
        }
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
    },

    fire: function() {
        if (this.game.time.now > this.fireTime)
        {
            var user = this.userSprites.getAt(this.userIndex);
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet)
            {
                this.bullet.reset(user.x + 25, user.y + 25);
                this.bullet.body.velocity.x = +this.bulletVelocity;
                this.bullet.rotation = 0.6;
                this.bullet.scale.setTo(0.5, 0.5);
                this.fireTime = this.game.time.now + this.fireRate;
            }
        }
    },

    resetBullet: function(bullet) {
        bullet.kill();
    }
};