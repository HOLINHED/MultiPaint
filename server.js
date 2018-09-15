const PORT = 5000;
let express = require('express');
let socket = require('socket.io');

let app = express();
let server = app.listen(PORT);
let io = socket(server);

app.use(express.static('public'));

io.sockets.on('connection', (socket)=>{
    let idData = {
        id: socket.id,
    };

    io.sockets.emit("id", idData);

    socket.on('mouse', (data)=>{
        socket.broadcast.emit('mouse', data);
    });
});

console.log('Server started on port ' + PORT);