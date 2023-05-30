<script>

import { BASE_URL } from "../../store/urlDomain.js";
import { onMount } from "svelte";

const formulaeApi = BASE_URL + "/api/formulae";
let formulaeArray = [];
let sliderValue = 1;

async function getFormulae(){

    const response = await fetch(formulaeApi, {
        method: "GET",
        credentials: "include",
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

<h1>FORMULAE</h1>
<h2>All the formulae</h2>

<div id="batch-div">
<p>Want to make a larger batch?</p>
<input type="range" min="1" max="10" bind:value={sliderValue}/>
<p>Showing for {sliderValue} serving{#if sliderValue > 1}s{/if}.</p>

{#each formulaeArray as formulae}
<div class="formulaeDiv">
<h2>{formulae.name}</h2>
<div class="form-text-div">
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
</div>
{/each}
</div>
<style>
.formulaeDiv{
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

.form-text-div{    
    padding: 1em;
    background-color: rgb(250, 235, 215, 0.7);
    border-radius: 2em;
}

#batch-div{
    padding-top: 2em;
    background-color: rgb(250, 235, 215, 0.7);
    border-style: double;
    }

</style>