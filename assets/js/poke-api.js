
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetails) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetails.id
    pokemon.name = pokeDetails.name

    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetails.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

        return fetch(url)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonDetails) => pokemonDetails)
            
} 

async function fetchPokemonData(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Erro ao buscar informações deste Pokémon");
        }
        const pokemon = await response.json();
        return pokemon;
      } catch (error) {
        console.error("Erro ao buscar informações deste Pokémon:", error);
        return null;
      }
}