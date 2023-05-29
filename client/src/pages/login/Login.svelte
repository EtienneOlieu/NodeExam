<script>
    import { BASE_URL } from "../../store/urlDomain.js";
    import { user } from "../../store/user.js";
    import { Link, navigate } from "svelte-navigator"; 
    import toastr from "toastr";
    import 'toastr/build/toastr.css';   

toastr.option = {
        "positionClass": "toast-top-right",
        "timeOut": "3000"
    }

let email = "";
let password = "";

async function login(){
    const credentialsToJson = JSON.stringify({email, password});

    const loginUrl = BASE_URL + "/api/login";

    const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: credentialsToJson,
        credentials: "include",
    });

    const data = await response.json();

    if (response.status === 404){
        return toastr.error(data.data);
    }
    if (response.status === 400){
        return toastr.error(data.data);
    }

    if (response.status === 200 && data.email === email){
        user.set({name: data.name, email: data.email, privilege: data.privilege})
        
        //TODO DELETE
        console.log("This is a log of user after logging in: ", $user);

        toastr.success("You have logged in. Welcome back ", $user.name);
        setTimeout(()=>{
            navigate("/", { replace: true });
        }, 1500);
    };

    email = "";
    password = "";
}

</script>

<h1>LOG IN</h1>
<div id="login-div">
<form on:submit|preventDefault="{login}">
    <input type="email" name="email" placeholder="email" bind:value={email} required/>
    <input type="password" name="password" placeholder="password" bind:value={password} required/>

    <button type="submit">Login</button>
</form>

<p>Don't have an account? Sign up <Link to="/signup">here</Link>.</p>
</div>