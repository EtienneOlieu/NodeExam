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
