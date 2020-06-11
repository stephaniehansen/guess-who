import characters from "./data/characters.js";
import questions from "./data/questions.js";

const selected = document.getElementById("questions");
const board = document.getElementById("grid");
let toBeAsked = [...questions];
let playersCard = "";
let computersCard = "";

const removeCards = (filteredCards) => {
    const cards = document.querySelectorAll(".card");

    filteredCards.forEach(match => {
        cards.forEach(card => {
            if(card.textContent === match.name){
                card.classList.add("eliminated");
            }
        })
    })
}

const filterCards = (selectedQuestion) => {
    let key = "";
    let value = "";

    questions.forEach(question => {
        if(question.id === selectedQuestion){
            key = question.match[0];
            value = question.match[1];
        }
    })

    const filteredCards = characters.filter(character => {
        if (computersCard[key] === value) {
            return character[key] !== value;
        } else if (computersCard[key] !== value) {         
            return character[key] === value; 
        }
    })
    removeCards(filteredCards);
}

const computerSelectQuestion = () => {
    const questionHTML = document.querySelector(".computers-questions .question");
    const buttons = document.querySelectorAll(".computers-questions button");
    const random = Math.floor(Math.random()*toBeAsked.length);
    let selectedQuestion = toBeAsked[random];

    questionHTML.innerHTML = selectedQuestion.question;
    toBeAsked.splice(random, 1);

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            selected.disabled = false;
            playerSelectQuestion();
        });
    });
}

const playerSelectQuestion = () => {
    selected.addEventListener("change", (event) => {
        const selectedQuestion = selected.value;
        filterCards(selectedQuestion);
        selected.remove(selected.selectedIndex);
        selected.disabled = true;
        computerSelectQuestion();
    });
}

const generateQuestions = () => {
    questions.forEach(option => {
        document.getElementById("questions").innerHTML += `<option value="${option.id}">${option.question}</option>`;
    })
}

const generateCardSelection = () => {
    return characters[Math.floor(Math.random()*characters.length)];
}

const startGame = () => {
    computersCard = generateCardSelection();
    generateQuestions();
    playerSelectQuestion();
}

const setup = () => {
    characters.forEach(character => {
        board.innerHTML += `<div class="card">${character.name}</div>`;
    })

    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("click", (event) => {
            playersCard = card.textContent;
            startGame();
        })
    });
}

setup();