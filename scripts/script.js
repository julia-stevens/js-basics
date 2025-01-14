const characterButtons = document.querySelectorAll(".character-section ul button");
const teamList = document.querySelector(".team-section ul");
const progress = document.querySelector("progress");
const teamCounter = document.querySelector("#team-counter span");

characterButtons.forEach(charactersButton => {
    charactersButton.addEventListener("click", addCharactertoTeam);
});

// event meegeven, zodat je kan achterhalen op welke button geklikt is
function addCharactertoTeam(event) {
    const characterButton = event.currentTarget;

    const characterImg = characterButton.querySelector("img");
    const characterName = characterImg.alt;
    const characterImgClone = characterImg.cloneNode();

    const deleteButton = document.createElement("button");
    deleteButton.ariaLabel = `verwijder ${characterName}`;
    deleteButton.addEventListener("click", removeCharacterFromTeam);

    // :empty selector --> gaat hier opzoek naar de eerste lege 
    const firstEmptySlot = teamList.querySelector("li:empty");

    firstEmptySlot.appendChild(characterImgClone);
    firstEmptySlot.appendChild(deleteButton);

    updateCounterAndProgress(1);
    checkInteractivityOfCharacterList();
    checkCompletenessOfTeam();
}

function removeCharacterFromTeam(event) {
    const deleteButton = event.currentTarget; // bepaal welke knop
    const slot = deleteButton.closest("li"); // eerste parent die li is
    const characterImg = slot.querySelector("img");

    deleteButton.remove();
    characterImg.remove();

    updateCounterAndProgress(-1);
    checkInteractivityOfCharacterList();
    checkCompletenessOfTeam();
}

function updateCounterAndProgress(delta) {
    progress.value = progress.value + delta;

    const currentCount = teamCounter.textContent;
    const newCount = currentCount - delta;
    teamCounter.textContent = newCount;
}

function checkInteractivityOfCharacterList() {
    const emptySlot = teamList.querySelector("li:empty");

    // niet compleet
    if (emptySlot) {
        characterButtons.forEach(characterButton => {
            characterButton.disabled = false;
        });
    }
    // wel compleet
    else {
        characterButtons.forEach(characterButton => {
            characterButton.disabled = true;
        });
    }
}

function checkCompletenessOfTeam() {
    const emptySlot = teamList.querySelector("li:empty");

    // niet compleet
    if (emptySlot) {
        teamList.classList.remove("is-complete");
    }
    // wel compleet
    else {
        teamList.classList.add("is-complete");
    }
}

// DEEL #2

const characterSections = document.querySelectorAll(".character-section");
const lists = document.querySelectorAll(".character-section ul");
const listButtons = document.querySelectorAll(".list-button");


pastHet()

window.addEventListener("resize", () => {
    pastHet()
})

function pastHet() {
    characterSections.forEach(characterSection => {
        checkInteractivityOfScrollButtons(characterSection);
    })
}


function checkInteractivityOfScrollButtons(characterSection) {
    // scroll width = scroll van ul
    // client width = ul op scherm zichtbaar

    const list = characterSection.querySelector("ul");
    const listWidth = list.clientWidth;
    const listScrollWidth = list.scrollWidth;

    const toLeftButton = characterSection.querySelector('[data-direction="left"]')
    const toRightButton = characterSection.querySelector('[data-direction="right"]')

    console.log(listWidth);
    console.log(listScrollWidth);

    // het past
    if (listWidth >= listScrollWidth) {
        toLeftButton.hidden = true
        toRightButton.hidden = true
    }
    // het past niet
    else {
        toLeftButton.hidden = false
        toRightButton.hidden = false
    }
}