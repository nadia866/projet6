// Sélectionne le formulaire de connexion dans le document HTML
let form = document.querySelector("#form-login");

// Sélectionne le bouton de soumission dans le formulaire de connexion
let inputSubmit = document.querySelector("#sub");

// Sélectionne le message d'erreur/succès du formulaire de connexion
let messageForm = document.querySelector("#messageForm");

// Cache le message d'erreur/succès par défaut
messageForm.classList.remove("active");

// Ajoute un écouteur d'événements sur le bouton de soumission
inputSubmit.addEventListener("click", connect);

// Fonction asynchrone qui se déclenche lorsque le bouton de soumission est cliqué
async function connect(e) {
  // Empêche le comportement par défaut du formulaire de s'envoyer
  e.preventDefault();

  // Sélectionne les champs d'email et de mot de passe dans le formulaire
  let inputEmail = document.querySelector("#email");
  let inputPassword = document.querySelector("#password");

  // Vérifie si les champs d'email et de mot de passe ne sont pas vides
  if (inputEmail.value.length != 0 && inputPassword.value.length != 0) {
    // Effectue une requête POST asynchrone vers le serveur local
    let appel = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inputEmail.value,
        password: inputPassword.value,
      }),
    });

    // Vérifie si la requête a réussi
    if (appel.ok) {
      // Récupère la réponse JSON de la requête
      let response = await appel.json();

      // Stocke la réponse dans le stockage local du navigateur
      localStorage.setItem("authentification", JSON.stringify(response));

      // Redirige vers la page d'administration
      window.document.location.href = "../pageAdministrateur/admin.html";
    } else {
      // Affiche un message d'erreur si la connexion échoue
      messageForm.classList.add("active");
      messageForm.innerText = "Email ou mot de passe incorrect";
    }
  } else {
    // Affiche un message si les champs d'email et de mot de passe sont vides
    messageForm.classList.add("active");
    messageForm.innerText =
      "Veuillez remplir tous les champs pour vous connecter";
  }
}

// Fonction qui réinitialise les champs passés en arguments
function resetFields(...args) {
  for (let i = 0; i < arguments.length; i++) {
    args[i].value = "";
  }
}
