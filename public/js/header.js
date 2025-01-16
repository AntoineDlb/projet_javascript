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

load_header();