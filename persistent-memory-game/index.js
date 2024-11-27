// Fonction principale qui initialise le jeu
function startGame() {
  // Récupère l'état du jeu depuis le localStorage ou initialise un état vide si aucun état n'est trouvé
  const gameState = JSON.parse(localStorage.getItem("memoryGameState")) || {};

  // Définit les cartes du jeu : un tableau mélangé contenant des paires de nombres (de 1 à 8)
  let CARDS = gameState.cards || Array.from({ length: 16 }, (_, index) => Math.floor(index / 2 + 1)).sort(() => Math.random() - 0.5);

  // Liste des cartes trouvées (indices des cartes déjà découvertes en paires)
  const foundCards = gameState.foundCards || [];

  // Liste des cartes retournées (indices des cartes actuellement retournées)
  const flippedCards = gameState.flippedCards || [];

  // Récupère tous les éléments HTML représentant les cartes
  const cardElements = document.querySelectorAll(".card");

  cardElements.forEach((card, index) => {
    card.classList.remove("flip", "found");
    card.querySelector(".back").innerText = CARDS[index];
    card.dataset.card = CARDS[index];

    // Si la carte a été trouvée dans une paire précédente, applique la classe "found"
    if (foundCards.includes(index)) {
      card.classList.add("found");
    }

    // Si la carte est actuellement retournée, applique la classe "flip"
    if (flippedCards.includes(index)) {
      card.classList.add("flip");
    }

    card.addEventListener("click", () => {
      if (document.querySelectorAll(".flip").length >= 2 || card.classList.contains("flip")) return;
      card.classList.add("flip");

      // Met à jour l'état du jeu dans le localStorage
      updateGameState();

      const currentFlipped = document.querySelectorAll(".flip")

      if (currentFlipped.length === 2) {
        if (currentFlipped[0].dataset.card === currentFlipped[1].dataset.card) {
          currentFlipped.forEach((c) => {
            c.classList.remove("flip");
            c.classList.add("found");
          });
        } else {
          setTimeout(() => {
            currentFlipped.forEach((c) => c.classList.remove("flip"));
            // Met à jour l'état du jeu dans le localStorage
            updateGameState();
          }, 1000);
        }
        // Met à jour l'état du jeu dans le localStorage
        updateGameState();
      }
    });
  });

  // Si aucune configuration de cartes n'existe dans le localStorage, enregistre la configuration initiale
  if (!gameState.cards) {
    localStorage.setItem("memoryGameState", JSON.stringify({ cards: CARDS, foundCards: [], flippedCards: [] }));
  }
}

function updateGameState() {
  // Liste des indices des cartes marquées comme "found"
  const foundCards = Array.from(document.querySelectorAll(".found"), (card) => Array.from(document.querySelectorAll(".card")).indexOf(card));

  // Liste des indices des cartes actuellement retournées
  const flippedCards = Array.from(document.querySelectorAll(".flip"), (card) => Array.from(document.querySelectorAll(".card")).indexOf(card));

  // Tableau des valeurs des cartes
  const cards = Array.from(document.querySelectorAll(".card"), (card) => card.dataset.card);

  // Enregistre l'état actuel du jeu dans le localStorage
  localStorage.setItem("memoryGameState", JSON.stringify({ cards, foundCards, flippedCards }));
}


function resetGame() {
  // Supprime l'état du jeu enregistré dans le localStorage
  localStorage.removeItem("memoryGameState");

  // Redémarre le jeu avec une nouvelle configuration
  startGame();
}

startGame();

document.querySelector("#restart").addEventListener("click", resetGame);
