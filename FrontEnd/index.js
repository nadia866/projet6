/*Étape 1.1 : Récupération des travaux depuis le back-end*/
// Sélecteurs de la galerie
const galleryElement = document.querySelector('.gallery');
const buttonContainerElement = document.querySelector('.btns-container');

// Sélecteurs modale 1
const mainModal = document.querySelector('#modal1');
const mainModalGalleryElement = document.querySelector('.modal1-gallery');
// Sélecteurs modale 2
const secondModal = document.querySelector('#modal2');

// Tableaux "works" et "categories" vides utilisés pour stocker les données de l'API
let works = []
let categories = []

// Variable pour savoir si la modale est ouverte ou non
let mainModalOpened = false; // False = fermée
let secondModalOpened = false;

/*Appel à l’API avec fetch afin de récupérer dynamiquement les
projets de l’architecte*/
// Fonction asynchrone pour récupérer les données à partir de l'API
const getWorks = async () => {
    await fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(dataProjects => works.push(...dataProjects))
    .catch(error => console.log(error))
}

// Fonction asynchrone pour les catégories
const getCategories = async () => {
    await fetch("http://localhost:5678/api/categories")
    .then(response2 => response2.json())
    .then(dataFilters => categories.push(...dataFilters))
    .catch(error2 => console.log(error2))
}
/*Étape 1.2 : Réalisation du filtre des travaux*/
// Création un bouton de filtre
const createButton = (id, name) => {
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('btn');
    buttonElement.textContent = name;
    // Texte du bouton = name (dans "category" de l'API)
    buttonElement.dataset.id = id;
    // dataset (représente tous les attributs "data-*" d'un élément) = id (dans "category")

    // Bouton actif pour "Tous" de base
    if (id === 0) {
        buttonElement.classList.add('btn-active')
    }

    // Evènement au click
    buttonElement.addEventListener('click', () => {
        // Selection de tous les boutons
       const allButtons = document.querySelectorAll('.btn');
       allButtons.forEach((btn, index) => {
            // On enlève en 1er la classe
            btn.classList.remove('btn-active')
            if (id === index) {
            // Si id = index activation de la classe
            btn.classList.add('btn-active')
            }
        })

        // Si index est 0
        if (id === 0) {
        // Mise à jour de l'affichage
        galleryElement.innerHTML = '';
        // Affichage de tous les projets dans 'tous'
        return createWorks(works)
        }
    
        // Création d'un nouveau tableau works
        // pour filtrer selon l'id de la catégorie
        const newWorksArray = works.filter(work => work.categoryId === Number(id))
        // Mise à jour de l'affichage
        galleryElement.innerHTML = '';
        createWorks(newWorksArray)
    })

    buttonContainerElement.appendChild(buttonElement);
}

// Créer les différents boutons de filtre
const handleFilters = (categories) => {
    createButton(0, 'Tous')
    categories.forEach(button => {
        createButton(button.id, button.name)
    });
}

// Nom des options selon l'id
const selectOptionCategories = (id, name) => {
    const selectElement = document.querySelector('.category-select')
    const optionElement = document.createElement('option');

    optionElement.value = id;
    optionElement.textContent = name;

    if (id === 0) {
    optionElement.innerHTML = '- Sélectionner une catégorie -';
    }
    
    selectElement.appendChild(optionElement);
}

// Créer les options du select à partir du tableau "categories"
const categoriesModal = (categories) => {
    selectOptionCategories(0,'')
    categories.forEach(optionElement => {
        selectOptionCategories(optionElement.id, optionElement.name)
    })
}


// Création des éléments HTML des projets dynamiquement
const createWorks = (works) => {
    works.forEach(work => {
        // Création de la balise contenant un projet
        const figureElement = document.createElement('figure')
        // Création du contenu de la balise
        const imgElement = document.createElement('img')
        const figCaptionElement = document.createElement('figcaption')
        
        // Sources du contenu
        imgElement.src = work.imageUrl;
        imgElement.alt = work.title;
        
        figCaptionElement.textContent = work.title;
        
        // Rattachement de la balise à la galerie
        figureElement.appendChild(imgElement)
        figureElement.appendChild(figCaptionElement)
        galleryElement.appendChild(figureElement)
    });
}

const createModalWorks = (works) => {
    works.forEach(work => {
        const figureElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        const figCaptionElement = document.createElement('figcaption');
        const trashElement = document.createElement('span');
        const trashIcon = document.createElement('i');
        const arrowsElement = document.createElement('span');
        const arrowsIcon = document.createElement('i');
        
        figureElement.classList.add('modal1-figure');
        trashElement.classList.add('trash');
        trashIcon.classList.add('fa-solid', 'fa-trash-can');
        arrowsElement.classList.add('arrows')
        arrowsIcon.classList.add('fa-solid', 'fa-arrows-up-down-left-right')

        imgElement.src = work.imageUrl;
        imgElement.classList.add('modal1-img');

        figCaptionElement.textContent = 'éditer';

        trashElement.addEventListener('click', () => {
            deleteWork();
        });

        // Fonction pour supprimer un projet
        const deleteWork = async() => {
            let token = sessionStorage.getItem('token');
            let id = work.id;
            let figureElementTrash = trashElement.closest('figure');
            // closest = élément (ici 'figure') le plus proche dans l'ascendance de l'élément sélectionné (ici le trash)

            // appel de l'API pour l'id de chaque work
            const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                // method DELETE pour supprimer un projet
                method: "DELETE",
                headers: {
                    "Accept": "*/*",
                    "Authorization": `Bearer ${token}`
                }
            })

            if (response.status === 204) {
                figureElementTrash.remove();
                galleryElement.innerHTML = "";
                updateUI()
            }
        }

        figureElement.appendChild(imgElement);
        figureElement.appendChild(figCaptionElement);
        trashElement.appendChild(trashIcon);
        arrowsElement.appendChild(arrowsIcon);
        figureElement.appendChild(trashElement);
        figureElement.appendChild(arrowsElement);
        
        mainModalGalleryElement.appendChild(figureElement);
    })
}
/*Étape 2 : Codez la page de connexion*/
// User connecté
const connected = () => {
    // Stockage du token
    let token = sessionStorage.getItem('token');
    
    // Selecteurs des différents éléments HTML
    const editionElement = document.querySelector('#edition');
    const editImage = document.querySelector('.editImage');
    const editArticle = document.querySelector('.editArticle');
    const editWorks = document.querySelector('.editWorks');

    if (token) {
        editWorks.addEventListener('click', (e) => {
            e.preventDefault()
            if (mainModalOpened) return
            mainModalOpened = true
            mainModal.style.display = "flex"
        })

        // Changement du texte "login"
        const loginLink = document.querySelector('.loginLink');
        loginLink.textContent = "logout";

        // Création du lien de déconnexion
        const logoutLink = document.querySelector('#logoutLink');
        logoutLink.addEventListener('click', () => {
            sessionStorage.removeItem('token');
            window.location.href = './login.html';
        })

        // Disparition des filtres
        const filtersWorks = document.querySelector('.btns-container');
        filtersWorks.style.display = 'none';
    } else {
        editionElement.style.display = 'none';

        editImage.style.display = 'none';

        editArticle.style.display = 'none';

        editWorks.style.display = 'none';
    }
}

