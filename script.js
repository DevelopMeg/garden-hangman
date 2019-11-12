const gameWrapp = document.querySelector(".game");

const categoryBox = document.querySelector(".box-category");
const categoryHerbs = document.querySelector(".box-category__herbs");
const categoryFruits = document.querySelector(".box-category__fruits");
const categoryVegetables = document.querySelector(".box-category__vegetables");

const boxGame = document.querySelector(".box-game");
const boxLetters = document.querySelector(".box-letters");
const boxWord = document.querySelector(".box-word");

const numberLossMoves = document.querySelector(".loss-moves__number");
const infoResult = document.querySelector(".info-result");
const imageLossMoves = document.querySelector(".image-loss-moves");

const letters = [
  "A",
  "Ą",
  "B",
  "C",
  "Ć",
  "D",
  "E",
  "Ę",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "Ł",
  "M",
  "N",
  "Ń",
  "O",
  "Ó",
  "P",
  "Q",
  "R",
  "S",
  "Ś",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "Ż",
  "Ź"
];

let words;

let randomWord;
const placeWord = [];

let winLetter = 0;
let lossMove = 1;

// choose game category

const herbs = ["basil", "oregano", "thyme", "parsley"];
const fruits = ["lemon", "apple", "orange", "melon"];
const vegetables = ["tomato", "potato", "carrot", "lettuce"];

const chooseCategory = e => {
  const categoryClick = e.target;
  if (categoryClick === categoryHerbs) {
    words = herbs;
  } else if (categoryClick === categoryFruits) {
    words = fruits;
  } else if (categoryClick === categoryVegetables) {
    words = vegetables;
  }

  categoryBox.classList.add("on");
  boxGame.classList.add("on");
  gameWrapp.classList.add("on");

  randomWordGame();
};

categoryHerbs.addEventListener("click", chooseCategory);
categoryFruits.addEventListener("click", chooseCategory);
categoryVegetables.addEventListener("click", chooseCategory);

// random word game and create place letter

const randomWordGame = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  randomWord = words[randomIndex];
  const lengthRandomWord = randomWord.length;

  for (let i = 0; i < lengthRandomWord; i++) {
    let placeLetterWord = document.createElement("div");
    placeLetterWord.className = "word-letter";
    boxWord.appendChild(placeLetterWord);
    placeWord.push(placeLetterWord);
  }
};

// number loss move

let numberMove = 10;
numberLossMoves.textContent = numberMove;

//  after click add letter in good place

const checkWin = () => {
  if (winLetter === randomWord.length) {
    infoResult.textContent = "congratulations you win!";
    infoResult.classList.add("on");
    gameWrapp.classList.add("open");
    setTimeout(() => {
      alert(`START AGAIN`);
      location.reload();
    }, 1200);
  }
};

const checkLoss = () => {
  if (lossMove === 11) {
    infoResult.textContent = `sorry you loss! word: ${randomWord}`;
    infoResult.classList.add("on");
    gameWrapp.classList.add("open");
    setTimeout(() => {
      alert(`START AGAIN`);
      location.reload();
    }, 1200);
  }
};

const addLetter = e => {
  const clickLetterTxt = e.target.textContent;

  const clickLetter = e.target;
  clickLetter.removeEventListener("click", addLetter);
  clickLetter.classList.add("on");

  let winMove = false;

  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] == clickLetterTxt.toLowerCase()) {
      placeWord[i].innerHTML = `<p>${clickLetterTxt}</p>`;
      placeWord[i].children[0].className = "word-letter__letter";

      winMove = true;
      winLetter++;
    }
  }
  if (winMove === true) {
    checkWin();
  } else {
    lossMove++;
    imageLossMoves.src = `IMG/image${lossMove}.jpg`;
    numberMove--;
    numberLossMoves.textContent = numberMove;
    checkLoss();
  }
};

// add letter to box & listener click letter

letters.forEach(letter => {
  let oneLetter = document.createElement("div");
  oneLetter.textContent = letter;
  oneLetter.className = "letter";
  boxLetters.appendChild(oneLetter);

  oneLetter.addEventListener("click", addLetter);
});
