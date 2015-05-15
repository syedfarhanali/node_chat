var express = require('express');
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
})

io.on('connection',function(client){
  console.log("You are connected ...");
  client.on('join',function(name){
  	console.log(name+" joined ...");
    client.nickname=name;
  });
  client.on('messages',function(message){
	var chatText = client.nickname+": " + message + " <br/>";
	console.log("message received : "+chatText);
	client.emit("messages",chatText);
    client.broadcast.emit("messages",chatText);
  });
});

server.listen(8000);
// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
