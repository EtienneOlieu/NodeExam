<script>
    import { navigate } from "svelte-navigator";
    import { BASE_URL } from "../../store/urlDomain.js";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';

    toastr.option = {
        "positionClass": "toast-top-right",
        "timeOut": "3000"
    }

let name = "";

let email1 = "";
let email2 = "";

let password1 = "";
let password2 = "";

    async function signUp(){
        if (email1 !== email2){
            return toastr.error("Email must be the same.");
        }
        if (password1 !== password2){
            return toastr.error("Passwords must be identical");
        }
        const email = email1;
        const password = password1;

        const newUserCredentials = JSON.stringify({name, email, password});
        const signUpUrl = BASE_URL + "/api/createuser";

        const response = await fetch(signUpUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: newUserCredentials,
            credentials: "include"
        })

        const data = await response.json();

        //TODO DELETE
        console.log("This should be the created resource: ", data)

        if (response.status === 404){
            return toastr.error(`ERROR: ${data.message}`)
        };
        if (response.status === 201){
            setTimeout(()=>{
                navigate("/login_sign_up", {replace: true})
            }, 1500);
            return toastr.success(`Welcome to the coven ${data.data}, please log in.`);
        };
        
        name = "";

        email1 = "";
        email2 = "";

        password1 = "";
        password2 = "";
    }

</script>

    <h1>SIGN UP</h1>

<form on:submit|preventDefault="{signUp}">

    <input type="text" name="name" placeholder="name" bind:value={name} required> 
    <br>
    <br>
    <input type="email" name="email1" placeholder="email" bind:value={email1} required/>
    <br>
    <input type="email" name="email2" placeholder="repeat email" bind:value={email2} required/>
    <br>
    <br>
    <input type="password" name="password" placeholder="password" bind:value={password1} required/>
    <br>
    <input type="password" name="password" placeholder="repeat password" bind:value={password2} required/>
    <br>
    <br>
    <button type="submit">Sign Up</button>
</form>
