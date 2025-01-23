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
    
    movies.forEach(movie => {
        if (movie.Poster === 'N/A') {
            return;
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



function click_filmCard() {
    const filmCards = document.querySelectorAll('.film_card');
    filmCards.forEach(filmCard => {
        filmCard.addEventListener('click', () => {
            const MovieId = filmCard.getAttribute('data-id');
            window.location.href=`movie.html?i=${MovieId}`;
        });
    });
}


fetchNewMovies();


fetchTrendingMovies();
