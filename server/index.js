const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const DBurl = 'mongodb://127.0.0.1:27017/MissionProjects';

const app = express();
const httpServer = http.createServer(app);
const ioServer = socketIO(httpServer, {
    cors:{
        origin: ['https://localhost:4200']
    }
});

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// The express library has the bodyParser already
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:4200'
};

app.use(cors(corsOptions));

const missionRoute = require('./routes/missionRoute');
app.use('/MissionProjects/Missions', missionRoute);

const userRoute = require('./routes/userRoute')
app.use('/MissionProjects/Users', userRoute);

ioServer.on('connection', (socket) => {
    console.log('user connected');

    socket.on('onmessage', (message) => {
        // socket.emit('newmessage', message);
        // socket.broadcast.emit('newmessage', message);

        ioServer.emit('newmessage', message);
    });

    socket.on('disconnect', () =>{
        console.log('user disconnect');
    });
});

mongoose.connect(DBurl).then(() => {
    console.log("Database is connected!");

    const server = app.listen(8080, () => {
        const port = server.address().port;
        console.log('server listening on port: ', port);
    });
}).catch((err) => {
    console.log('Error connecting to the database:', err.message);
})