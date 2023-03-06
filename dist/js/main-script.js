"use strict";
const WordsEasy = [
    "car",
    "Hello",
    "Code",
    "Task",
    "Test",
    "Town",
    "Funny",
    "ball",
    "cat",
    "dog"
];
const WordsNormal = [
    "Linkedin",
    "Paradigm",
    "Javascript",
    "Testing",
    "Youtube",
    "Working",
    "Github",
    "Roles",
    "Playing",
    "Working",
    "padding",
    "margin",
    "position",
    "relative",
    "absolute",
    "overflow",
    "transform",
    "translate",
    "animation",
    "container",
];
const WordsHard = [
    "Dependencies",
    "Documentation",
    "Programming",
    "background",
    "movement",
    "comprehend",
    "isoleucine",
    "Exploring",
    "pronunciation",
    "vocabulary",
    "meantime",
    "Tergiversation",
    "Uncopyrightable",
    "Incomprehensib",
    "Trichotill",
    "Xenotranspl",
    "misspellings",
    "punctuation",
    "Watercooling",
    "withdrawing"
];
;
const settingLevls = {
    "Easy": 5,
    "Normal": 4,
    "Hard": 3,
};
const selectLvl = document.querySelector("select"), lvlSeconds = document.querySelector(".lvl-seconds span"), btnStart = document.querySelector(".btn-start"), theWord = document.querySelector(".the-word"), writeWord = document.querySelector("#typing"), upcomingWords = document.querySelector(".upcoming-words"), timeLeft = document.querySelector(".seconds span"), score = document.querySelector(".score"), from = document.querySelector(".from"), instructions = document.querySelector(".instructions");
let defaultLvlName = "Easy";
let defaultLvlSeconds = settingLevls[defaultLvlName];
lvlSeconds.textContent = defaultLvlSeconds.toString();
timeLeft.textContent = defaultLvlSeconds;
from.textContent = WordsEasy.length.toString();
selectLvl === null || selectLvl === void 0 ? void 0 : selectLvl.addEventListener("change", (e) => {
    selectLevel(e);
});
function selectLevel(event) {
    defaultLvlName = event.target.value;
    defaultLvlSeconds = settingLevls[defaultLvlName];
    lvlSeconds.textContent = defaultLvlSeconds.toString();
    timeLeft.textContent = defaultLvlSeconds;
    if (defaultLvlName === "Easy") {
        from.textContent = WordsEasy.length.toString();
    }
    else if (defaultLvlName === "Normal") {
        from.textContent = WordsNormal.length.toString();
    }
    else {
        from.textContent = WordsHard.length.toString();
    }
    window.localStorage.setItem("level", defaultLvlName);
    window.localStorage.setItem("level-seconds", defaultLvlSeconds);
    window.localStorage.setItem("words", from.textContent);
}
;
writeWord.onpaste = function () {
    return false;
};
btnStart === null || btnStart === void 0 ? void 0 : btnStart.addEventListener("click", (e) => {
    e.currentTarget.remove();
    instructions === null || instructions === void 0 ? void 0 : instructions.remove();
    writeWord.focus();
    writeWord.value = "";
    selectLvl === null || selectLvl === void 0 ? void 0 : selectLvl.setAttribute("disabled", "");
    GenerateWords();
});
function GenerateWords() {
    let randomWordsEasy = Math.trunc(Math.random() * WordsEasy.length);
    let randomWordsNormal = Math.trunc(Math.random() * WordsNormal.length);
    let randomWordsHard = Math.trunc(Math.random() * WordsHard.length);
    let randomEasy = WordsEasy[randomWordsEasy];
    let randomNormal = WordsNormal[randomWordsNormal];
    let randomHard = WordsHard[randomWordsHard];
    let wordIndexEasy = WordsEasy.indexOf(randomEasy);
    let wordIndexNormal = WordsNormal.indexOf(randomNormal);
    let wordIndexHard = WordsHard.indexOf(randomHard);
    WordsEasy.splice(wordIndexEasy, 1);
    WordsNormal.splice(wordIndexNormal, 1);
    WordsHard.splice(wordIndexHard, 1);
    theWord.classList.add("act-word");
    upcomingWords.classList.add("upcoming-act");
    upcomingWords.innerHTML = "";
    if (defaultLvlName === "Easy") {
        theWord.textContent = randomEasy;
        timeLeft.textContent = defaultLvlSeconds;
        GenerateWordsEasy();
    }
    else if (defaultLvlName === "Normal") {
        theWord.textContent = randomNormal;
        timeLeft.textContent = defaultLvlSeconds;
        GenerateWordsNormal();
    }
    else {
        theWord.textContent = randomHard;
        timeLeft.textContent = defaultLvlSeconds;
        GenerateWordsHard();
    }
    startTimer();
}
;
let FinalResults = null;
function startTimer() {
    timeLeft.textContent = defaultLvlSeconds;
    let stopSeconds = setInterval(() => {
        timeLeft.textContent--;
        if (timeLeft.textContent === "0") {
            clearInterval(stopSeconds);
            if (theWord.innerHTML.toLowerCase() === writeWord.value.toLowerCase()) {
                writeWord.value = "";
                score.textContent++;
                if ((WordsEasy.length && WordsNormal.length && WordsHard.length) > 0) {
                    GenerateWords();
                }
                else {
                    finishGame(FinalResults = "<h1 class='good result'>good <img src='./src/asset/icon-App/emoji-good.svg' alt=''></h1>");
                }
                ;
            }
            else {
                finishGame(FinalResults = "<h1 class='bad result'>bad <img src='./src/asset/icon-App/emoji-bad.svg' alt=''></h1>");
            }
            ;
        }
        ;
    }, 1000);
}
;
function GenerateWordsEasy() {
    for (let i = 0; i < WordsEasy.length; i++) {
        let div = document.createElement("div");
        div.className = "word";
        div.append(document.createTextNode(WordsEasy[i]));
        upcomingWords.appendChild(div);
    }
}
;
function GenerateWordsNormal() {
    for (let i = 0; i < WordsNormal.length; i++) {
        let div = document.createElement("div");
        div.className = "word";
        div.append(document.createTextNode(WordsNormal[i]));
        upcomingWords.appendChild(div);
    }
}
;
function GenerateWordsHard() {
    for (let i = 0; i < WordsHard.length; i++) {
        let div = document.createElement("div");
        div.className = "word";
        div.append(document.createTextNode(WordsHard[i]));
        upcomingWords.appendChild(div);
    }
}
;
let dataScoreEasy = "0";
let dataScoreNormal = "0";
let dataScoreHard = "0";
function finishGame(results) {
    var _a, _b, _c;
    let finish = document.createElement("div");
    finish.className = "finish";
    finish.innerHTML = `
        <div class="game-over">
            <h2 class="finish-score">
                easy score <span class="one">${defaultLvlName == "Easy" ? score.textContent : dataScoreEasy}</span>
                <br>
                normal score <span class="two">${defaultLvlName == "Normal" ? score.textContent : dataScoreNormal}</span>
                <br>
                hard score <span class="three">${defaultLvlName == "Hard" ? score.textContent : dataScoreHard}</span>
            </h2>
            ${results}
            <button class="btn-reload" onclick="buttonReloadApp()">reload <img src='./src/asset/icon-App/reload.svg' alt=''></button>
        </div>
    `;
    document.body.children[1].appendChild(finish);
    checkedLastScore((_a = document.querySelector(".one")) === null || _a === void 0 ? void 0 : _a.textContent, (_b = document.querySelector(".two")) === null || _b === void 0 ? void 0 : _b.textContent, (_c = document.querySelector(".three")) === null || _c === void 0 ? void 0 : _c.textContent);
    test();
}
;
let lastScoreEasy = document.querySelector(".last-score-easy");
let lastScoreNormal = document.querySelector(".last-score-normal");
let lastScoreHard = document.querySelector(".last-score-hard");
function checkedLastScore(lastScore, lastScore2, lastScore3) {
    if (defaultLvlName == "Easy") {
        lastScoreEasy.textContent = lastScore;
    }
    else if (defaultLvlName == "Normal") {
        lastScoreNormal.textContent = lastScore2;
    }
    else {
        lastScoreHard.textContent = lastScore3;
    }
    window.localStorage.setItem("one", lastScore);
    window.localStorage.setItem("two", lastScore2);
    window.localStorage.setItem("three", lastScore3);
}
;
let dateOne = document.querySelector(".date-one");
let dateTwo = document.querySelector(".date-two");
let dateThree = document.querySelector(".date-three");
function test() {
    let a = Date.now();
    let b = new Date(a);
    let all = `${b.getMonth() + 1} / 
            ${b.getDate() <= 10 ? "0" + b.getDate() : b.getDate()} /
            ${b.getHours() <= 10 ? "0" + b.getHours() : b.getHours()} :
            ${b.getMinutes() < 10 ? "0" + b.getMinutes() : b.getMinutes()}
        `;
    if (defaultLvlName == "Easy") {
        dateOne.textContent = all;
        window.localStorage.setItem("time", dateOne.textContent);
    }
    else if (defaultLvlName == "Normal") {
        dateTwo.textContent = all;
        window.localStorage.setItem("time2", dateTwo.textContent);
    }
    else {
        dateThree.textContent = all;
        window.localStorage.setItem("time3", dateThree.textContent);
    }
}
;
function getDattaFromLocalStorage() {
    if (localStorage.getItem("level")) {
        selectLvl.value = localStorage["level"];
        defaultLvlName = localStorage["level"];
        lvlSeconds.textContent = localStorage["level-seconds"];
        timeLeft.textContent = localStorage["level-seconds"];
        defaultLvlSeconds = localStorage["level-seconds"];
        from.textContent = localStorage["words"];
    }
    if (localStorage.getItem("one")) {
        dataScoreEasy = lastScoreEasy.textContent = localStorage["one"];
        dataScoreNormal = lastScoreNormal.textContent = localStorage["two"];
        dataScoreHard = lastScoreHard.textContent = localStorage["three"];
        dateOne.textContent = localStorage["time"];
        dateTwo.textContent = localStorage["time2"];
        dateThree.textContent = localStorage["time3"];
    }
}
;
getDattaFromLocalStorage();
document.addEventListener("click", (e) => {
    const buttonActive = e.target.matches(".btn-score");
    console.log(buttonActive);
    if (!buttonActive && e.target.closest(".dropdown") != null)
        return;
    let currentDropDown;
    switch (buttonActive) {
        case true: {
            currentDropDown = e.target.closest(".dropdown");
            currentDropDown.classList.toggle("act-check-score");
            break;
        }
        default: {
            document.querySelector(".dropdown").classList.remove("act-check-score");
            break;
        }
    }
});
const buttonReloadApp = () => { window.location.reload(); };
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
function handleDarkmode(e) {
    const darkModeOn = e.matches;
    const favicon = document.querySelector('link[rel="icon"]');
    if (darkModeOn) {
        favicon.href = './src/asset/logo/logo-white.png';
    }
    else {
        favicon.href = './src/asset/logo/logo-dark.png';
    }
}
;
handleDarkmode(darkModeMediaQuery);
darkModeMediaQuery.addListener(handleDarkmode);
//# sourceMappingURL=main-script.js.map