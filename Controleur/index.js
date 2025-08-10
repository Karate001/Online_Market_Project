//Déclaration des variables qui stockeront les produits
let div_produit= document.getElementById("produits")
if(div_produit){
var table_produits_dom= Array.from(div_produit.children)


//Déclaration de la page acceuil
const page_acceuil= document.title;
if (page_acceuil=="UTOPIA MARKET") {

   /*
    //Méthode pour supprimer un produit
    fetch("http://localhost:8080/info_produit/produits/36",{
          method:"DELETE"  
        }
    ).then(res=>{
        if (res.ok) {
            console.log("Produit supprimé avec succèqs")
        }else{console.log("une erreur est survenue lors de la suppression")}
    }).catch(error=>{console.error(error)} )
    */
    

//Méthode qui recupère tous le tableau des produits
document.addEventListener('DOMContentLoaded',    
    fetch("http://apiprojete-commerce-env.eba-7hmxxccm.eu-north-1.elasticbeanstalk.com/info_produit/produits")
    .then(response =>{ 
            if (!response.ok) {
               throw new console.error();
            }
        return response.json()
    })
    .then(produits=>{
        const table_produits= Object.values(produits)
        const nbr_prod= table_produits.length

        
        
        for (let index = nbr_prod-1; index >= 0; index--) {
            
                const prod_aleatoire = Math.floor(Math.random()*(index+1));                          
                [table_produits[index],table_produits[prod_aleatoire]]=[table_produits[prod_aleatoire],table_produits[index]];
                    
            
        }

        const nbr_prod_final = Math.min(table_produits_dom.length,nbr_prod)
        for(let i = 0;i<nbr_prod_final; i++){
            const prod_individuel=table_produits_dom[i] 
            
                img_prod= prod_individuel.querySelector("img")               
                nom_prod= prod_individuel.querySelector("h1") 
                prix_prod= prod_individuel.querySelector("p");

                

                img_prod.src =table_produits[i].url_image
                nom_prod.innerText =table_produits[i].nom_produit
                prix_prod.innerText= "Prix: "+table_produits[i].prix_produit+"$";
                
        }

    })
   
    );

    table_produits_dom.forEach(produit => {
        const img_produit=produit.querySelectorAll('img')
        btn_add_to_cart=produit.querySelectorAll('button')
        
        img_produit.forEach(img => {
            img.addEventListener("click",vers_info_prod)
        });   
        
        btn_add_to_cart.forEach(btn => {
            btn.addEventListener("click",ajout_prod_panier)
        });   
    });

}

}
 
 /*Quand on clique sur un produit page qui contient tous le les info 
                sur un produit et le bouton commander*/
function vers_info_prod(event) {
    
    prod= event.target.parentElement;
    img_prod= prod.querySelector("img")
    nom_prod= prod.querySelector("h1")
    prix_prod= prod.querySelector("p");

    window.location.href= `page_info_produit.html?nom=${nom_prod.innerText}&prix=${prix_prod.innerText}&url_image=${img_prod.src}`;

}

//Ajout du produit au panier
let panier=[];
let compteur_panier=0;
element_compteur = document.querySelector('.cart-shopping i');
container_panier= document.querySelector('#container_panier ul');

function ajout_prod_panier(event){
    event.preventDefault()
    prod= event.target.parentElement.closest("#prod");
    
    img_prod=prod.querySelector('img').src;
    nom_prod=prod.querySelector('h1').innerText;
    prix_prod=prod.querySelector('p').innerText;
    
    for (let i = 0; i < panier.length; i++) {
        const element = panier[i];
        if (img_prod==panier[i].querySelector('img').src) {
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
        
    panier.push(prod_li);

    container_panier.appendChild(prod_li);
    compteur_panier++;
    element_compteur.setAttribute("data-compteur",compteur_panier);
    localStorage.setItem("panier", JSON.stringify(panier));
    localStorage.setItem("compteur_panier",compteur_panier);

    //Gérer la suppression de produit du panier
    btn_delete_prod= prod_li.querySelector('#delete_prod_button');
    btn_delete_prod.addEventListener('click',effacer_prod_panier);

     //Le bouton commander
        creer_btn_commander_consulter();

}

//fonction qui affiche le panier ou le rend invisible
const icone_panier= document.querySelector('.cart-shopping');
const element_panier= document.querySelector('#container_panier');
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
    event.preventDefault;
    prod_a_supprimer= event.target.closest("li");
    container_panier.removeChild(prod_a_supprimer);
    panier.pop(prod_a_supprimer);
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
                element_panier.appendChild(btn_commander);   
            }
            if (document.getElementById('btn_consulter_prod')){
                element_panier.removeChild(document.getElementById('btn_consulter_prod'))
            }
        }
}

//La fonction qui gère le champs de recherche
search_bar = document.getElementById('search_bar');
container_prod_cherche=document.getElementById('container_prod_cherche');
search_bar.addEventListener('input',filtre_list_produit)
function filtre_list_produit() {
    load_prod(container_prod_cherche);
    fetch("http://apiprojete-commerce-env.eba-7hmxxccm.eu-north-1.elasticbeanstalk.com/info_produit/produits")
    .then(response =>{ 
        if (!response.ok) {
           throw new console.error();
        }
        return response.json()
    })
    .then(produits=>{
        document.getElementById('loader').style.display='none';
        if (search_bar.values!=='') {
            const prod_cherche=produits.filter(nom_cherche=>{
                mot_saisi= search_bar.value.toLowerCase();
                return nom_cherche.nom_produit.toLowerCase().includes(mot_saisi.toLowerCase())
            });
            list_prod_filtre= document.createElement('ul');
            container_prod_cherche.appendChild(list_prod_filtre);
            nom_prods= prod_cherche.map(p=>{
                prod_filtre=`<li>
                                <img src="${p.url_image}" alt="">
                                <h1>${p.nom_produit}  </h1><h2><br>${p.prix_produit}$</h2>
                                <i class="fa fa-plus" style="color:#ffff;" aria-hidden="true"></i>
                            </li>`;
                            
                list_prod_filtre.innerHTML += prod_filtre;                
            });
            list_prod_filtre.querySelectorAll('li').forEach(e => {
                e.addEventListener('click',()=>{
                    window.location.href= `page_info_produit.html?nom=${e.querySelector('h1').innerText}&prix=${e.querySelector('h2').innerText}&url_image=${e.querySelector('img').src}`;

                })
            });
        }
    })
}
search_bar.addEventListener('click',afficher_conteneur_recherche)
//Fonction qui montre le chargement(loader)
function load_prod(container_prod_cherche){
    loader=`<div id="loader" class="spinner"></div>`;
    container_prod_cherche.innerHTML=loader;    
}

//Méthode qui affiche et supprime le contenreur des recherches
function afficher_conteneur_recherche() {
    if (container_prod_cherche.style.display=='block') {
        container_prod_cherche.style.display='none';
    }else{
        container_prod_cherche.style.display='block';        
    }
} 
//Méthode qui permet de mener vers la page info produit en cliquant sur le produit 
//dans la barre de recherche et ajouter au panier en cliquant sur +


    //Méthode qui ajoute un produit
/*
fetch("http://localhost:8080/info_produit/produits", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        nom_produit: "Verre à dégustation (Model:EJ5202)",
        quantite_produit: "494",
        prix_produit:"40.00",
        url_image:"images/images_produits/verre_a_degustation_modele_EJ5201.jpg"
    })
    })
.then(response => response.json())
.then(data => console.log("Produit ajouté :", data))
.catch(error => console.error("Erreur :", error))
*/
