//Fonction qui gère le header commun.

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

async function load_footer() {
    const footer = document.getElementById('footer');
    try {
        const response = await fetch('components/footer.html');
        const data = await response.text();
        footer.innerHTML = data;
    } catch (error) {
        console.error('Erreur lors de la récupération du footer:', error);
    }
}

function extend_seatch_bar() {
    const searchButton = document.querySelector('.loupe_search');
    const searchInput = document.querySelector('.search_bar');
    searchButton.addEventListener('click', function() {
        searchInput.classList.toggle('search_bar_active');

    });
    if (window.location.pathname.includes('search')) {
    searchInput.classList.add('search_bar_active');
}
}


extend_seatch_bar();



load_header();

load_footer();

