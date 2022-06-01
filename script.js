const poke_container = document.getElementById("poke-container")
const pokemon_count = 150
const colours = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#F4E7DA',
    rock: '#D5D5D4',
    fairy: '#FCEAFF',
    poison: '#98D7A5',
    bug: '#F8D5A3',
    dragon: '#97B3E6',
    psychic: '#EAEDA1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const main_types = Object.keys(colours)


const fetchPokemons = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

    const pokemonEle = document.createElement('div')
    pokemonEle.classList.add('pokemon')

    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const colour = colours[type]

    pokemonEle.style.backgroundColor = colour;

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${idParser(pokemon.id)}.png" alt="pokemon">
    </div>
    <div class="info">
    <a href="https://www.pokemon.com/us/pokedex/${pokemon.id}" target="_blank">
        <span class="number">#${idParser(pokemon.id)}</span>
        <h3 class="name">${name}</h3>
    </a>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    `

    pokemonEle.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEle)
}

//the IDs work on the official pokedex in the following way:
//#001 == 1, #010 == 10, #100 = 100
//This function adds two zeroes to ids below 10 and one zero for ids below 100
// so it can be passed to the url for images 
const idParser = (id) => {
    if (id < 10) {
        return '00' + id;
    } else if (id < 100) {
        return '0' + id
    } else {
        return id;
    }
}

fetchPokemons()