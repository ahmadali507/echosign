const io = require('socket.io')(8900, {
    cors: {
        origin: 'http://localhost:5173',
    },
});

let users = [];

const addUser = (userId, socketId, email) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId, email });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
    //when ceonnect
    console.log('a user connected.');

    //take userId and socketId from user
    socket.on('addUser', (userId, socketId, email) => {
        if (userId) {
            addUser(userId, socketId || socket.id, email);
            io.emit('getUsers', users);
        }
    });

    //send and get message
    socket.on(
        'sendMessage',
        ({ senderId, receiverId, text, timestamp, readBy }) => {
            const user = getUser(receiverId);
            if (!user) console.error('user not found - receiverId = ' + receiverId);
            io.to(user?.socketId).emit('getMessage', {
                senderId,
                text,
                timestamp,
                readBy,
            });
        }
    );

    //when disconnect
    socket.on('disconnect', () => {
        console.log('a user disconnected!');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});