console.log(document.referrer);

const parms = new URLSearchParams(window.location.search);
const nom = parms.get('nom');
const prix = parms.get('prix');
const url_image = parms.get('url_image');

container_prod = document.getElementById('container_produit');
container_prod.innerHTML = `
        <img src="${url_image}" alt="Image du produit" id="url_image">
        <h2 id="nom">${nom}</h2>
        <p id="prix">${prix}</p> `;

prix_unitaire = document.getElementById('total_produit');
prix_total = document.getElementById('total_payer');
prix_unitaire.innerText = prix.match(/\d+/g);
prix_total.innerText = prix.match(/\d+/g);