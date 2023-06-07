<script>
import { user } from "../../store/user.js";
import { BASE_URL } from "../../store/urlDomain.js"
import Modal from "../../components/Modal.svelte";
import toastr from "toastr";
    import 'toastr/build/toastr.css';   
    import { prevent_default } from "svelte/internal";
    import { navigate } from "svelte-navigator";

toastr.option = {
        "positionClass": "toast-top-right",
        "timeOut": "3000"
    }

let showModal = false;

const userApi = BASE_URL + "/api/patchuser/" + $user.name
console.log(userApi)
let newName = "";
let newEmail = "";
let newPassword = "";

async function patchUser(){

    let newUserInfo = JSON.stringify({newName, newEmail, newPassword});

    const response = await fetch(userApi, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: newUserInfo,
        credentials: "include",

    });

    const data = await response.json();

    if (response.status === 400 || response.status === 500){
        return toastr.error(data.data);
    };
    if (response.status === 200){
        toastr.success("Information has been changed", data.data);
        setTimeout(()=>{
            navigate("/", {replace: true})
        }, 500);
    }
    newName = "";
    newEmail = "";
    newPassword = "";
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
        <p>Please only fill the information that you would like to change</p>
        <form on:submit|preventDefault="{patchUser}">
            <input type="text" name="new-name" placeholder="new name" bind:value={newName}>
            <br>
            <input type="email" name="new-email" placeholder="new email" bind:value={newEmail}>
            <br>
            <input type="password" name="new-password" placeholder="new password" bind:value={newPassword}>
            <br>
            <button type="submit">Submit changes</button>
        </form>
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