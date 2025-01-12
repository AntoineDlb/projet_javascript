// affichage des films tendances grace a l'API

const apiKey = '3866e5f2';
const searchQuery = 'batman'; // Requête de recherche pour les films tendances
const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`;

async function fetchTrendingMovies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            console.error('Erreur lors de la récupération des films:', data.Error);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
    }
}

function displayMovies(movies) {
    const filmContainer = document.querySelector('.film_container');
    filmContainer.innerHTML = '';

    movies.forEach(movie => {
        const filmCard = document.createElement('div');
        filmCard.classList.add('film_card');

        const filmImg = document.createElement('img');
        filmImg.src = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg';
        filmImg.alt = movie.Title;
        filmImg.classList.add('film_img');

        const filmInfo = document.createElement('div');
        filmInfo.classList.add('film_info');
        filmInfo.textContent = movie.Title;

        filmCard.appendChild(filmImg);
        filmCard.appendChild(filmInfo);
        if (movie.Type === 'movie') {
            filmContainer.appendChild(filmCard);
        }
    });
}
fetchTrendingMovies();
