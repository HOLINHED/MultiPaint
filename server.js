const PORT = process.env.PORT || 3000;
const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(PORT, () => console.log('running on port ' + PORT));
const io = socket(server);

app.use(express.static('public'));

io.sockets.on('connection', socket => {
    socket.on('mouse', data => {
        socket.broadcast.emit('mouse', data);
    });
});

