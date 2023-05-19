<script>

import { BASE_URL } from "../../store/urlDomain.js";
import { onMount, onDestroy } from "svelte";

const formulaeApi = BASE_URL + "/api/formulae";
let formulaeArray = [];
let sliderValue = 1;
async function getFormulae(){

const response = await fetch(formulaeApi, {
    method: "GET",
});

const data = await response.json();
formulaeArray = data.data;

};

onMount(()=> {
    getFormulae();
})

function ingredientName(ingredient) {
    return Object.keys(ingredient)[0].toString();
};

function ingredientUnit(ingredient) {
    if (Object.keys(ingredient[Object.keys(ingredient)[0]])[0].toString() === "amount"){
        return "";
    }
    return Object.keys(ingredient[Object.keys(ingredient)[0]])[0].toString();
};

function ingredientValue(ingredient) {
    return ingredient[Object.keys(ingredient)[0]][Object.keys(ingredient[Object.keys(ingredient)[0]])[0]]
}


</script>

<h1>THIS IS GOING TO BE ALL OF THE AVAILABLE FORMULAE</h1>

<p>Want to make a larger batch?</p>

<input type="range" min="1" max="10" bind:value={sliderValue}/>
<p>Showing for {sliderValue} number of servings.</p>

{#each formulaeArray as formulae}
<div class="formulaeDiv">

<h2>{formulae.name}</h2>
<p>{formulae.effect}</p>
<p>{formulae.description}</p>
<h3>ingredients</h3>
{#each formulae.ingredients as ingredient}
<ul>
<li><strong>{ingredientName(ingredient)}:</strong> {ingredientValue(ingredient) * sliderValue} {ingredientUnit(ingredient)}</li>
</ul>
  {/each}
{#if formulae.time / 60 < 1}
<p>Cook at {formulae.temperature}°C for {formulae.time} minutes</p>
{:else}
<p>Cook at {formulae.temperature}°C for {formulae.time/60} hours</p>
{/if}
</div>
{/each}

<style>
.formulaeDiv{
    border-radius: 1em;
    background-color: lightgray;
    margin-left: 25vw;
    margin-right: 25vw;
    margin-bottom: 3vh;
    padding: 1em;
    text-align: left;
    }
</style>