

function scrollToBottom()
{
   //Selectors
   var messages = $("#messages");
   var newMessage = messages.children("li:last-child");

   //Heights
   var clientHeight = $("#messages").prop('clientHeight');
   var scrollTop = $("#messages").prop('scrollTop');
   var scrollHeight = $("#messages").prop('scrollHeight');
   var newMessageHeight = newMessage.innerHeight();
   var lastMessageHeight = newMessage.prev().innerHeight();

   if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >=scrollHeight)
   {
     messages.scrollTop(scrollHeight);
   }
}

var socket = io();
socket.on('connect' , function(){
  console.log("connected to server");
  var params = $.deparam(location.search);
  socket.emit('join' , params , function(err){
    if(err){
      alert(err);
      location.href= "/";
    }
    else
    {
      console.log("no error");
    }
  });

  // socket.emit('createMessage' , {
  //     from: "Mudasser",
  //     text: "Yup That works for me!"
  // });

  // socket.emit('createEmail' , {
  //    to:'jen@example.com',
  //    text: "This is mudasser"
  // });

});

socket.on('disconnect' , function(){
  console.log("disconnected from server");
});

socket.on("updateUserList" , function(users){
  console.log("user List ",users);
  var ol = $("<ol></ol>");
  users.forEach(function(user){
    ol.append($("<li></li>").text(user));
  });
  $("#users").html(ol);
});

socket.on('newMessage' , function(message){
 var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = $("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $("#messages").append(html);
  scrollToBottom();
   // var li = $("<li></li>");
   // li.text(`${message.from} ${formattedTime} : ${message.text}`);
   // $("#messages").append(li);
});


socket.on('newLocationMessage' ,function(message){

 var formattedTime = moment(message.createdAt).format("h:mm a");
 var template = $("#location-message-template").html();
 var html = Mustache.render(template , {
   from:message.from,
   createdAt: formattedTime,
   url: message.url
 });
  // var li = $("<li></li>");
  // var a = $("<a href='javascript' target='_blank'>My Current Location</a>");
  // li.text(`${message.from} ${formattedTime} : `);
  // a.attr("href",message.url);
  // li.append(a);
  $("#messages").append(html);
  scrollToBottom();
});

// socket.emit('createMessage' , {
//   from:'anyone@anyoe',
//   text: 'this is the texto'
// } , function(messageBack){
//   console.log(messageBack);
// });



$("#message-form").on("submit" , function(e){
      e.preventDefault();

      var messageTextBox = $(this).find("[name=message]");

      socket.emit('createMessage' , {
        from: "User",
        text: messageTextBox.val()
      } , function(){
        messageTextBox.val("");

      });
});
// socket.on('newEmail' , function(email){
//   console.log('New Email' , email);
// });

var locationButton = $("#send-location");
locationButton.on('click' , function(){
   if(!navigator.geolocation)
   {
     return alert('Geolocation Not Supported By Your Browser');
   }
   locationButton.attr("disabled" , "disabled");
   locationButton.text("Sending...");
   navigator.geolocation.getCurrentPosition(function(position){
     console.log(position);
      socket.emit('createLocationMessage',{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      locationButton.removeAttr("disabled").text("Send Location");

   } , function(){
     locationButton.removeAttr("disabled").text("Send Location");
      return alert('Unable To Fetch Location');
   });
});
