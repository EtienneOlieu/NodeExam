<script>
import { user } from "../../store/user.js";
import { BASE_URL } from "../../store/urlDomain.js"
import Modal from "../../components/Modal.svelte";

let showModal = false;

const userApi = BASE_URL + "/api/user"

async function patchUser(){
    const response = await fetch(userApi, {
        method: "PATCH",
        credentials: "include",
    })
}

</script>

<h1>Account Info</h1>
<div id="outer-account-div">
    <div id="inner-account-div">
<h2>{$user.name}</h2>


        <p>Your registerede email is: {$user.email}</p> 
        <p>Your registered  name is: {$user.name}</p> 
        <p>Your rights are: "{$user.privilege}"</p>
        <button on:click={()=> (showModal = true)}>Edit your account</button>
    </div>
</div>

    <Modal bind:showModal>  
        <h2>EDITING {$user.name}</h2>
        <p>Hej Tilde, du er sød!</p>
    </Modal>
<style>
#outer-account-div{
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

#inner-account-div{
    padding: 1em;
    background-color: rgb(250, 235, 215, 0.7);
    border-radius: 2em;
}

</style>