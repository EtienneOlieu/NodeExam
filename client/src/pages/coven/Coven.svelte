<script>
    import { user } from "../../store/user.js";
    import io from "socket.io-client";
    import { BASE_URL } from "../../store/urlDomain.js";
    import { onMount } from "svelte";

    const chatlogApi = BASE_URL + "/api/chatmessages";
    const socket = io("localhost:8080");
    let message = "";
    let chatArray = [];


function handleSendMessage(){
    const now = new Date().toLocaleString("en-GB");
    const serverMessage = {name:$user.name, time:now, message:message};
    //TODO DELETE
    console.log("THIS IS MESSAGE: ",message)
    console.log("THIS IS FOR SERVER: ",serverMessage);

    socket.emit("new message", serverMessage);
    message = "";
}

async function getChatlog(){

    const response = await fetch(chatlogApi, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();
    //TODO DELETE
    console.log("FROM THE FETCH: ", data.data);
    chatArray = data.data;
};

socket.on("message from server", (incomingMessage )=> {
    //TODO DELETE
    console.log("THIS IS THE MESSAGE FROM THE SERVER: ",incomingMessage);
    chatArray = [...chatArray, incomingMessage];
});
        

onMount(()=>{
    getChatlog();
});
</script>

<h1>COVEN</h1>
<h3>Chat with other members of the coven in real time.</h3>

<div id="chat-div">
    <div id="messages-div">
    {#each chatArray as message}
        <p>{message.name} - {message.time}</p>
        <p>{message.message}</p>
    {/each}
    </div>
</div>

<div id="chat-input">
<input type="text" bind:value={message} placeholder="type here..."/>
<button on:click|preventDefault={handleSendMessage}>send</button>
</div>

<style>
    #chat-div{
    background-image: url("/endsheet-olivegreen.jpeg");
    background-position: center;
    background-size:auto;
    background-repeat: no-repeat;
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
    flex-grow: 1;
    }

    input{
        width: 35vw;
        height: fit-content;
    }
</style>