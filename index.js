var app = require("express")();
var http = require('http').Server(app);
var io = require("socket.io")(http);
var path = '/';
var md5 = "";
var css = '/css/styles.css';
app.get(path, function(req, res){
  if(path==null){
    path = '/index.html';
  }
  res.sendFile(__dirname + path);
});
app.get("/message.html", function(req, res){
  res.sendFile(__dirname + "/message.html");
  md5 = req.query.md5;
});
app.get('/notification.mp3', function(req, res){
  res.sendFile(__dirname + '/notification.mp3');
});
app.get(css, function(req, res){
  res.sendFile(__dirname + css);
});
http.listen(801, function(){
  console.log('listening on *:801');
});
io.on('connection', function(socket){
  socket.on('disconnect',function(){
    console.log("A user disconnected");
  });
  socket.on(md5, function(msg){
    io.emit(md5, msg);
    console.log(msg);
   });
});
