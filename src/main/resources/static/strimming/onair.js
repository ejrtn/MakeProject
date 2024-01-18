let key = { 'shift': 0, 'enter': 0 }
document.querySelector(".write_area").addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // 이미 이벤트가 실행되는 중이라면 아무 동작도 하지 않습니다.
    }
    if (event.keyCode === 16) { key['shift'] = 1 }
    if (event.keyCode === 13 && key['shift'] === 0) {
        sendMsg()
        // 두 번 동작하는 것을 막기 위해 기본 동작을 취소합니다.
        event.preventDefault();
    }
})
document.querySelector(".write_area").addEventListener("keyup", function (event) {
    if (event.defaultPrevented) {
        return; // 이미 이벤트가 실행되는 중이라면 아무 동작도 하지 않습니다.
    }
    if (event.keyCode === 16) { key['shift'] = 0 }
})

function inRoom(socket){
    var inMsg={"type" : "IN","roomId":nickname,"sender":nickname,"msg":nickname+"님 들어오셨습니다"}; //sender는  글쓸때 수정하자.
    socket.send(JSON.stringify(inMsg));
}
let socket = new WebSocket("ws://localhost:8080/ws/chat");

socket.onopen = function (e) {
    console.log('open server!')
    inRoom(socket);
};
socket.onclose = function (e) {
    console.log('disconnet');
}

socket.onerror = function (e) {
    console.log(e);
}

//메세지 수신했을 때 이벤트.
socket.onmessage = function (e) {
    console.log(e);

    let t = ''
    t += '<div class="chatting">'
    t += '<img src="피카츄.jpg">'
    t += '<span class="nickname">'+e+' : </span>'
    t += '<span>' + e.data + '</span>'
    t += '</div>'
    const chatting_list = document.querySelector(".chatting_list");
    chatting_list.innerHTML += t
    chatting_list.scrollTop = chatting_list.scrollHeight

}


//메세지 보내기 버튼 눌렀을 떄..
function sendMsg() {
    let content = document.querySelector(".write_area").innerHTML;
    document.querySelector(".write_area").textContent = '';
    let talkMsg = { "type": "TALK", "roomId": nickname, "sender": nickname, "msg": content };
    socket.send(JSON.stringify(talkMsg));

}

function out() {
    let quitMsg = { "type": "OUT", "roomId": nickname, "sender": nickname, "msg": nickname+"님 나가셨습니다" };
    socket.send(JSON.stringify(quitMsg));
    socket.close();
    location.href = "/afreecatv/";
}