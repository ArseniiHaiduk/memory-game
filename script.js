const startWindow = document.querySelector(".start-window");
const startBtn = document.querySelector(".btn-start");
const wonLostWindow = document.querySelector(".won-lost-window");
const wonLostContent = document.querySelector(".won-lost-content");
const amountAttempt = document.querySelector(".amount-attempt");
const spentTime = document.querySelector(".spent-time");
const memoryGame = document.querySelector(".memory-game");
const gameBoard = document.querySelector(".game-board");
const attempt = document.querySelector(".attempt");

startBtn.addEventListener("click", () => {
  startWindow.classList.add("hidden");
  memoryGame.classList.remove("hidden");
  wonLostWindow.classList.add("hidden");
  timeCount();
  generateCards(fruitIcons);
});

function checkWonLostGame(message) {
  attempt.innerHTML = "Attempts: 0";
  startWindow.classList.remove("hidden");
  memoryGame.classList.add("hidden");
  wonLostWindow.classList.remove("hidden");
  wonLostContent.textContent = `${message}`;
  const card = document.querySelectorAll(".card");
  card.forEach((element) => {
    element.remove();
  });
}

const timer = document.querySelector(".timer");

let [minutes, seconds] = [0, 0];

let intervalId;

const timeCount = () => {
  intervalId = setInterval(() => {
    ++seconds;

    if (seconds === 60) {
      seconds = 0;
      clearInterval(intervalId);
      checkWonLostGame("You lost!!!");
      attempts = 0;
      amountAttempt.remove();
      spentTime.remove();
    }
    // prettier-ignore
    timer.innerHTML = `Time: ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);
};

const fruitIcons = [
  "capybara",
  "dolphin",
  "flamingo",
  "hummingbird",
  "lemur",
  "panda",
  "penguin",
  "wombat",
];

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateCards(array) {
  const doubledArray = [...array, ...array];
  const shuffleArray = shuffleCards(doubledArray);

  shuffleArray.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const imageCard = document.createElement("img");
    imageCard.classList.add("image-card");
    imageCard.src = `images/${element}.png`;
    card.append(imageCard);

    card.dataset.icon = element;
    gameBoard.append(card);
  });
}

const selectedCards = [];
const guessedCards = [];
let attempts = 0;

function checkSelectedCards() {
  if (selectedCards.length === 2) {
    attempt.textContent = `Attempts: ${++attempts}`;

    if (selectedCards[0].dataset.icon !== selectedCards[1].dataset.icon) {
      selectedCards.forEach((card) => {
        setTimeout(() => card.classList.remove("selected"), 900);
      });
    } else {
      guessedCards.push(selectedCards[0]);
      guessedCards.push(selectedCards[1]);

      if (guessedCards.length === 16) {
        clearInterval(intervalId);
        checkWonLostGame("You won!!!");
        amountAttempt.textContent = `Attempt: ${attempts} `;
        spentTime.textContent = `Time: ${seconds} second`;
      }
    }
    selectedCards.length = 0;
  }
}

gameBoard.addEventListener("click", (event) => {
  const targetCard = event.target.closest(".card");

  if (targetCard && !targetCard.classList.contains("selected")) {
    targetCard.classList.add("selected");
    selectedCards.push(targetCard);
  }

  if (selectedCards.length === 2) {
    checkSelectedCards();
  }
});
