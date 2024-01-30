'use strict';

window.addEventListener('load', () => {
    //Här kickar ni igång ert program
    document.querySelector(`#spela`).addEventListener(`click`, validateLogin);
});

function validateLogin () {
    event.preventDefault();

    const userNameNodeRef = document.querySelector(`#username`);
    const pWordNodeRef = document.querySelector(`#password`);
    const checkboxRef = document.querySelector(`#question`);
    const checkedName = users.some(user => user.username === userNameNodeRef.value);
    const userObject = users.filter(user => user.username === userNameNodeRef.value)

    try {
        if (checkedName === false) {
            throw {
                    nodeRef : userNameNodeRef,
                    msg: `Användarnamnet existerar inte`
            }
        }
        else if (userObject[0].password !== pWordNodeRef.value){
            throw {
                nodeRef : pWordNodeRef,
                msg: `Fel lösenord!`
        }
        }
        else if (!checkboxRef.checked){
            throw {
                nodeRef : checkboxRef,
                msg: `Du får inte vara rädd för spöken!`
        }
        }
        else {
            document.querySelector(`#formDiv`).classList.add(`d-none`);
            initiateGame();
        }
    } catch (error) {
        error.nodeRef.focus();
        document.querySelector(`#msg`).textContent = error.msg
        console.log(error);
    }
}

function initiateGame () {

    event.preventDefault();

    let ghostContainer = document.createElement(`div`);
    ghostContainer.classList.add(`ghost-container`);

    let mainRef = document.querySelector(`main`);
    mainRef.appendChild(ghostContainer);
    
    let randomAmountOfGhosts = Math.floor(Math.random() * 6) + 10;
    let lefty = oGameData.left();
    let toppy = oGameData.top();

    for (let i = 0; i < randomAmountOfGhosts; i++){

        let ghostImage = document.createElement(`img`);
        ghostImage.classList.add(`ghost-image`);
        ghostImage.src = `/resources/ghost.png`;
        ghostImage.alt = `Spooky image of ghost.`;
        ghostImage.style.left = lefty +`px`
        ghostImage.style.top = toppy +`px`

        
        ghostContainer.appendChild(ghostImage);

    }
}

