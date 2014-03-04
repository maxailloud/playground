var io = require('socket.io').listen(8080);

var users  = {};

io.sockets.on('connection', function (socket) {

    socket.on('user:connected', function(data) {
        console.log('user:connected');

        if ('undefined' == users[data]) {
            users[data] = {x: 12, y: 12};
        }
        socket.emit('user:new', {id: data, x: 12, y: 12});
        socket.broadcast.emit('user:new', {id: data, x: 12, y: 12});
    });
    socket.on('user:move', function (data) {
        console.log('user:move');

        users[data] = {x: data.x, y: data.y};
        socket.broadcast.emit('user:move', data);
    });

});