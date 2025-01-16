// affichage des films tendances grace a l'API

const apiKey = '3866e5f2';
let pageActuelle = 1;

async function fetchTrendingMovies() {
    const requete = '2024'; // Requête de recherche pour les films tendances
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=movie&y=${requete}&page=${pageActuelle}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.Response === 'True') {
            console.log('Films récupérés:', data.Search); // Ajout d'un log pour vérifier les données récupérées
            displayMovies(data.Search);
            pageActuelle++; // Incrémentez la page pour la prochaine requête
        } else {
            console.error('Erreur lors de la récupération des films:', data.Error);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
    }
}

function displayMovies(movies) {
    const filmContainer = document.querySelector('.film_container');
    // filmContainer.innerHTML = ''; // Commented out to prevent clearing the container

    movies.forEach(movie => {
        if (movie.Poster === 'N/A') {
            return; // Ne pas afficher les films sans affiche
        }

        const filmCard = document.createElement('div');
        filmCard.classList.add('film_card');

        const filmImg = document.createElement('img');
        filmImg.src = movie.Poster;
        filmImg.alt = movie.Title;
        filmImg.classList.add('film_img');

        const filmInfo = document.createElement('div');
        filmInfo.classList.add('film_info');
        filmInfo.textContent = movie.Title;

        filmCard.appendChild(filmImg);
        filmCard.appendChild(filmInfo);
        if (movie.Type === 'movie'){
            filmContainer.appendChild(filmCard);
        }
    });
}

function fetchNewMovies() {
    const bouton_fetch = document.querySelector('.search_button');
    bouton_fetch.addEventListener('click', fetchTrendingMovies);
}

async function load_header() {
    const header = document.getElementById('header');
    try {
        const reponse = await fetch('components/header.html');
        const data = await reponse.text();
        header.innerHTML = data;
    } catch (error) {
        console.error('Erreur lors de la récupération du header:', error);
    }

}

// function click_filmCard() {
//     const filmCards = document.querySelectorAll('.film_card');
//     filmCards.forEach(filmCard => {
//         filmCard.addEventListener('click', () => {
//             /* a compléter */

//         });
//     });
// }

load_header();

// Initialize the event listener for the button
fetchNewMovies();

// Optionally, fetch trending movies on page load
fetchTrendingMovies();
