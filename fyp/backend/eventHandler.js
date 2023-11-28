module.exports = function (io) {
    io.on('connection', function (socket) {
        const count = io.engine.clientsCount;
        console.log(socket.id + ' connected c:' + count);

        socket.on('disconnect', () => {
            console.log(socket.id + ' disconnected');
        });
    });

    io.engine.on('connection_error', (err) => {
        console.log(err.req); // the request object
        console.log(err.code); // the error code, for example 1
        console.log(err.message); // the error message, for example "Session ID unknown"
        console.log(err.context); // some additional error context
    });
};

