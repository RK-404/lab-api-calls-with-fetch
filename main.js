const form  = document.querySelector("form");
const main = document.querySelector("main");
const BASE_URL = "https://opentdb.com/api.php?amount=10";

form.addEventListener("submit", (event) => {
    event.preventDefault();
    main.innerHTML = "";
    let category = document.getElementById("category").value;
    let difficulty = document.getElementById("difficulty").value;

    fetch(BASE_URL + category + difficulty)
    .then((response) => response.json())
    .then((json) => {
        json.results.forEach((result) => {
            createCard(result);
        })
    })
    .catch(displayError);
})

function createCard(result) {
    // console.log(result)
    let header = document.createElement("h2");
    header.textContent = result.category;

    let pTag = document.createElement("p");
    pTag.textContent = result.question;

    let button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Show Answer";

    let answer = document.createElement("p");
    answer.className = "hidden";
    answer.textContent = result.correct_answer;

    let article = document.createElement("article");
    article.className = "card";
    article.append(header, pTag, button, answer);
    main.append(article);

    if (result.difficulty === "hard") {
        article.style["border-color"] = "red";
    }
    else if (result.difficulty === "medium") {
        article.style["border-color"] = "orange";
    }

    button.addEventListener("click", (event) => {
        if (button.textContent === "Show Answer") {
            answer.classList.remove("hidden");
            button.textContent = "Hide Answer";
        }
        else if (button.textContent === "Hide Answer") {
            answer.classList.add("hidden");
            button.textContent = "Show Answer";
        }
        answer.style["font-weight"] = "bold";
    })
}

function displayError(error) {
    let header = document.createElement("h2");
    header.textContent = "Error Occured❗";
    
    let msg = document.createElement("p");
    msg.textContent = "Server did not respond!"

    let errorMsg = document.createElement("p");
    errorMsg.textContent = error;

    let article = document.createElement("article");
    article.className = "card";
    article.append(header, msg, errorMsg);
    main.append(article);
}
