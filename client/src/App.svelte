<script>
import { user } from "../src/store/user.js"
import { Router, Link, Route, navigate } from "svelte-navigator";
import PrivateRoute from "./components/protectors/PrivateRoute.svelte";


import Footer from "./components/Footer.svelte";
import Home from "./pages/home/Home.svelte";
import About from "./pages/about/About.svelte";
import Coven from "./pages/coven/Coven.svelte";
import Formulae from "./pages/formulae/Formulae.svelte";
import Login from "./pages/login/Login.svelte";
import Account from "./pages/account/Account.svelte";
import Signup from "./pages/signup/Signup.svelte";
import Admin from "./pages/admin/Admin.svelte";
import Familiars from "./pages/familiars/Familiars.svelte";

$: if (!user){
  navigate("/", {
    state: { from: location.pathname },
            replace: true
  }); 
};

</script>

<Router>

<nav>
<Link to="/">Home</Link>

{#if !$user}
<Link to="/login_sign_up">Login / Sign up</Link>
{/if}

{#if $user}
<Link to="/account">Account</Link>
<Link to="/coven">Coven</Link>
<Link to="/familiars">Familiars</Link>
<Link to="/formulae">Formulae</Link>
{#if $user.privilege === "admin"}
<Link to="/admin">ADMIN</Link>
{/if}
{/if}

<Link to="/about">About</Link>

</nav>

<Route path="/">
  <Home />
</Route>

<Route path="/login_sign_up">
  <Login />
</Route>

<PrivateRoute path="/account">
  <Account />
</PrivateRoute>

<Route path="/about">
  <About />
</Route>

<PrivateRoute path="/coven">
  <Coven />
</PrivateRoute>

<PrivateRoute path="/familiars">
  <Familiars />
</PrivateRoute>

<PrivateRoute path="/formulae">
  <Formulae />
</PrivateRoute>

<Route path="/signup">
  <Signup />
</Route>

<PrivateRoute path="/admin">
  <Admin />
</PrivateRoute>

</Router>

<Footer />

<style>

  :global(body){
    background-image: url("/depart-pour-le-sabbat.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size:50% auto;
    background-attachment: fixed;
    background-color: black;
    color: rgb(45, 45, 45);
    
  }
  
  :global(#app){
    margin-left: 25vw;
    margin-right: 25vw;
    min-height: 90vh;
    justify-content: center;
  }

@font-face{
  font-family: "minster";
  src: url("/fonts/minster2.ttf")
}

  :global(h1, h2){
    font-family: "minster";
    color: red;
    font-size: 3em;
  }

  :global(h2){
    text-shadow: 0.07em 0.1em rgb(140, 0, 0, 0.6);
  }

  :global(h1){
    text-shadow: 0.07em 0.2em rgb(140, 0, 0, 0.6), -0.07em -0.2em rgb(216, 112, 147, 0.6);
    font-size: 5em;
  }

  :global(p){
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }
</style>