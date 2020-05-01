// client side

// socket.io for client
var socket;

// setup canvas
function setup() {
	createCanvas(1000, 1000);
	background(51);

	// connecting client side socket
	socket = io.connect('http://localhost:3000');

	// recieing incomming data from server that triggers newDrawing function
	socket.on('mouse', newDrawing);
}

// when triggered, will draw at whereever the data.x and data.y
function newDrawing(data) { // takes in data
	noStroke();
	fill(255, 0, 100); // changing color 
	ellipse(data.x, data.y, 30, 30);
}

// drawing when draggin mouse
function mouseDragged() {
	console.log("Sending: " + mouseX + ", " + mouseY);

	// data to be sent to server
	var data = {
		x: mouseX,
		y: mouseY
	}
	// sending data with name 'mouse'
	socket.emit('mouse', data)

	noStroke();
	fill(255); 
	ellipse(mouseX, mouseY, 30, 30);
}