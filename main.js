import characters from "./data/characters.js";
import questions from "./data/questions.js";

const selected = document.getElementById("questions");
const board = document.getElementById("grid");
const questionHTML = document.querySelector(".computer .question");
const buttons = document.querySelectorAll(".computer .btn");

let toBeAsked = [...questions];
let computersBoard = [...characters];
let playersBoard = [...characters];
let playersCard = "";
let computersCard = "";

const endCondition = () => {
    return playersBoard.length === 1 || computersBoard.length === 1;
}

const endGame = () => {    
    alert(`Game Over. Player has ${playersBoard.length} remaining cards and Computer has ${computersBoard.length}`);
}

const eliminate = (character) => {
    const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            if(card.textContent === character.name) {
                card.classList.add("eliminated");
            }
        })
}

const updateBoard = (player, selectedQuestion, cardToCheck, gameBoard) => {
    let key = "";
    let value = "";

    questions.forEach(question => {
        if(question.id === selectedQuestion) {
            key = question.match[0];
            value = question.match[1];
        }
    })

    return gameBoard.filter(character => {
        if (cardToCheck[key] === value) {
            if(character[key] !== value && player === true) {
                eliminate(character);
            } return character[key] === value;
        } else if (cardToCheck[key] !== value) {
            if(character[key] === value && player === true) {
                eliminate(character);
            } return character[key] !== value; 
        }
    })
}

const computersTurn = () => {
    const random = Math.floor(Math.random()*toBeAsked.length);
    const generated = toBeAsked[random];
    questionHTML.innerHTML = generated.question;
    toBeAsked.splice(random, 1);

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            selected.disabled = false;
            computersBoard = updateBoard(false, generated.id, playersCard, computersBoard);

            if(endCondition()) {
                endGame();
            }
        });
    });
}

const populateQuestions = () => {
    questions.forEach(option => {
        document.getElementById("questions").innerHTML += `<option value="${option.id}">${option.question}</option>`;
    })
}

const drawComputersCard = () => {
    return characters[Math.floor(Math.random()*characters.length)];
}

const setup = () => {
    characters.forEach(character => {
        board.innerHTML += `<div class="card">${character.name}</div>`;
    })
}

document.addEventListener("click", (event) => {
    if(event.target.matches(".card")) {
        event.preventDefault();
        playersCard = characters.filter(character => {
            return event.target.textContent === character.name})[0];
        computersCard = drawComputersCard();
        populateQuestions();
    }
}, {once:true});

document.addEventListener("change", (event) => {
    if(event.target.matches("#questions")){
        const selectedQuestion = selected.value;
        playersBoard = updateBoard(true, selectedQuestion, computersCard, playersBoard);
        selected.remove(selected.selectedIndex);
        selected.disabled = true;
        
        if(endCondition()) {
            endGame();
        } else {
            computersTurn();
        }
    }
});

setup();