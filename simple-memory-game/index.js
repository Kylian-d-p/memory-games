function startGame() {
  // Crée un tableau de 16 cartes en double (1 à 8), puis le mélange de manière aléatoire
  const CARDS = Array.from({ length: 16 }, (_, index) => Math.floor(index / 2 + 1)).sort(() => Math.random() - 0.5);

  document.querySelectorAll(".card").forEach((card, index) => {
    card.classList.remove("flip", "found");

    card.querySelector(".back").innerText = CARDS[index];
    card.dataset.card = CARDS[index];

    card.addEventListener("click", () => {
      let flippedCards = document.querySelectorAll(".flip");

      // Empêche de retourner plus de deux cartes ou de retourner une carte déjà retournée
      if (flippedCards.length >= 2 || card.classList.contains("flip")) return;

      // Retourne la carte cliquée
      card.classList.add("flip");

      // Met à jour la liste des cartes retournées
      flippedCards = document.querySelectorAll(".flip");

      // Si deux cartes sont retournées, vérifie si elles correspondent
      if (flippedCards.length === 2) {
        if (flippedCards[0].dataset.card === flippedCards[1].dataset.card) {
          // Si les cartes correspondent, les marque comme trouvées
          flippedCards.forEach((card) => card.classList.replace("flip", "found"));
        } else {
          // Si elles ne correspondent pas, les retourne après un délai d'une seconde
          setTimeout(() => {
            flippedCards.forEach((card) => card.classList.remove("flip"));
          }, 1000);
        }
      }
    });
  });
}

startGame();

document.querySelector("#restart").addEventListener("click", startGame);
