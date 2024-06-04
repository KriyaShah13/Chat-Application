var socket = io();
function scrollBottom()
{
	//selector
	var messages=jQuery("#messages");
	var chat_message=jQuery(".chat_message");

	var clientHeight=chat_message.prop("clientHeight");
	var scrollHeight=chat_message.prop("scrollHeight");
	var scrollTop=chat_message.prop("scrollTop");
	var newMessageHeight=messages.children('li:last-child').innerHeight();
	var lastMessageHeight=messages.children('li:last-child').prev().innerHeight();
	
	if((scrollTop+clientHeight+newMessageHeight+lastMessageHeight+20)>=scrollHeight)
	{	
		chat_message.scrollTop(scrollHeight); 
	}
	
}


socket.on("connect",()=>{
		
		var params=jQuery.deparam(window.location.search);
		socket.emit("join",params,function(err){
			if(err)
			{	
				window.location.href="/";
				alert(err);
			}
			else{
					
					console.log("No error");

				}

		});
		});


socket.on("disconnect",()=>{
				console.log("Disconnected to server");
	});


socket.on("updateUserList",(userArray)=>{
					
					var ol=jQuery("<ol></ol>");
					userArray.forEach(function (user){
						ol.append(jQuery("<li></li>").text(user));
					});			
				    jQuery("#users").html(ol);
				});


socket.on("newMessage",function(message){
	var time=moment(message.createAt).format("h:mm a");
	var template=jQuery('#message-template').html(); 

	var html=Mustache.render(template,{
		from: message.from,
		text: message.text,
		createAt: time});

	jQuery('#messages').append(html);
	scrollBottom();

});


jQuery("#message-box").on("submit",function(e){
e.preventDefault();
var textMessage=jQuery("[name=message]");
socket.emit("createMessage",{text:" "+textMessage.val()},function(err){if(err){alert(err);} textMessage.val('')});
});


var locationbutton=jQuery("#send-location");
locationbutton.on("click",function(){
	if(!navigator.geolocation)
	{
		return alert('Location not supported by your browser');
	}
	 locationbutton.attr("disabled","disabled").text('Sending Location....');
     navigator.geolocation.getCurrentPosition(function(position){ 
		
		var lat=position.coords.latitude;
		var long=position.coords.longitude;
		socket.emit("shareLocation",{lat,long});
		locationbutton.removeAttr('disabled').text('Send Location');
	}
		,function(){alert("Please allow to access location");
					locationbutton.removeAttr('disabled').text('Send Location');	
	});

});

socket.on("newLocationMessage",function(location){
			
			var time=moment(location.createAt).format("h:mm a");
		    var template=jQuery("#send_location").html();
			var html=Mustache.render(template,{from:location.from,createAt:time,url:location.url});
			jQuery("#messages").append(html);
			scrollBottom();
		});