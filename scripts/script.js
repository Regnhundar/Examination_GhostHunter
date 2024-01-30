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

    // event.preventDefault();
console.log(`initiateGame()`);
    let ghostContainer = document.createElement(`div`);
    ghostContainer.classList.add(`ghost-container`);

    let mainRef = document.querySelector(`main`);
    mainRef.appendChild(ghostContainer);
    
    let randomAmountOfGhosts = Math.floor(Math.random() * 6) + 10;


    for (let i = 0; i < randomAmountOfGhosts; i++){

        let lefty = oGameData.left();
        let toppy = oGameData.top();

        let ghostImage = document.createElement(`img`);
        ghostImage.classList.add(`ghost-image`);
        ghostImage.alt = `Spooky image of ghost.`;
        ghostImage.src = `/resources/ghost.png`;
        ghostImage.style.left = lefty +`px`
        ghostImage.style.top = toppy +`px`
        ghostContainer.appendChild(ghostImage);

        ghostImage.addEventListener(`mouseenter`, () => {
            ghostImage.classList.toggle(`d-none`)
            netImage.classList.toggle(`d-none`)
        })



        let netImage = document.createElement(`img`);



        netImage.alt = `Spooky image of net.`;

        netImage.src = `/resources/net.png`;

        netImage.style.left = lefty +`px`

        netImage.style.top = toppy +`px`


        ghostContainer.appendChild(netImage);
        netImage.classList.add(`d-none`);
        netImage.addEventListener(`mouseenter`, () => {
            netImage.classList.toggle(`d-none`)
            ghostImage.classList.toggle(`d-none`)
        })

        console.log(`Ej erorr`);
    }
}

