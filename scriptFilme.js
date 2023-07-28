const API_KEY = 'api_key=b4b5f9d98442f11bbdd50a5adf70f1d1';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const language = 'language=pt-BR';
const homeFilme = document.getElementById("homeFilme")

let idRecebido = JSON.parse(localStorage.getItem("filme_id"))
console.log(idRecebido)


async function captarFilme() {
    try {
        let resposta = await fetch(`${BASE_URL}/movie/${idRecebido}?${API_KEY}&${language}`)
        let filme = await resposta.json()

        return filme
    } catch (err) {
        console.log(err)
    }
}


async function mostrarFilmeSelecionado() {

 
    let filme = await captarFilme()

    let avaliacao = Math.floor(filme.vote_average * 10)
    let media = avaliacao >= 70 ? "bom" : avaliacao >= 50 ? "medio" : "ruim"

    homeFilme.innerHTML = `
        <div>
            <h2>${filme.title}</h2>
            <span>Generos: ${filme.genres.map(genero => genero.name)}</span>
            <p class="${media}">${avaliacao}% gostaram</p>
            <p>${filme.overview}</p>

        </div>
        <img  class="imagemSection" src=${IMG_URL + filme.backdrop_path} />
    `
}


captarFilme()
mostrarFilmeSelecionado()