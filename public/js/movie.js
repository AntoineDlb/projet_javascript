
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
    score.classList.add('score');
    score.textContent =  `${Movie.imdbRating} / 10`;
    desc.appendChild(score) ;

    const actor = document.createElement('div');
    const p_actor = document.createElement('p');
    actor.classList.add('actor');
    p_actor.textContent = Movie.Actors;
    actor.appendChild(p_actor);

    const plot = document.createElement('div');
    const p_plot = document.createElement('p');
    const h3 = document.createElement('h3');
    h3.textContent = 'about the movie';
    plot.classList.add('plot');
    p_plot.textContent= Movie.Plot;
    plot.appendChild(h3);
    plot.appendChild(p_plot);
    
    filmContainer.appendChild(filmPoster);
    filmPoster.appendChild(filmImg);
    filmContainer.appendChild(desc);
    filmContainer.appendChild(plot);
    filmContainer.appendChild(actor);
}


fetchMovie();
