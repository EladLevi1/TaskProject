const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const DBurl = 'mongodb://127.0.0.1:27017/TasksProject';

const app = express();
const httpServer = http.createServer(app);
const ioServer = socketIO(httpServer, {
    cors:{
        origin: ['http://localhost:4200']
    }
});

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// The express library has the bodyParser already
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const taskRoute = require('./routes/taskRoute');
app.use('/TasksProject/Tasks', taskRoute);

const userRoute = require('./routes/userRoute')
app.use('/TasksProject/Users', userRoute);

ioServer.on('connection', (socket) => {

    socket.on('addTask', (task) =>{
        ioServer.emit('newTask', task);
    })

    socket.on('removeTask', (task) =>{
        ioServer.emit('deleteTask', task);
    })

    socket.on('editTask', (task) => {
        ioServer.emit('changeTask', task);
    })

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    })

    socket.on('chatMessage', ({room, message}) => {
        ioServer.to(room).emit('message', message);
        console.log(`Message sent to room: ${room}, message: ${message}`);
    })
});

mongoose.connect(DBurl).then(() => {
    console.log("Database is connected!");

    const server = httpServer.listen(8080, () => {
        const port = server.address().port;
        console.log('server listening on port: ', port);
    });
}).catch((err) => {
    console.log('Error connecting to the database:', err.message);
})