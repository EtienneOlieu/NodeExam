<script>

import { BASE_URL } from "../../store/urlDomain.js";
import { onMount, onDestroy } from "svelte";

let formulaeArray = [];
const formulaeApi = BASE_URL + "/api/formulae";
console.log(formulaeApi);

async function getFormulae(){

const response = await fetch(formulaeApi, {
    method: "GET",
});

const data = await response.json();
//TODO DELETE
console.log("TEST OF DATA FRONTEND - Formulae: ", data);
formulaeArray = data.data;

console.log("TEST OF ASSIGNMENT TO formulaeArray: ", formulaeArray)
};

onMount(()=> {
    getFormulae();
})
onDestroy(()=>{

});
</script>

<h1>THIS IS GOING TO BE ALL OF THE AVAILABLE FORMULAE</h1>

<div class="formulaeDiv">
{#each formulaeArray as formulae}
<h2>{formulae.name}</h2>
{#if formulae.time / 60 < 1}
<p>{formulae.time} minutes</p>
{:else}
<p>{formulae.time/60} hours</p>
{/if}
<p>{formulae.description}</p>
{#each formulae.ingredients as ingredient}
<ul>
{ingredient[0],[1],[2]}
</ul>
{/each}   
{/each}
</div>

<style>

</style>