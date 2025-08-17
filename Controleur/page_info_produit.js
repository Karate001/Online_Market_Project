const params = new URLSearchParams(window.location.search);
document.getElementById('nom').innerText = params.get('nom');
document.getElementById('prix').innerText = params.get('prix');
document.getElementById('url_image').src = params.get('url_image');

document.getElementById('btn_commander2').addEventListener('click',commander)
function commander() {
    window.location.href = `enregistrer_info_client.html?nom=${document.getElementById('nom').innerText}&prix=${document.getElementById('prix').innerText}&url_image=${document.getElementById('url_image').src}`;
}   


//Méthode qui charge les éléments du panier
let panier = JSON.parse(localStorage.getItem('panier')) || [];
element_compteur = document.querySelector('.cart-shopping i');
let compteur_panier=0;
document.addEventListener('DOMContentLoaded',charger_panier);
function charger_panier() {
    if (panier.length === 0) {
        document.querySelector('#container_panier ul').innerHTML = '<li>Votre panier est vide</li>';
        return;
    }else {
        panier.forEach(prod => {
            prod_li= document.createElement('li');
            prod_li.innerHTML += `
                    <img src="${prod.img_url}" alt="">
                    <p>${prod.nom}  <br> ${prod.prix}</p>
                    <div><button style="color:rgb(134, 134, 201);"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
                    <span>1</span>
                    <button style="color:rgb(134, 134, 201);"><i class="fa fa-chevron-right" aria-hidden="true"></i></button></div>
                    <button id="delete_prod_button"><i class="fa fa-trash" aria-hidden="true"></i></button>
                `;
             document.querySelector('#container_panier ul').appendChild(prod_li);
             //Gérer la suppression de produit du panier
            btn_delete_prod= prod_li.querySelector('#delete_prod_button');
            btn_delete_prod.addEventListener('click',effacer_prod_panier );

            compteur_panier++;
            element_compteur.setAttribute("data-compteur",compteur_panier);
        });        
        
        //Le bouton commander
        creer_btn_commander_consulter();

    }  
}

//Méthode qui ajoute un produit au panier
document.querySelector('#btn_ajouter_panier').addEventListener('click', ajout_prod_panier);
function ajout_prod_panier(event){
    event.preventDefault()
    prod= event.target.parentElement.closest("#prod");
    
    img_prod=prod.querySelector('img').src;
    nom_prod=prod.querySelector('h1').innerText;
    prix_prod=prod.querySelector('p').innerText;
    
    for (let i = 0; i < panier.length; i++) {
        const element = panier[i];
        if (nom_prod==panier[i].nom) {
            return;
        }   
    }
    container_panier= document.querySelector('#container_panier ul');
    prod_li= document.createElement('li');
    
    
    prod_li.innerHTML +=`<img src="${img_prod}" alt="">
                         <p>${nom_prod}  <br> ${prix_prod}</p>
                         <div><button style="color:rgb(134, 134, 201);"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
                            <span>1</span>
                            <button style="color:rgb(134, 134, 201);"><i class="fa fa-chevron-right" aria-hidden="true"></i></button></div>
                         <button id="delete_prod_button"><i class="fa fa-trash" aria-hidden="true"></i></button>`;
        
    
    prod_ajouter= {
        nom: nom_prod,img_url: img_prod,prix: prix_prod
    };
    panier.push(prod_ajouter);
    localStorage.setItem('panier', JSON.stringify(panier));

    container_panier.appendChild(prod_li);
    compteur_panier++;
    element_compteur.setAttribute("data-compteur",compteur_panier);
    

    //Gérer la suppression de produit du panier
    btn_delete_prod= prod_li.querySelector('#delete_prod_button');
    btn_delete_prod.addEventListener('click',effacer_prod_panier);

     //Le bouton commander
        creer_btn_commander_consulter();

}

//fonction qui affiche le panier ou le rend invisible
const icone_panier= document.querySelector('.cart-shopping');
 element_panier= document.querySelector('#container_panier');
icone_panier.addEventListener('click',afficher_panier)
function afficher_panier(){
    if (element_panier.style.display!="block"&&element_panier.style.visibility!="visible") {
        element_panier.style.display="block";
        element_panier.style.visibility="visible";
        //Le bouton commander
        creer_btn_commander_consulter();
    }else{
        element_panier.style.display="none";
        element_panier.style.visibility="hidden";
    }
}

//Fonction pour suppprimer produit
function effacer_prod_panier(event) {
    event.preventDefault();
    prod_a_supprimer= event.target.closest("li");
    for (let i = 0; i < panier.length; i++) {
        const element = panier[i];
        if (prod_a_supprimer.querySelector("img").src==element.img_url) {
            panier.splice(i, 1);
            localStorage.setItem('panier', JSON.stringify(panier));
            break;
        }   
    }
    document.querySelector('#container_panier ul').removeChild(prod_a_supprimer);
    compteur_panier--;
    element_compteur.setAttribute("data-compteur",compteur_panier);

     //Le bouton commander
    creer_btn_commander_consulter();
}

//Fonction qui gére les boutons commander et consulter nos produits
function creer_btn_commander_consulter(){
        if (panier.length===0) {
            if (!document.getElementById('btn_consulter_prod')) {
                btn_consulter_prod= document.createElement("button");
                btn_consulter_prod.setAttribute('id','btn_consulter_prod');
                btn_consulter_prod.innerHTML=`<a href="#produits">Consultez nos produits</a>`;
                element_panier.appendChild(btn_consulter_prod);                
            }            
            if (document.getElementById('btn_commander')) {
                element_panier.removeChild(document.getElementById('btn_commander'))
            }
        }if (panier.length>0) {
            if (!document.getElementById('btn_commander')) {
                btn_commander= document.createElement('button');
                btn_commander.setAttribute('id','btn_commander');
                btn_commander.innerText="Commander";
                element_panier.appendChild(btn_commander);  console.log('btn_commander créé');
            }
            if (document.getElementById('btn_consulter_prod')){
                element_panier.removeChild(document.getElementById('btn_consulter_prod'))
            }
        }
}

