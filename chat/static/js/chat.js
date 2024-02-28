const chatSocket = new WebSocket("ws://" + window.location.host + "/");
    
        chatSocket.onopen = function (e) {
            console.log("Connected to WebSocket");
        };
    
        chatSocket.onclose = function (e) {
            console.log("WebSocket connection closed unexpectedly");
        };
    
        document.getElementById("message-input").focus();
        document.getElementById("message-input").onkeyup = function (e) {
            if (e.keyCode === 13) {
                document.getElementById("send-button").click();
            }
        };
    
        document.getElementById("send-button").onclick = function (e) {
            const messageInputDom = document.getElementById("message-input");
            const message = messageInputDom.value;
            chatSocket.send(JSON.stringify({
                message: message,
                username: "{{ request.user.username }}"
            }));
            messageInputDom.value = "";
        };
    
        chatSocket.onmessage = function (e) {
            const data = JSON.parse(e.data);
            const messageContainer = document.getElementById("msg_card_body");
            const div = document.createElement("div");
            div.className = "message";
            div.innerHTML = `<div><b>${data.username}</b>: ${data.message}</div>`;
            if (data.username === "{{ request.user.username }}") {
                div.classList.add("sender");
            } else {
                div.classList.add("receiver");
            }
            messageContainer.appendChild(div);
            messageContainer.scrollTop = messageContainer.scrollHeight;
        };