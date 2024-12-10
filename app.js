const poke_container = document.querySelector('.poke-container');
const search = document.querySelector('.search');
const searchInput = document.querySelector('.searchInput');
const searchBtn = document.querySelector('.searchBtn');
//api'daki toplam pokemon sayısı
const pokemon_count = 151;//pokemon sayısı
//renkler
const bg_color = {
    grass: '#8BD369',
    fire: '#FF603F',
    water: '#3399FF',
    bug: '#AABB22',
    normal: '#AAAA99',
    flying: '#9AA8FA',
    poison: '#B76EA4',
    electric: '#FFD34E',
    ground: '#E2C56A',
    fairy: '#F1A8EC',
    psychic: '#FF6EA4',
    fighting: '#C56E5C',
    rock: '#C5B679',
    dragon: '#7766EE',
    ice: '#66CCFF',
  }
  //olay izleyicisi ile search butonuna "active" clası ekliyoruz.
  searchBtn.addEventListener("click",()=>{
    search.classList.toggle(`active`)
  });
  //arama için olay izleyicisi eklendi
  searchInput.addEventListener('input', (e) => {
    //console.log(searchInput.value)
    const searchValue = searchInput.value.toLowerCase()
    const pokemonNames = document.querySelectorAll('.poke-name')
    //console.log(pokeName)
  
    pokemonNames.forEach((pokemonName) => {
      pokemonName.parentElement.parentElement.style.display = 'block'
  
      if (!pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
        pokemonName.parentElement.parentElement.style.display = 'none'
      }
    })
  })

  //fetch isteği ile pokemonlar almak için döndürüyoruz
  const fetchPokemons=async()=>{
    for(let i=1;i<pokemon_count;i++)
        {
            await getPokemon(i);
        }
  }
  //API dan pokemonları alıyoruz
  const getPokemon=async(id)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    
    createPokemonCard(data)
  }
  //API' alınan pokemonlar ekrana basar.
  const createPokemonCard = (pokemon) => {
    const pokemonDiv = document.createElement('div')
    pokemonDiv.classList.add('pokemon')
  //json veri içerisinde id'leri yakalar
    const pokemonId = pokemon.id.toString().padStart(3, '0');
    const pokemonType = pokemon.types[0].type.name
  
    const pokemonBg = bg_color[pokemonType]
    
    pokemonDiv.style.backgroundColor = `${pokemonBg}`
  
    const pokemonInnerHTML = `
              <div class="image-container">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
                alt="pokemon"
              />
            </div>
            <div class="poke-info">
              <span class="poke-id">#${pokemonId}</span>
              <h3 class="poke-name">${pokemon.name}</h3>
              <div class="small">
                <small class="poke-exp"
                  ><i class="fa-solid fa-flask"></i> <span>${pokemon.base_experience} Exp</span></small
                >
                <small class="poke-weight"
                  ><i class="fa-solid fa-weight-scale"></i> <span>${pokemon.weight} Kg</span></small
                >
              </div>
              <div class="poke-type"></d>
                <i class="fa-brands fa-uncharted"></i> <span>${pokemonType}</span>
              </h5>
            </div>
    `
  
    pokemonDiv.innerHTML = pokemonInnerHTML
  
    poke_container.appendChild(pokemonDiv)
  }
  
  fetchPokemons()