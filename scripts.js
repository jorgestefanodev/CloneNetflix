const API_KEY = 'api_key=b4b5f9d98442f11bbdd50a5adf70f1d1';
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const language = 'language=pt-BR';
const home = document.getElementById("home")

let dadosFilmes = []


async function captarFilmes(categoria) {
    try {       //params === 'movie' ? : 'tv')/popular?${API_KEY}&${language}`
        let resposta = await fetch(`${BASE_URL}/movie/${categoria}?${API_KEY}&${language}`)
        let dados = await resposta.json()

        return dados.results
    } catch (err) {
        console.log(err)
    }
}


async function captarSeries() {
    try {
        let resposta = await fetch(`${BASE_URL}/tv/popular?${API_KEY}&${language}`)
        let dados = await resposta.json()

        return dados.results
    } catch (err) {
        console.log(err)
    }
}


async function captarFilme(id) {
    try {
        let resposta = await fetch(`${BASE_URL}/movie/${id}?${API_KEY}&${language}`)
        let filme = await resposta.json()

        return filme
    } catch (err) {
        console.log(err)
    }
}


async function mostrarSessaoInicial(id) {
 
    let filme = await captarFilme(id)

    let avaliacao = Math.floor(filme.vote_average * 10)
    let media = avaliacao >= 70 ? "bom" : avaliacao >= 50 ? "medio" : "ruim"

    home.innerHTML = `
        <div>
            <h2>${filme.title}</h2>
            <span>Generos: ${filme.genres.map(genero => genero.name)}</span>
            <p class="${media}">${avaliacao}% gostaram</p>
            <p>${filme.overview}</p>

        </div>
        <img src=${IMG_URL + filme.backdrop_path} />
    `
}


async function mostarSessaoAleatoria() {
    
    let aleatorio = Math.floor(Math.random() * 60)
    let filmeAleatorio = dadosFilmes[aleatorio]

    await mostrarSessaoInicial(filmeAleatorio.id)
}


async function captarId(filme) {
    let id = localStorage.setItem("filme_id", filme)
    location = "./filme.html"
   
}


async function mostrarCarrossel(categoria) {
    let filmes = await captarFilmes(categoria)
    let carrossel = document.getElementById(categoria)

    for(let filme of filmes ) {
        dadosFilmes.push(filme)
        carrossel.innerHTML += `
            <div class="imagemFilme">
                <img onclick="captarId(${filme.id})" src="${IMG_URL + filme.poster_path}" />
            </div>
        `
    }
}

function voltar(categoria) {
    /* 
        scrollLeft é a propriedade que indica a distância do track
        do scroll em relação ao inicio da barra
     */
    
    /* 
        offsetWidth é a propriedade que indica a largura do elemento
        que está visível para o usuário
     */
    let carrossel = document.getElementById(categoria)
    carrossel.scrollLeft -= carrossel.offsetWidth

    /* 
        No final a função está fazendo a distância do scroll aumentar exatamente
        o valor da largura visível do carrossel
    */
}

function avancar(categoria) {
    let carrossel = document.getElementById(categoria)
    carrossel.scrollLeft += carrossel.offsetWidth
}


async function chamarFuncoes() {
    await mostrarCarrossel("popular")
    await mostrarCarrossel("top_rated")
    await mostrarCarrossel("upcoming")
    await mostarSessaoAleatoria()
}

chamarFuncoes()