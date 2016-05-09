var app = require("express")(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	express = require('express'),
	port = (process.env.VCAP_APP_PORT || 3000); 
	host = (process.env.VCAP_APP_HOST || "localhost"); 

//import {FillDatabase} from "./getData/FillDatabase.js";


// Define public folder
app.use(express.static(__dirname));

// Chargement de la page index.html
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket, pseudo) {


	// Controller
	require("./getData/Controller.js")();
	var controller = new Controller(socket);
	//controller.getPlayerData("Hydrafox", "EUW");



	socket.on('getGraphData', function () {

		// Controller
		var graphData = controller.championStat.getMasterySorted();
		socket.emit('graphData', graphData);
	});



	socket.on('playerSelected', function (pseudo, region) {

console.log(pseudo);
console.log(region);
		// Controller
		controller.getPlayerData(pseudo, "EUW");
	});


});

server.listen(port,host); 