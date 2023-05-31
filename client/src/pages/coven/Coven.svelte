<script>
    import { user } from "../../store/user.js";
    import io from "socket.io-client";
    import { BASE_URL } from "../../store/urlDomain.js";
    import { onMount, tick } from "svelte";

    const chatlogApi = BASE_URL + "/api/chatmessages";
    const socket = io("localhost:8080");
    let message = "";
    let chatArray = [];
    let element;


function handleSendMessage(){
    const now = new Date().toLocaleString("en-GB");
    const serverMessage = {name:$user.name, time:now, message:message};

    socket.emit("new message", serverMessage);
    message = "";
}

async function getChatlog(){
    const response = await fetch(chatlogApi, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    chatArray = data.data;
};

socket.on("message from server", (incomingMessage )=> {
    chatArray = [...chatArray, incomingMessage];
    tick().then(()=>{
        scrollToBottom(element);
    })
});

const scrollToBottom = async (node) => {
    await tick();
    node.scroll({ top: node.scrollHeight, behavior: "smooth" });
}; 

function handleKeyDown(event){
    if(event.key === "Enter") {
        event.preventDefault();
        handleSendMessage();
    }
}

onMount(()=>{
    getChatlog();
    scrollToBottom(element);
});
</script>

<h1>COVEN</h1>
<h3>Chat with other members of the coven in real time.</h3>

<div id="chat-div">
    <div id="messages-div" bind:this={element}>
    {#each chatArray as message}
        <p style="text-align: right;"><strong>{message.name}</strong> - {message.time}</p>
        <p>{message.message}</p>

    {/each}
    </div>
</div>

<div id="chat-input">
<input type="text" bind:value={message} placeholder="type here..." on:keydown={handleKeyDown}/>
<button on:click|preventDefault={handleSendMessage}>send</button>
</div>

<style>
    #chat-div{
    background-image: url("/endsheet-olivegreen.jpeg");
    background-position: center;
    background-size:auto;
    background-repeat: no-repeat;
    max-height: 60vh;
    margin-left: 2vw;
    margin-right: 2vw;
    margin-bottom: 3vh;
    padding: 1em;
    text-align: left;
    color: rgb(45, 45, 45);
    border-style: double;
    border-color: blanchedalmond;
    }

    #messages-div{
    padding: 1em;
    background-color: rgb(250, 235, 215, 0.7);
    border-radius: 1em;
    max-height: 40vh;
    overflow: scroll;
    }

    input{
        width: 35vw;
        height: fit-content;
    }
</style>