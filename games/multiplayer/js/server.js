var io = require('socket.io').listen(8080);

var users  = [];

io.set('log level', 1);

io.sockets.on('connection', function (socket) {

    socket.on('user:connected', function(data) {
        console.log('user:connected');
        console.log(data);
        console.log('');

        if ('undefined' == typeof users[data.id]) {
            console.log("Create new user");
            users.push({id: data.id, x: 12, y: 12});
            socket.broadcast.emit('user:new', {id: data.id, x: 12, y: 12});
        }
        socket.emit('user:connected', {id: data.id, x: 12, y: 12, users: users});
    });
    socket.on('user:move', function (data) {
        console.log('user:move');
        console.log(data);
        console.log('');

        users[data] = {x: data.x, y: data.y};
        socket.broadcast.emit('user:move', data);
    });

});