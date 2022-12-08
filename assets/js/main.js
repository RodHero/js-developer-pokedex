const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const nome = document.getElementById('staticBackdropLabel');
const tipo = document.getElementById('tipo')
const imagem = document.getElementById('imagem')


const maxRecords = 151
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <buttom type="button" id="lista" onClick="renderPoke(${pokemon.number})"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            </li>
        </buttom>
    `
}

async function fetchPokemon(numero) {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`);
    const dados = await resposta.json();
    return dados;
}

async function renderPoke(numero) {
    const dados = await fetchPokemon(numero) || {};
    if (dados) {
        nome.innerHTML = "#"+dados.id+" "+dados.name;
        tipo.innerHTML = dados['type'];
        imagem.innerHTML = dados['sprites'];

        
    }
    else {
        nome.innerHTML = 'Not found :c';
    }
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})



