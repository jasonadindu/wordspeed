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
let highestScore = []

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
let timeInterval;

let startButton = document.getElementById("start-button")
startButton.addEventListener("click", () => {
    start();
});

let difficulty = localStorage.getItem("difficulty") !== null 
    ? localStorage.getItem("difficulty") : "medium";

difficultySelect.value = localStorage.getItem("difficulty") != null 
    ? localStorage.getItem("difficulty") : "medium";



function start() {
    text.focus();
    hit = 0;
    time = 99;
    endGameE1.style.display = "none";
 timeInterval = setInterval(updateTime, 1000);
}

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
    timeE1.innerHTML = time < 10 ? `0${time}s` : `${time}s`;
    if (time === 0) {
        clearInterval(timeInterval);

        // so game ends here now update score 
        const score = new Score(hit, 30);
        highestScore.push(score);
        renderScoreUI();
        gameOver();
    }
}


function renderScoreUI() {
    console.log(highestScore)
    highestScore = highestScore.sort((a, b) =>  b.getHits - a.getHits);
    console.log(highestScore);
    let count = 1;

    const target = document.querySelector("#score-list");
    target.innerHTML = ""
    for(let score of highestScore) {
        const scoreString = `
    <div class="score">
        <span>#${count}</span>
        <span>${score.getHits} words</span>
        <span>${score.getPercentage} %</span>
    </div>`;
        
    target.innerHTML += scoreString;
    count += 1;
    }
    
}
function gameOver() {
    endGameE1.innerHTML = `
    <h1>Time ran out</>
    <p>Your final hit is ${hit}</p>
    <button onclick="start()">Start</button>
    `;
    endGameE1.style.display = "flex";
    hit = 0;
    time = 99;
}

let scoreList = document.getElementById("score-list");
let scoreForm = document.getElementById("score-form");

// scoreForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     let nameInput = document.getElementById("name");
//     let scoreInput = document.getElementById("score");

//     let name = nameInput.value;
//     let score = scoreInput.value;
    
//     fetch("/submit-score", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({name, score})
//     })
//     .then(response => response.json())
//     .then(data => {
//         let listItem = document.createElement("li");
//         listItem.textContent = `${data.name}: ${data.score}`;
//         scoreList.appendChild(listItem);

//         nameInput.value = "";
//         scoreInput = "";
//     })
//     .catch(error => {
//         console.error("There was an error submitting your score. Please try again");
//     })
// })


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
    // #date;
    #hits;
    #percentage;
    constructor(hits, percentage) {
        this.#hits = hits;
        this.#percentage = percentage;
    }
    // get date() {return this.#date; }
    get getHits() { return this.#hits; }
    get getPercentage() {return this.#percentage; }
}


