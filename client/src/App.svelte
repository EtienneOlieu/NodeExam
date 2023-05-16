<script>
import { Router, Link, Route } from "svelte-navigator";

import Footer from "./components/Footer.svelte";
import Home from "./pages/home/Home.svelte";
import About from "./pages/about/About.svelte";
import Coven from "./pages/coven/Coven.svelte";
import Formulae from "./pages/formulae/Formulae.svelte";



</script>

<Router>
<nav>
<Link to="/">Home</Link>
<Link to="/about">About</Link>
<Link to="/coven">Coven</Link>
<Link to="/formulae">Formulae</Link>
</nav>

<Route path="/">
  <Home />
</Route>

<Route path="/about">
  <About />
</Route>

<Route path="/coven">
  <Coven />
</Route>

<Route path="/formulae">
  <Formulae />
</Route>

</Router>

<Footer />

<style>

</style>