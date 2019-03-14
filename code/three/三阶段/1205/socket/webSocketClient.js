

// 客户端socket 
// 链接服务端 
// 发送消息给服务端
// 监听服务端发来的消息
// 监听服务端关闭/error 


var ws = new WebSocket("ws://192.168.56.93:3000");  //  链接服务器socket

// 链接服务端 
ws.onopen = function(){
    ws.send("大家好,我是WH1807 的 xxx");  // send 发 送消息给服务端
   
}

// 监听服务端发来的消息
ws.onmessage = function(data){
    console.log(data);
    document.getElementById("chatroom").innerHTML += "<p style='color:red'>"+data.data+"</p>"
}

// 监听服务端 error 
ws.onerror = function(err){
    console.log(err);
}


// 监听服务端关闭
ws.onclose = function(){
    console.log("server is closed 关闭了...");
}
