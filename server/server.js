

const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage , generateLocationMessage} = require('./utils/message');
const {Users} = require('./utils/users');
const {isRealString} = require('./utils/validation');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;
var users = new Users();

const pathName = path.join(__dirname ,"../public");
app.use(express.static((pathName)));


io.on('connection' , (socket)=>{
    console.log('client connected');

    socket.on('join' , (params , callback)=>{
      if(!isRealString(params.name) ||  !isRealString(params.room))
      {
        callback("Name and room name are required");
      }
      else {
        callback();
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id , params.name , params.room);
        io.to(params.room).emit('updateUserList' , users.getUsersList(params.room));
        socket.emit('newMessage' , generateMessage("Admin" , "Welcome To The Chatroom App"));
        socket.broadcast.to(params.room).emit('newMessage' , generateMessage("Admin" , `${params.name} Joined`));
      }
    });


    socket.on('disconnect' , ()=>{
      console.log('disconnected the  client');
      var user = users.removeUser(socket.id);
      if(user){
        io.to(user.room).emit('updateUserList' , users.getUsersList(user.room));
        io.to(user.room).emit('newMessage' , generateMessage("Admin" , `${user.name} has left the chat`));
      }
    });



    socket.on('createMessage' , (message , callback)=>{
      console.log('create message ',message);
      var user = users.getUser(socket.id);
      if(user && isRealString(message.text))
      {
        io.to(user.room).emit('newMessage' ,  generateMessage(user.name , message.text));
      }

      callback();
      // socket.broadcast.emit('newMessage' , {
      //   from:message.from,
      //   text:message.text,
      //   createdAt: new Date().getTime()
      // });

    });


    socket.on('createLocationMessage' , (coords)=>{
      console.log("creating",coords);
      var user = users.getUser(socket.id);
      if(user)
      {
        io.to(user.room).emit('newLocationMessage' , generateLocationMessage(user.name , coords.latitude , coords.longitude));
      }

    });


    // socket.emit('newMessage' , {
    //   from: "ahmed@ahmed.com",
    //   text: "This is the text",
    //   createdAt: 14000
    //  });



    // socket.emit('newEmail' , {
    //   from: "mudasserlodhi@yahoo.com",
    //   text: "Hey What is going on",
    //   createdAt: 12345
    // });
    //
    // socket.on('createEmail' , (newEmail)=>{
    //   console.log('Create Email ',newEmail);
    // });
});


// app.get('/' , (req, res)=>{
//    res.send({
//      a: "yes"
//    });
// });


server.listen(port , ()=>{
  console.log( `listening on port ${port}`);
});
