type str = string;
type num = number;
type bool = boolean;
type allTypes = (str | num | bool);

// Array Of Words

// easy level word
const WordsEasy: str[] = [
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

// normal level word
const WordsNormal: str[] = [
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

// hard level word
const WordsHard: str[] = [
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

// setting levels
interface Setlvl {
    "Easy": num | str,
    "Normal": num,
    "Hard": num,
};

const settingLevls: Setlvl = {
    "Easy": 5,
    "Normal": 4,
    "Hard": 3,
};

// catch selector
const selectLvl = document.querySelector("select") as HTMLSelectElement,
    lvlSeconds = document.querySelector(".lvl-seconds span") as HTMLElement,
    btnStart = document.querySelector(".btn-start"),
    theWord = document.querySelector(".the-word") as HTMLElement,
    writeWord = document.querySelector("#typing") as HTMLInputElement,
    upcomingWords = document.querySelector(".upcoming-words") as HTMLElement,
    timeLeft = document.querySelector(".seconds span") as HTMLElement | any,
    score = document.querySelector(".score") as HTMLElement | any,
    from = document.querySelector(".from") as HTMLElement,
    instructions = document.querySelector(".instructions");

// set default level
let defaultLvlName: str = "Easy";
let defaultLvlSeconds: str = settingLevls[defaultLvlName];
lvlSeconds.textContent = defaultLvlSeconds.toString();

timeLeft.textContent = defaultLvlSeconds;
from.textContent = WordsEasy.length.toString();

selectLvl?.addEventListener("change", (e): void => {
    selectLevel(e);
});

function selectLevel(event: HTMLSelectElement | any) {
    defaultLvlName = event.target.value;
    defaultLvlSeconds = settingLevls[defaultLvlName];
    lvlSeconds.textContent = defaultLvlSeconds.toString();
    timeLeft.textContent = defaultLvlSeconds;

    if (defaultLvlName === "Easy") {
        from.textContent = WordsEasy.length.toString();
    } else if (defaultLvlName === "Normal") {
        from.textContent = WordsNormal.length.toString();
    } else {
        from.textContent = WordsHard.length.toString();
    }

    window.localStorage.setItem("level", defaultLvlName);
    window.localStorage.setItem("level-seconds", defaultLvlSeconds);
    window.localStorage.setItem("words", from.textContent);
};

// disable paste event
writeWord.onpaste = function (): bool {
    return false;
};

btnStart?.addEventListener("click", (e: HTMLButtonElement | any): void => {
    e.currentTarget.remove();
    instructions?.remove();
    writeWord.focus();
    writeWord.value = "";
    selectLvl?.setAttribute("disabled", "");

    // generate word
    GenerateWords();
});

function GenerateWords(): void {
    let randomWordsEasy: num = Math.trunc(Math.random() * WordsEasy.length);
    let randomWordsNormal: num = Math.trunc(Math.random() * WordsNormal.length);
    let randomWordsHard: num = Math.trunc(Math.random() * WordsHard.length);

    let randomEasy: str = WordsEasy[randomWordsEasy];
    let randomNormal: str = WordsNormal[randomWordsNormal];
    let randomHard: str = WordsHard[randomWordsHard];

    // get words index
    let wordIndexEasy: num = WordsEasy.indexOf(randomEasy);
    let wordIndexNormal: num = WordsNormal.indexOf(randomNormal);
    let wordIndexHard: num = WordsHard.indexOf(randomHard);

    // remove words index
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
    } else if (defaultLvlName === "Normal") {
        theWord.textContent = randomNormal;
        timeLeft.textContent = defaultLvlSeconds;
        GenerateWordsNormal();
    } else {
        theWord.textContent = randomHard;
        timeLeft.textContent = defaultLvlSeconds;
        GenerateWordsHard();
    }

    // start play function.
    startTimer();
};

let FinalResults: (str | null) = null;

function startTimer(): void {
    timeLeft.textContent = defaultLvlSeconds;

    let stopSeconds: num = setInterval(() => {
        timeLeft.textContent--;

        if (timeLeft.textContent === "0") {

            clearInterval(stopSeconds);

            if (theWord.innerHTML.toLowerCase() === writeWord.value.toLowerCase()) {
                writeWord.value = "";
                score.textContent++;

                if ((WordsEasy.length && WordsNormal.length && WordsHard.length) > 0) {
                    GenerateWords();
                } else {
                    finishGame(FinalResults = "<h1 class='good result'>good <img src='./src/asset/icon-App/emoji-good.svg' alt=''></h1>");
                };

            } else {
                finishGame(FinalResults = "<h1 class='bad result'>bad <img src='./src/asset/icon-App/emoji-bad.svg' alt=''></h1>");
            };
        };

    }, 1000);
};


function GenerateWordsEasy(): void {
    for (let i = 0; i < WordsEasy.length; i++) {
        let div = document.createElement("div") as HTMLElement | any;
        div.className = "word"
        div.append(document.createTextNode(WordsEasy[i]));

        upcomingWords.appendChild(div);
    }

};

function GenerateWordsNormal(): void {
    for (let i = 0; i < WordsNormal.length; i++) {
        let div = document.createElement("div") as HTMLElement | any;
        div.className = "word"
        div.append(document.createTextNode(WordsNormal[i]));

        upcomingWords.appendChild(div);
    }
};

function GenerateWordsHard(): void {
    for (let i = 0; i < WordsHard.length; i++) {
        let div = document.createElement("div") as HTMLElement | any;
        div.className = "word"
        div.append(document.createTextNode(WordsHard[i]));

        upcomingWords.appendChild(div);
    }
};

let dataScoreEasy: str = "0";
let dataScoreNormal: str = "0";
let dataScoreHard: str = "0";

// finish game
function finishGame(results: str): void {
    let finish = document.createElement("div") as HTMLElement;
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

    checkedLastScore(
        document.querySelector<HTMLElement>(".one")?.textContent,
        document.querySelector<HTMLElement>(".two")?.textContent,
        document.querySelector<HTMLElement>(".three")?.textContent
    );

    test();
};

// check-score + date
let lastScoreEasy = document.querySelector(".last-score-easy") as HTMLElement;
let lastScoreNormal = document.querySelector(".last-score-normal") as HTMLElement;
let lastScoreHard = document.querySelector(".last-score-hard") as HTMLElement;

function checkedLastScore(lastScore: any, lastScore2: any, lastScore3: any): void {
    if (defaultLvlName == "Easy") {
        lastScoreEasy.textContent = lastScore;
    } else if (defaultLvlName == "Normal") {
        lastScoreNormal.textContent = lastScore2;
    } else {
        lastScoreHard.textContent = lastScore3;
    }

    window.localStorage.setItem("one", lastScore);
    window.localStorage.setItem("two", lastScore2);
    window.localStorage.setItem("three", lastScore3);
};

let dateOne = document.querySelector(".date-one") as HTMLElement;
let dateTwo = document.querySelector(".date-two") as HTMLElement;
let dateThree = document.querySelector(".date-three") as HTMLElement;

// date
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

    } else if (defaultLvlName == "Normal") {
        dateTwo.textContent = all;
        window.localStorage.setItem("time2", dateTwo.textContent);

    } else {
        dateThree.textContent = all;
        window.localStorage.setItem("time3", dateThree.textContent);

    }
};

// storage data app
function getDattaFromLocalStorage(): void {
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
};

getDattaFromLocalStorage();

// toggle the score record
document.addEventListener("click", (e: MouseEvent | any) => {
    const buttonActive: any = e.target.matches(".btn-score");
    console.log(buttonActive);

    if (!buttonActive && e.target.closest(".dropdown") != null) return;

    let currentDropDown: any;

    switch (buttonActive) {
        case true: {
            currentDropDown = e.target.closest(".dropdown");
            currentDropDown.classList.toggle("act-check-score");
            break;
        }

        default: {
            document.querySelector<HTMLElement | any>(".dropdown").classList.remove("act-check-score");
            break;
        }
    }
});


const buttonReloadApp = (): void => { window.location.reload() };

const darkModeMediaQuery: any = window.matchMedia('(prefers-color-scheme: dark)');

function handleDarkmode(e: MediaQueryList): void {
    const darkModeOn = e.matches; // true if dark mode is enabled
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement; // get favicon.ico element

    if (darkModeOn) {
        favicon.href = './src/asset/logo/logo-white.png';
    } else {
        favicon.href = './src/asset/logo/logo-dark.png';
    }
};

handleDarkmode(darkModeMediaQuery);
darkModeMediaQuery.addListener(handleDarkmode);