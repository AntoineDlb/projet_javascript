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

document.addEventListener('DOMContentLoaded', function() {
    const filtersButton = document.querySelector('.filters img');
    const filtersList = document.querySelectorAll('.filters_list');

    filtersButton.addEventListener('click', function() {
        filtersList.forEach(filter => {
            filter.classList.toggle('filters_liste_active');
        });
    });
});

load_header();
