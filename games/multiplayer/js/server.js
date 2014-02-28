var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {

    socket.on('click', function (data) {
        console.log(data);
        socket.broadcast.emit('display', data);
    });

});