let pageActuelle = 1;
let searchTimeout;

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('search');
    const loadMoreButton = document.getElementById('loadMoreButton');


    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
    });

    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = searchInput.value.trim();
        if (query.length >= 3) {
            searchTimeout = setTimeout(() => {
                pageActuelle = 1; 
                fetchMovies(query);
            }, 300); 
        } else {
            clearResults();
        }
    });

 
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (query) {
        searchInput.value = query;
        fetchMovies(query);
    }

    loadMoreButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query.length >= 3) {
            fetchMovies(query, pageActuelle);
        }
    });
});

<<<<<<< Updated upstream
async function fetchMovies(query) {
    const apiKey = '3866e5f2'; // Remplacez par votre clé API
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
=======
async function fetchMovies(query, page = 1) {
    const apiKey = '3866e5f2';
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`;
>>>>>>> Stashed changes

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.Response === 'True') {
            displayMovies(data.Search);
            pageActuelle++; 
        } else {
            console.error('Erreur lors de la récupération des films:', data.Error);
            clearResults();
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
        clearResults();
    }
}

function displayMovies(movies) {
    const filmContainer = document.getElementById('filmContainer');
<<<<<<< Updated upstream
    filmContainer.innerHTML = ''; // Clear existing content
=======
    if (pageActuelle === 1) {
        filmContainer.innerHTML = '';
    }
>>>>>>> Stashed changes

    movies.forEach(movie => {
        const filmCard = document.createElement('div');
        filmCard.classList.add('film_card');
<<<<<<< Updated upstream
=======
        filmCard.setAttribute('data-id', movie.imdbID);
>>>>>>> Stashed changes

        const filmImg = document.createElement('img');
        filmImg.src = movie.Poster;
        filmImg.alt = movie.Title;
        filmImg.classList.add('film_img');

        const filmInfo = document.createElement('div');
        filmInfo.classList.add('film_info');
        filmInfo.textContent = movie.Title;

        filmCard.appendChild(filmImg);
        filmCard.appendChild(filmInfo);
<<<<<<< Updated upstream
        if (movie.Type === 'movie' && movie.Poster !== 'N/A') {
            filmContainer.appendChild(filmCard);
        }
=======
        filmContainer.appendChild(filmCard);
    });

    click_filmCard();
}

function click_filmCard() {
    const filmCards = document.querySelectorAll('.film_card');
    filmCards.forEach(filmCard => {
        filmCard.addEventListener('click', () => {
            const MovieId = filmCard.getAttribute('data-id');
            window.location.href = `movie.html?i=${MovieId}`;
        });
>>>>>>> Stashed changes
    });
}

function clearResults() {
    const filmContainer = document.getElementById('filmContainer');
    filmContainer.innerHTML = ''; // Clear existing content
}
<<<<<<< Updated upstream

function extend_seatch_bar() {
    const searchButton = document.querySelector('.loupe_search');
    const searchInput = document.querySelector('.search_bar');
    searchInput.classList.toggle('search_bar_active');
    searchButton.addEventListener('click', function() {
        searchInput.classList.toggle('search_bar_active');
    });
}

extend_seatch_bar();

=======
>>>>>>> Stashed changes
