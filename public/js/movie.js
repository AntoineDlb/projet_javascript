
const apiKey = '3866e5f2';

let url = new URL(window.location.href);
let Movie = url.searchParams.get("i");


async function fetchMovie() {
    const apiUrl = `https://www.omdbapi.com/?i=${Movie}&plot=full&apikey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.Response === 'True') {
            displayMovie(data);
        } else {
            console.error('Erreur lors de la récupération des films:', data.Error);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
    }
}

function displayMovie(Movie) {
    const filmContainer = document.querySelector('.film_container');

    const filmPoster = document.createElement('div');
    filmPoster.classList.add('poster');
    
    const filmImg = document.createElement('img');
    filmImg.src = Movie.Poster;
    filmImg.alt = Movie.title;
    filmImg.classList.add('film_img');

    const desc = document.createElement('div');
    desc.classList.add('desc');
    desc.textContent = `${Movie.Title} - ${Movie.Genre}`;
    
    const score = document.createElement('div');
    score.textContent =  `${Movie.imdbRating} / 10`;
    desc.appendChild(score) ;

    const actor = document.createElement('div');
    actor.textContent = Movie.Actors;

    const plot = document.createElement('div');
    plot.textContent= Movie.Plot;
    
    filmContainer.appendChild(filmPoster);
    filmPoster.appendChild(filmImg);
    filmContainer.appendChild(desc);
    filmContainer.appendChild(actor);
    filmContainer.appendChild(plot);
}


fetchMovie();
