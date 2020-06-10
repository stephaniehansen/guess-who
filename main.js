import characters from "./data/characters.js";
import questions from "./data/questions.js";

const cards = document.querySelectorAll(".card");
const selected = document.getElementById("questions");
let playersCard = "";
let computersCard = "";

const filterCards = (selectedQuestion) => {
    const matchedQuestion = questions.filter(question => {
        return question.id === selectedQuestion;
    })[0].match;

    const matchedCharacters = characters.filter(character => {
        return character[matchedQuestion];
    })
}

selected.addEventListener("change", (event) => {
    const selectedQuestion = selected.value;
    filterCards(selectedQuestion);
});

const generateQuestions = () => {
    questions.forEach(option => {
        document.getElementById("questions").innerHTML += `<option value="${option.id}">${option.question}</option>`;
    })
}

const generateCardSelection = () =>{
    return characters[Math.floor(Math.random()*characters.length)];
}

const startGame = () => {
    computersCard = generateCardSelection();
    generateQuestions();
}

cards.forEach(card => {
    card.addEventListener("click", (event) => {
        playersCard = card.textContent;
        startGame();
    })
});