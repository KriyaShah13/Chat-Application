const path = require('path');
const express = require('express');
var http=require('http');
var socketIO=require('socket.io');
var app = express();
var server=http.createServer(app);
var io=socketIO(server);
var port=process.env.PORT || 3000;
var {generateMessage,generateLocationMessage}=require('./utility/message.js');  //ES6 destructuring
var {realString}=require('./utility/validate.js');
const {Users}=require('./utility/users');
const publicPath=path.join(__dirname,'../public');
var users=new Users();
app.use(express.static(publicPath));
io.on('connection',(socket)=>{

	socket.on('join', (params, callback) => {
		console.log(params);
    if (!realString(params.name) || !realString(params.room_name)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room_name);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room_name);

    io.to(params.room_name).emit('updateUserList', users.getUsersList(params.room_name));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room_name).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });
    socket.on("createMessage",function (data,callback){
    	var user=users.getUser(socket.id);
    	if(user && realString(data.text)){
        io.to(user.room).emit("newMessage",generateMessage(user.name,data.text));
    	callback();
    }
    else return callback("You can't send empty text");
    });
    socket.on("shareLocation",function(position){ 
    	var user=users.getUser(socket.id);
    	if(user){
    	io.to(user.room).emit("newLocationMessage",generateLocationMessage(user.name,position.lat,position.long));
    }
    });
	
    socket.on('disconnect',()=>{
	var user=users.removeUser(socket.id);
	if(user){
	io.to(user.room).emit("updateUserList",users.getUsersList(user.room));
	io.to(user.room).emit("newMessage",generateMessage("Admin",`${user.name} left the group`));
			}
});
});
server.listen(port,()=>{
  console.log("Server is upon port 3000");
});
