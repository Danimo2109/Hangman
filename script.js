const words = [
  "ABEND",
  "ABENTEUER",
  "ABGEORDNET",
  "ABSTAND",
  "ACHTUNG",
  "ADRESSE",
  "AFRIKA",
  "AGENT",
  "AGGRESSIV",
  "AHORN",
  "ALBATROSS",
  "ALBUM",
  "ALGE",
  "ALPINIST",
  "AMBULANZ",
  "AMPEL",
  "ANALYSE",
  "ANATOMIE",
  "ANBINDUNG",
  "ANNEHMEN",
  "APFEL",
  "ARBEIT",
  "ARCHITEKT",
  "ARMEE",
  "ARTIKEL",
  "ASPEKT",
  "ASSISTENT",
  "ASTRONAUT",
  "ATEM",
  "AUFSTEIGEN",
  "AUSSICHT",
  "AUTOMOBIL",
  "BANANE",
  "BASIS",
  "BEET",
  "BEHÄLTER",
  "BEI",
  "BESCHREIBUNG",
  "BESSER",
  "BILDER",
  "BILDUNG",
  "BIS",
  "BLAU",
  "BLOß",
  "BODEN",
  "BRIEF",
  "BÜCHER",
  "DACH",
  "DAUER",
  "DECKE",
  "DINOSAURIER",
  "DRUCK",
  "DUFT",
  "EDELSTEIN",
  "EIER",
  "ELF",
  "ENDE",
  "EINFLUSS",
  "EIS",
  "EINZEL",
  "EINSTEIN",
  "FALL",
  "FEUER",
  "FISCH",
  "FLUG",
  "FLUGHAFEN",
  "FREUND",
  "FUNK",
  "GARAGE",
  "GEMEIN",
  "GENUS",
  "GEOGRAPHIE",
  "GESCHICHTE",
  "GITARRE",
  "GLÜCK",
  "HAUS",
  "HERR",
  "HITZE",
  "HORIZONT",
  "HUMOR",
  "INSEL",
  "INTELLIGENZ",
  "JOURNAL",
  "JUNGE",
  "KABEL",
  "KAFFEE",
  "KALENDER",
  "KAMMER",
  "KANAL",
  "KARTOFFEL",
  "KATZE",
  "KELLER",
  "KINDER",
  "KLEIDUNG",
  "KLIMA",
  "KOLLEGEN",
  "KONTAKT",
  "KONZERT",
  "KÜHLE",
  "LADE",
  "LEBEN",
  "LIEBE",
  "LITERATUR",
  "LÖFFEL",
  "MAGNET",
  "MALER",
  "MANN",
  "MATRIX",
  "MEER",
  "MELONE",
  "MENSCH",
  "MOTOR",
  "NACHT",
  "NEU",
  "NEUER",
  "NUTZEN",
  "OZEAN",
  "PAPIER",
  "PARK",
  "PARTNER",
  "PLATZ",
  "PRAXIS",
  "PRODUKT",
  "RAT",
  "REISE",
  "ROTE",
  "RUMOR",
  "SAISON",
  "SCHULE",
  "SCHWIMMEN",
  "SEHEN",
  "SEMESTER",
  "SIEG",
  "SITZEN",
  "SKATE",
  "SPIEL",
  "SPORT",
  "STARK",
  "STUDIO",
  "TERRITORIUM",
  "TEXT",
  "TIER",
  "TOLLE",
  "TURM",
  "UNTERNEHMEN",
  "VATER",
  "VORLAGE",
  "WARTEN",
  "WEG",
  "WELT",
  "WINTER",
  "WUNDER",
  "ZIEL",
  "ZOO",
];

let word, guessed, wrong, wrongLetters;

function startNewRound() {
  word = words[Math.floor(Math.random() * words.length)];
  guessed = [];
  wrong = 0;
  wrongLetters = [];
  document.getElementById("wrongGuesses").textContent = wrong;
  document.getElementById("wrongLetters").textContent = "";
  document.getElementById("message").textContent = "";
  const img = document.getElementById("hangmanImage");
  img.classList.remove("swing"); // Remove swing on new round
  updateDisplay();
}

function playLosingHorn() {
  const audio = new Audio("./sounds/losinghorn.mp3");
  audio.play();
}

function playWrongAnswer() {
  const audio = new Audio("./sounds/wronganswer.mp3");
  audio.play();
}

function playGoodResult() {
  const audio = new Audio("./sounds/goodresult.mp3");
  audio.play();
}

function playCorrectChoice() {
  const audio = new Audio("./sounds/correctchoice.mp3");
  audio.play();
}

function updateDisplay() {
  let display = "";
  for (let letter of word) {
    display += guessed.includes(letter) ? letter : "_";
  }
  document.getElementById("displayWord").textContent = display;
  document.getElementById("hangmanImage").src = `./images/Hangman${wrong}.jpg`;
  if (!display.includes("_")) {
    document.getElementById("message").textContent = "Gewonnen!";
    playGoodResult();
  }
}

function makeGuess() {
  const input = document.getElementById("guessInput");
  const letter = input.value.toUpperCase();
  input.value = "";

  if (letter && !guessed.includes(letter) && !wrongLetters.includes(letter)) {
    if (word.includes(letter)) {
      guessed.push(letter);
      playCorrectChoice();
    } else {
      wrong++;
      wrongLetters.push(letter);
      document.getElementById("wrongGuesses").textContent = wrong;
      document.getElementById("wrongLetters").textContent =
        wrongLetters.join(", ");
      playWrongAnswer();
    }

    if (wrong >= 6) {
      document.getElementById("message").textContent =
        "Verloren! Das Wort war: " + word;
      playLosingHorn();
      const img = document.getElementById("hangmanImage");
      img.classList.remove("swing"); // reset if needed
      void img.offsetWidth; // force reflow for restart
      img.classList.add("swing");
    }

    updateDisplay();
  }
}

document
  .getElementById("guessInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      makeGuess();
    }
  });

startNewRound();
