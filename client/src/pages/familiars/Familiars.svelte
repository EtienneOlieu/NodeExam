<script>
const url = "https://api.thecatapi.com/v1/images/search?breed_ids={bomb}";
const api_key = "live_zfduswcnovExEZgZClvV0Ab8kBpRxztCKd430rnYKxXsAIPxt91X0f5mELfygrYX";

let storedBreeds = [];

fetch(url, {headers: {
        "x-api-key": api_key,
    }}) 
.then((response)=> {
    return response.json();
})
.then((data)=> {
    data = data.filter(img=> img.image?.url!=null)
   
   storedBreeds = data;
});
</script>"

<h1>FAMILIARS</h1>
<p>We have gathered a repository of the best cats that are often found with fur black as night. 
    Should you choose a familiar among one of these, you can't go far wrong.</p>


{#each storedBreeds as breed}
    <div class="breed-div">
        <h2>{breed.name}</h2>

    </div>
{/each}
<style>

</style>