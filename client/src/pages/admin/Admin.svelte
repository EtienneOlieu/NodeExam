<script>
import { onMount } from "svelte";
import { BASE_URL } from "../../store/urlDomain";
import { user } from "../../store/user";
    
const usersApi = BASE_URL + "/api/users";
let usersArray = [];

async function getUsers(){
    const response = await fetch(usersApi, {
        method: "GET"
    });
        
    const data = await response.json();
    usersArray = data.data;
     
};

onMount(()=>{
    getUsers();
});

</script>
<h1>Welcome {$user.name}</h1>

{#each usersArray as user}
    <div class="userDiv">
        <h3>User: {user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Rights: {user.privilege}</p>
    </div>
{/each}

<style>
    .userDiv {
        border-radius: 1em;
        background-color: lightgray;
        margin-left: 25vw;
        margin-right: 25vw;
        margin-bottom: 3vh;
        padding: 1em;
        text-align: left;
    }
</style>