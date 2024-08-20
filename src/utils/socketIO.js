const { Server } = require('socket.io');

const connetSocket = () => {
    const io = new Server({
        cors: {
            origin: "http://localhost:3000"
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);
        socket.emit('welcome', 'welcome to the fruitables.');
        socket.broadcast.emit('greeting', 'Hello All.');

        socket.on('message',
            (data) => {
                console.log(data);
                io.to(data.receiver).emit('rec-msg', data.message);
            }
        );
        // socket.join('group-message',
        //     (group_name) => {
        //         console.log(group_name);
        //     }
        // )
        socket.on('group-message', (group_name) => {
            console.log(group_name);
            socket.join(group_name);
        })
    });

    io.listen(8080);
};

module.exports = connetSocket;