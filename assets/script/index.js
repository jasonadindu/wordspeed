'use script';

const word = document.getElementById("word");
const text = document.getElementById("text");
const hitE1 = document.getElementById("hit");
const timeE1 = document.getElementById("time");
const endGameE1 = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const scoreCtn = document.getElementById("highscore")

const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 
'population','weather', 'bottle', 'history', 'dream', 'character', 'money',
 'absolute','discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
'keyboard', 'window'];

let randomWord;
let hit = 0;
let time = 99;

let scoreList = document.getElementById("score-list");
let scoreForm = document.getElementById("score-form");

scoreForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let nameInput = document.getElementById("name");
    let scoreInput = document.getElementById("score");

    let name = nameInput.value;
    let score = scoreInput.value;
    
    fetch("/submit-score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, score})
    })
    .then(response => response.json())
    .then(data => {
        let listItem = document.createElement("li");
        listItem.textContent = `${data.name}: ${data.score}`;
        scoreList.appendChild(listItem);

        nameInput.value = "";
        scoreInput = "";
    })
    .catch(error => {
        console.error(error);
    })
})

let difficulty = localStorage.getItem("difficulty") !== null 
    ? localStorage.getItem("difficulty") : "medium";

difficultySelect.value = localStorage.getItem("difficulty") != null 
    ? localStorage.getItem("difficulty") : "medium";

text.focus();
const timeInterval = setInterval(updateTime, 1000);

function getRadomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
    randomWord = getRadomWord();
    word.innerHTML = randomWord;
}

function updateHit() {
    hit++;
    hitE1.innerHTML = hit;
}

function updateTime() {
    time--;
    timeE1.innerHTML = time + "s";
    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    endGameE1.innerHTML = `
        <h1>Time ran out</>
        <p>Your final hit is ${hit}</p>
        <button onclick="locate.relaod()">Start</button>
    `;
    endGameE1.style.display = "flex";
}

addWordToDOM();

text.addEventListener("input", (e) => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateHit();

        e.target.value = "";

        if (difficulty === "hard") {
            time += 2;
        } else if (difficulty === "medium") {
            time += 3;
        } else {
            time += 5;
        }
        updateTime();
    }
});
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

settingsForm.addEventListener("change", (e) => {
    difficulty = e.target.value;
    localStorage.setItem("difficulty", difficulty);
});

class Score {
    #date;
    #hits;
    #percentage;
    constructor(date, hits, percentage) {
        this.#date = date;
        this.#hits = hits;
        this.#percentage = percentage;
    }
    get date() {return this.#date; }
    get hits() { return this.#hits; }
    get percentage() {return this.#percentage; }
}

const scores = [];
if(score > highscore){
    highscore = score;
    document.querySelector('.highscore').textContent = highscore;
}
