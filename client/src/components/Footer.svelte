<script>
    import { navigate } from "svelte-navigator";
import { BASE_URL } from "../store/urlDomain";
import { user } from "../store/user.js";
import toastr from "toastr";
import "toastr/build/toastr.css";   

const date = new Date().toLocaleDateString();

async function logout(){
    const logoutUrl = BASE_URL + "/api/logout";
   
    const response = await fetch(logoutUrl, {
        method: "GET"
    });
    const data = await response.json();
    
    user.set(null);
    setTimeout(()=>{
        navigate("/", {replace: true})
    },500);
    return toastr.success(data.data);
}
</script>

{#if $user}
<p>
    <button class="logout" on:click={logout}>{$user.name} - log out</button>
</p>
{/if}
<p>
This page © Lillith {date}
</p>

<style>
    p {
        position: fixed;
        bottom: 0;
        right: 0;
        padding-right: 1em; 
    }

    .logout {
        margin-bottom: 2.5em;
    }
</style>