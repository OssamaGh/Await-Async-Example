const POKE_API = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1000";
const LIST = "#pokemonList";

let pokemon = [];

async function getPokemon() {
    let response = await fetch(POKE_API);
    let json = await response.json();

    //Catch Pokemon
    for (p of json.results) {
        let newPoke = new Pokemon(p.name, p.url);
        pokemon.push(newPoke);
    }

    //Study Pokemon
    for (p of pokemon) {
        let stats = await fetch(p.getPokemonURL());
        let json = await stats.json();
        p.setExperience(json.base_experience);
        presentPokemon(p);
        console.log(json);
    }

}

function presentPokemon(pokemon) {
    let card = "<div class='pokecard'><h2>" + pokemon.name + "</h2> <h3>" + pokemon.xp + "</h3> <ul id ='abilities'> </ul></div>";
    $(card).appendTo(LIST);
}

getPokemon();

class Pokemon {
    constructor(name, api_url, xp) {
        this.name = name;
        this.url = api_url;
        this.xp = 0;
    }

    setExperience(xp) {
        this.xp = xp;
    }

    getPokemonURL() {
        return this.url;
    }
}