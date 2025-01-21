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
            displayMovies(data.Search);
            pageActuelle++;
        } else {
            console.error('Erreur lors de la récupération des films:', data.Error);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
    }
}

function displayMovies(movies) {
    const filmContainer = document.querySelector('.film_container');
    // filmContainer.innerHTML = ''; 
    movies.forEach(movie => {
        if (movie.Poster === 'N/A') {
            return; // Ne pas afficher les films sans affiche
        }

        const filmCard = document.createElement('div');
        filmCard.classList.add('film_card');
        filmCard.setAttribute('data-id',movie.imdbID);

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

    click_filmCard()

}

function fetchNewMovies() {
    const bouton_fetch = document.querySelector('.bouton');
    bouton_fetch.addEventListener('click', fetchTrendingMovies);
}


function extend_seatch_bar() {
    const searchButton = document.querySelector('.loupe_search');
    const searchInput = document.querySelector('.search_bar');
    searchButton.addEventListener('click', function() {
        searchInput.classList.toggle('search_bar_active');
    });
}

function click_filmCard() {
    const filmCards = document.querySelectorAll('.film_card');
    filmCards.forEach(filmCard => {
        filmCard.addEventListener('click', () => {
            const MovieId = filmCard.getAttribute('data-id');
            window.location.href=`movie.html?i=${MovieId}`;
        });
    });
}

extend_seatch_bar();

// Initialize the event listener for the button
fetchNewMovies();

// Optionally, fetch trending movies on page load
fetchTrendingMovies();
