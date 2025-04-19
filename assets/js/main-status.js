
function convertPokemonToHtml(pokemon) {
    const stats = {};
    pokemon.status.forEach( stat => {
        stats [stat.stat.name] = stat.base_stat;
    });

    const tipoPokemon = pokemon.types[0].type.name.toLowerCase();
    document.body.classList.add(tipoPokemon);

    return `
         <div class="pokemon">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.id}</span>
        </div>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type.type.name}">${type.type.name}</li>`).join('')}
            </ol>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg">
        </div>

        <div class="stats">
            <p class="statsTitle">Base Stats</p>

            <ol class="statsDetail">
                <li>HP  ------------------------------------  ${stats.hp}</li>
                <li>Attack  -------------------------------  ${stats.attack}</li>
                <li>Defense  -----------------------------  ${stats.defense}</li>
                <li>Special Attack  ---------------------  ${stats["special-attack"]}</li>
                <li>Special Defense  -------------------  ${stats["special-defense"]}</li>
                <li>Speed  --------------------------------  ${stats.speed}</li>
            </ol>
        </div> 
        `;
}

async function loadPokemonData(pokeId) {
    const pokemon = await fetchPokemonData(pokeId);
    if (pokemon) {
        const pokemonInfo = document.getElementById('pokemonStat')
        pokemonInfo.innerHTML = convertPokemonToHtml(pokemon);
    }
}

function getPokemonIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

document.addEventListener("DOMContentLoaded", () => {
    const pokemonId = getPokemonIdFromUrl();
    if (pokemonId) {
        loadPokemonData(pokemonId);
    }
});