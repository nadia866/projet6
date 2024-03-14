// Fonction d'envoi du formulaire de login
function login() {
  const login = document.querySelector("#loginForm");
  login.addEventListener("submit", function(event) {
      // On empêche la page de rafraichir immédiatement
      event.preventDefault();
      // Création des infos de login
      const loginInfo = {
          email: email.value,
          password: password.value
      };
      // Conversion en JSON de loginInfo
      const chargeUtile = JSON.stringify(loginInfo);
      console.log(loginInfo); // Vérification des infos envoyées
      // Envoi de la demande de connexion
      fetch('http://localhost:5678/api/users/login', { 
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: chargeUtile
      }).then(response => response.json().then(r => ({status: response.status, body: r}))) //Séparation du status et du token
      .then(data => {
          console.log(data.status); // Vérification du code serveur
          if (data.status === 200) {
              window.sessionStorage.setItem("token", data.body.token);
              console.log(data.body.token);
              window.location.replace("../index.html");
          }if (data.status === 401) {
              alert("Mot de passe incorrect");
          }if (data.status === 404) {
              alert("Utilisateur inconnu. Vérifiez l'e-mail")
          };
      });
  });
};

login();