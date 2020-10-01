var express=require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var user=[];
app.set('view engine','ejs');

app.get('/',(req,res,next)=>{

    res.statusCode=200;
    //res.setHeader('content-type','text/html');
   res.render('index');

  
});
var client=1;
io.on('connection', function(socket) {
    console.log('A user connected');

    
    socket.on('disconnect', function () {
       console.log('A user disconnected');
       user=[];
    });
    socket.on('player',(name)=>{
        user.push(name);
        console.log(user);
        io.emit('otheruser',(user));
       
    });
    
    socket.on('rolldice',()=>{
        var dice = Math.floor(Math.random() * 6) + 1;
        io.emit('msg2',dice);
       
    });
   
    socket.on('score',(play)=>{
        console.log(play.score,play.active);
        socket.broadcast.emit('scorecard',({score:play.score,active:play.active}));
    });
 });

http.listen(3000,"localhost",()=>{
    console.log("server running at port 3000");
});
