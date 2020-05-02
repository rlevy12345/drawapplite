// SETUP IN TERMINAL
// npm init
// npm install express --save
// npm install socket.io --save

// importing express module
const express = require('express');
// express function makes a web application; store this in var app
const app = express();
// port that will wither be the web deployment port or 3000
const port = process.env.PORT || 3000;
// server uses app (express function) to listen on a port
const server = app.listen(port);
// import socket.io
const socket = require('socket.io');
// create a socket that is part of this server
// ---- keeping track of inputs and outputs
const io = socket(server);

// hosing static files in public library 
app.use(express.static('public'));

console.log('servers running');

// EVENTS

// if there is a new connection, call newConnection function
io.sockets.on('connection', newConnection);


function newConnection(socket) {
    console.log("new connection: " + socket.id);

    // handeling the 'mouse' data sent from client that will trigger mouseMessage function
    socket.on('mouse', mouseMessage);
    function mouseMessage(data) { // this will take in data
        // emitting data to any other socket connection (any other user on this server)
        socket.broadcast.emit('mouse', data);
        // io.socket.emit('mouse', data); // this will send data to yourself whereas broadcast does not
        console.log(data);
    }
}