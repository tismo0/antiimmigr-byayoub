document.getElementById("nomForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const inputNom = document.getElementById("nomUtilisateur").value.trim();
  const resultat = document.getElementById("resultat");
  const effects = document.getElementById("effects");
  const sonElu = document.getElementById("sonElu");
  const sonNonElu = document.getElementById("sonNonElu");

  // Affichage du message "Analyse en cours" pendant la vérification
  resultat.innerHTML = "🔄 Analyse en cours...";
  resultat.style.color = "#007BFF";

  try {
    // Chargement de la base de données depuis le fichier JSON
    const response = await fetch("baseDeDonnees.json");
    if (!response.ok) throw new Error("Erreur lors du chargement des données.");
    const data = await response.json();

    setTimeout(() => {
      if (data.noms.includes(inputNom)) {
        // Si le nom est trouvé dans la base de données : Effet dramatique
        // Écran rouge et son négatif
        sonNonElu.play();
        flashRedScreen();
        resultat.innerHTML = `🚨 <span style="color:red;">Retourne dans ton pays, ${inputNom} !</span> 🚨`;
        resultat.style.color = "red";
      } else {
        // Si le nom n'est pas trouvé : Effet joyeux
        // Confettis et son positif
        playConfetti();
        sonElu.play();
        resultat.innerHTML = `🎉 Bienvenue parmi les élus, <span style="color:green;">${inputNom}</span> ! 🎉`;
        resultat.style.color = "green";
      }
    }, 1500);
  } catch (error) {
    console.error(error);
    resultat.textContent = "Erreur. Réessayez plus tard.";
    resultat.style.color = "orange";
  }
});

// Fonction pour afficher les confettis lors d'une réponse positive
function playConfetti() {
  const effects = document.getElementById("effects");
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDelay = `${Math.random()}s`;
    effects.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2000); // Nettoyage après 2s
  }
}

// Fonction pour créer un effet de flash rouge lors d'une réponse négative
function flashRedScreen() {
  document.body.style.background = "red";
  setTimeout(() => (document.body.style.background = ""), 500);
}
