let pageActuelle = 1;

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('search');
    const loadMoreButton = document.getElementById('loadMoreButton');

    // Empêche la soumission du formulaire et le rechargement de la page
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
    });

    // Recherche en temps réel
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.trim();
        if (query) {
            pageActuelle = 1; // Réinitialiser la page actuelle
            fetchMovies(query);
        } else {
            clearResults();
        }
    });

    // Si une recherche est déjà présente dans l'URL, effectuez la recherche automatiquement
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (query) {
        searchInput.value = query;
        fetchMovies(query);
    }

    // Gérer le clic du bouton "afficher plus"
    loadMoreButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            fetchMovies(query, pageActuelle);
        }
    });
});

async function fetchMovies(query, page = 1) {
    const apiKey = '3866e5f2';
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`;

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
    if (pageActuelle === 1) {
        filmContainer.innerHTML = '';  }

    movies.forEach(movie => {
    

        const filmCard = document.createElement('div');
        filmCard.classList.add('film_card');
        filmCard.setAttribute('data-id', movie.imdbID);

        const filmImg = document.createElement('img');
        filmImg.src = movie.Poster;
        filmImg.alt = movie.Title;
        filmImg.classList.add('film_img');

        const filmInfo = document.createElement('div');
        filmInfo.classList.add('film_info');
        filmInfo.textContent = movie.Title;

        filmCard.appendChild(filmImg);
        filmCard.appendChild(filmInfo);
        if (movie.Type === 'movie' && movie.Poster !== 'N/A') {
            filmContainer.appendChild(filmCard);
        }
        
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
    });
}

function clearResults() {
    const filmContainer = document.getElementById('filmContainer');
    filmContainer.innerHTML = ''; 
}
