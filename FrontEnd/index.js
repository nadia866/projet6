// Récupération des travaux depuis l'API et conversion en JSON
let works = await fetch('http://localhost:5678/api/works').then(works => works.json());

// Fonction de génération de la galerie de projets
function generateGallery(works){
    // Parcours de chaque travail dans la liste
    for (let i = 0; i < works.length ; i++){
        const loop = works[i]; // Récupération du travail actuel dans la boucle
        const divGallery = document.querySelector(".gallery"); // Sélection de l'élément parent de la galerie
        const workElement = document.createElement("figure"); // Création d'un élément figure pour chaque travail
        const imgElement = document.createElement("img"); // Création d'un élément img pour afficher l'image du travail
        imgElement.src = loop.imageUrl; // Définition de l'URL de l'image
        imgElement.alt = loop.title; // Définition du texte alternatif de l'image
        const captionElement = document.createElement("figcaption"); // Création d'un élément figcaption pour afficher le titre du travail
        captionElement.innerText = loop.title; // Définition du texte du titre du travail

        // Ajout des éléments créés à l'élément parent de la galerie
        divGallery.appendChild(workElement);
        workElement.appendChild(imgElement);
        workElement.appendChild(captionElement);
    }
}

// Génération de la galerie de projets à l'ouverture de la page
generateGallery(works);

// Fonction de génération de la galerie en mode édition
function generateGalleryEditor(works){
    const divGallery = document.querySelector(".modale_gallery"); // Sélection de l'élément parent de la galerie en mode édition
    divGallery.innerText = ""; // Effacement du contenu précédent de la galerie en mode édition
    // Parcours de chaque travail dans la liste
    for (let i = 0; i < works.length ; i++){
        const loop = works[i]; // Récupération du travail actuel dans la boucle
        const workElement = document.createElement("figure"); // Création d'un élément figure pour chaque travail
        const imgElement = document.createElement("img"); // Création d'un élément img pour afficher l'image du travail
        imgElement.src = loop.imageUrl; // Définition de l'URL de l'image
        imgElement.alt = loop.title; // Définition du texte alternatif de l'image
        const captionElement = document.createElement("figcaption"); // Création d'un élément figcaption pour afficher le titre du travail
        captionElement.innerText = "éditer"; // Texte alternatif pour l'édition du travail
        const deleteElement = document.createElement("button"); // Création d'un bouton pour supprimer le travail
        deleteElement.className = "btn_delete"; // Attribution d'une classe au bouton de suppression
        deleteElement.id = `delete_${loop.id}`; // Attribution d'un ID unique au bouton de suppression
        const logoDelete = document.createElement("i"); // Création d'une icône pour le bouton de suppression
        logoDelete.className = "fa-solid fa-trash"; // Attribution de classes à l'icône de suppression
        // Ajout des éléments créés à l'élément parent de la galerie en mode édition
        divGallery.appendChild(workElement);
        workElement.appendChild(imgElement);
        workElement.appendChild(captionElement);
        workElement.appendChild(deleteElement);
        deleteElement.appendChild(logoDelete);
    };
};

// Filtres

// Bouton Tous
const boutonTous = document.querySelector(".btn-tous");
boutonTous.addEventListener("click", function() {
    // Efface le contenu précédent de la galerie
    document.querySelector(".gallery").innerText = "";
    // Génère la galerie complète
    generateGallery(works);
    // Désactive la classe "active" de tous les boutons de filtre
    document.querySelectorAll("#filtres button").forEach(function(btn) {
        btn.classList.remove("active");
    });
    // Active le bouton "Tous"
    boutonTous.classList.add("active");
});

// Bouton Objets
const boutonObjets = document.querySelector(".btn-objets");
boutonObjets.addEventListener("click", function() {
    // Filtre les travaux par catégorie "Objets"
    const worksObjets = works.filter(function(works) {
        return works.category.id === 1;
    });
    // Efface le contenu précédent de la galerie
    document.querySelector(".gallery").innerText = "";
    // Génère la galerie filtrée par catégorie "Objets"
    generateGallery(worksObjets);
    // Désactive la classe "active" de tous les boutons de filtre
    document.querySelectorAll("#filtres button").forEach(function(btn) {
        btn.classList.remove("active");
    });
    // Active le bouton "Objets"
    boutonObjets.classList.add("active");
});

// Bouton Appartements
const boutonAppartements = document.querySelector(".btn-appartements");
boutonAppartements.addEventListener("click", function() {
    // Filtre les travaux par catégorie "Appartements"
    const worksAppartements = works.filter(function(works) {
        return works.category.id === 2;
    });
    // Efface le contenu précédent de la galerie
    document.querySelector(".gallery").innerText = "";
    // Génère la galerie filtrée par catégorie "Appartements"
    generateGallery(worksAppartements);
    // Désactive la classe "active" de tous les boutons de filtre
    document.querySelectorAll("#filtres button").forEach(function(btn) {
        btn.classList.remove("active");
    });
    // Active le bouton "Appartements"
    boutonAppartements.classList.add("active");
});

// Bouton Hôtels & restaurants
const boutonHotels = document.querySelector(".btn-hotels-restaurants");
boutonHotels.addEventListener("click", function() {
    // Filtre les travaux par catégorie "Hôtels & restaurants"
    const worksHotels = works.filter(function(works) {
        return works.category.id === 3;
    });
    // Efface le contenu précédent de la galerie
    document.querySelector(".gallery").innerText = "";
    // Génère la galerie filtrée par catégorie "Hôtels & restaurants"
    generateGallery(worksHotels);
    // Désactive la classe "active" de tous les boutons de filtre
    document.querySelectorAll("#filtres button").forEach(function(btn) {
        btn.classList.remove("active");
    });
    // Active le bouton "Hôtels & restaurants"
    boutonHotels.classList.add("active");
});

// Affichage du mode éditeur
if (window.sessionStorage.getItem("token") !== null) {
  // Changement du bouton "login" en "logout"
  const loginHeader = document.querySelector("#loginHeader");
  loginHeader.innerText = "logout"
  loginHeader.addEventListener("click", function(event) {
      // Empêche le comportement par défaut du lien
      event.preventDefault();
      // Supprime le token de la session et redirige vers la page d'accueil
      window.sessionStorage.removeItem("token");
      window.location.replace("./index.html");
  })

  // Création du bandeau d'édition en haut de la page
  const bandeau = document.querySelector(".bandeau");
  const zoneEdition = document.createElement("div");
  zoneEdition.className = "editor";
  const logoEdition = document.createElement("i");
  logoEdition.className = "fa-regular fa-pen-to-square";
  const modeEdition = document.createElement("p");
  modeEdition.innerText = "Mode Édition";
  const boutonPublier = document.createElement("button");
  boutonPublier.innerText = "publier les changements";
  bandeau.appendChild(zoneEdition);
  zoneEdition.appendChild(logoEdition);
  zoneEdition.appendChild(modeEdition);
  zoneEdition.appendChild(boutonPublier);

  // Création du bouton modifier de la galerie
  const modGalerie = document.querySelector("#mod_gallery");
  const logoModGalerie = document.createElement("i");
  logoModGalerie.className = "fa-regular fa-pen-to-square";
  const pGalerie = document.createElement("p");
  pGalerie.innerText = "modifier";
  const boutonModGalerie = document.createElement("button");
  boutonModGalerie.className = "btn-gallery"
  boutonModGalerie.appendChild(logoModGalerie);
  boutonModGalerie.appendChild(pGalerie);
  modGalerie.appendChild(boutonModGalerie);

  // Masquage des filtres
  const hidingFilters = document.querySelector("#filtres");
  hidingFilters.setAttribute("style", "visibility: hidden");

  // Bouton d'ouverture de la modale
  boutonModGalerie.addEventListener("click", function (event) {
      // Empêche le comportement par défaut du lien
      event.preventDefault();
      // Affiche la modale de modification
      const target = document.querySelector("#modale1")
      target.style.display = null
  });

  // Génération de la galerie en mode édition
  generateGalleryEditor(works);
  deleteWork();

  // Boutons d'ajout de photo dans la galerie
  const addPhoto = document.querySelector("#add_photo");
  addPhoto.addEventListener("click", function(event){
      // Empêche le comportement par défaut du lien
      event.preventDefault();
      // Affiche la modale d'ajout de photo
      const modale2 = document.querySelector("#modale2");
      modale2.style.display = null;
      const modale1 = document.querySelector("#modale1");
      modale1.style.display = "none"
  })

  // Affichage modale d'ajout de photo
  const retour = document.querySelector("#retour");
  retour.addEventListener("click", function(event){
      // Empêche le comportement par défaut du lien
      event.preventDefault();
      // Cache la modale d'ajout de photo et réinitialise les champs
      const modale2 = document.querySelector("#modale2");
      modale2.style.display = "none";
      const modale1 = document.querySelector("#modale1");
      modale1.style.display = null;
      photo_form.value = "";
      const cache = document.querySelector("#apercuPhotoDiv");
      cache.setAttribute("style", "display: none");
      titre_form.value = "";
  });

  // Aperçu photo
  const preview = document.querySelector("#photo_form");
  preview.addEventListener("change", function(e){
      // Vérifie si un fichier a été sélectionné et s'il respecte la limite de taille
      if(e.target.files.length == 0 || e.target.files[0].size > 4194304){
          return;
      }
      // Affiche l'aperçu de la photo
      let file = e.target.files[0];
      let url = URL.createObjectURL(file);
      document.querySelector("#apercuPhoto").src = url;
      const cache = document.querySelector("#apercuPhotoDiv");
      cache.style.display = null;
  });

  // Bouton Ajouter photo (new FormData)
  document.querySelector("#form_photo").addEventListener("submit", async function(e){
      // Empêche le comportement par défaut du formulaire
      e.preventDefault();
      // Crée un formulaire FormData avec les informations de la photo
      let infosPhoto = new FormData();
      infosPhoto.append('image', photo_form.files[0]);
      infosPhoto.append('title', titre_form.value);
      infosPhoto.append('category', categorie_form.value);
      const token = window.sessionStorage.getItem("token");
      // Options de la requête POST
      const options = {
          method: 'POST',
          body: infosPhoto,
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
          }
        };
        // Supprime l'en-tête 'Content-Type'
        delete options.headers['Content-Type'];
        // Envoie la requête au serveur
        await fetch('http://localhost:5678/api/works', options);
        // Réinitialise les champs et cache l'aperçu de la photo
        titre_form.value = ""
        const cache = document.querySelector("#apercuPhotoDiv");
        cache.setAttribute("style", "display: none");
        const cache2 = document.querySelector("#apercuPhoto");
        cache2.src = "";
        const target = document.querySelector("#modale2");
        target.style.display = "none";
        // Réactualise la galerie principale et la galerie en mode édition
        const target2 = document.querySelector(".gallery")
        target2.innerText = "";
        works = await fetch('http://localhost:5678/api/works').then(works => works.json());
        generateGallery(works);
        const target3 = document.querySelector(".modale_gallery");
        target3.innerText = "";
        generateGalleryEditor(works);
        deleteWork();
  });

  // Supprimer photo
  function resetDeleteListeners() {
      const deleteButtons = document.getElementsByClassName("btn_delete");
      for (let i = 0; i < deleteButtons.length; i++) {
          const deleteButton = deleteButtons[i];
          const newDeleteButton = deleteButton.cloneNode(true);
          deleteButton.parentNode.replaceChild(newDeleteButton, deleteButton);
          newDeleteButton.addEventListener("click", async function(e) {
              // Empêche le comportement par défaut du bouton de suppression
              e.preventDefault();
              // Récupère l'ID du travail à supprimer
              const id = newDeleteButton.id.split("_")[1];
              const token = window.sessionStorage.getItem("token");
              // Envoie une requête DELETE au serveur pour supprimer le travail
              await fetch(`http://localhost:5678/api/works/${id}`, {
                  method: "DELETE",
                  headers: {
                      "Authorization": `Bearer ${token}`,
                      "Content-type": "application/json"
                  }
              });
              // Réactualise la galerie en mode édition et la galerie principale
              const works = await fetch("http://localhost:5678/api/works").then((works) => works.json());
              generateGalleryEditor(works);
              resetDeleteListeners(); // Réinitialise les écouteurs d'événements pour les boutons de suppression
              const target = document.querySelector(".gallery");
              target.innerText = "";
              generateGallery(works);   
          });
      }
  }

  // Fonction pour supprimer un travail
  function deleteWork() {
      const deleteWorks = document.getElementsByClassName("btn_delete");
      for (let i = 0; i < deleteWorks.length; i++) {
          deleteWorks[i].addEventListener("click", async function(e) {
              // Empêche le comportement par défaut du bouton de suppression
              e.preventDefault();
              // Récupère l'ID du travail à supprimer
              const id = deleteWorks[i].id.split("_")[1];
              const token = window.sessionStorage.getItem("token");
              // Envoie une requête DELETE au serveur pour supprimer le travail
              await fetch(`http://localhost:5678/api/works/${id}`, {
                  method: "DELETE",
                  headers: {
                      "Authorization": `Bearer ${token}`,
                      "Content-type": "application/json"
                  }
              });
              // Réactualise la galerie en mode édition et la galerie principale
              const works = await fetch("http://localhost:5678/api/works").then((works) => works.json());
              generateGalleryEditor(works);
              resetDeleteListeners(); // Réinitialise les écouteurs d'événements pour les boutons de suppression
              const target = document.querySelector(".gallery");
              target.innerText = "";
              generateGallery(works);
          });
      }
  }

  // Vérification de la limite de taille de l'image (4 Mo)
  let uploadLimit = document.querySelector("#photo_form")
  uploadLimit.onchange = function (){
      if(photo_form.files[0].size > 4194304) {
          alert("Fichier trop volumineux");
          photo_form.value = "";
      }
  }

  // Fermeture de la modale
  document.querySelector("#modale1").addEventListener("click", function(event){
      const modale = document.querySelector("#modale1");
      if(!event.target.closest("#outsideModale1") || event.target.closest("#close")){
          modale.style.display = "none";
      }
  });
  document.querySelector("#modale2").addEventListener("click", function(event){
      const modale = document.querySelector("#modale2");
      if(!event.target.closest("#outsideModale2")|| event.target.closest("#close2")){
          modale.style.display = "none";
          photo_form.value = "";
          const cache = document.querySelector("#apercuPhotoDiv");
          cache.setAttribute("style", "display: none");
          titre_form.value = "";
      }
  })
};
