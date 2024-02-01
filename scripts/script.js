'use strict';

// För träning så lade vi till klasser i html från vår javaScript.

window.addEventListener('load', () => {
    //Här kickar ni igång ert program
    document.querySelector(`#spela`).addEventListener(`click`, validateLogin);
    let form = document.querySelector(`#formDiv`);
    form.classList.add(`login-form`);
    document.querySelector(`#username`).classList.add(`username-input`);
    document.querySelector(`#password`).classList.add(`password-input`);
    document.querySelector(`#spela`).classList.add(`play-button`);

    // Då querySelectorAll returnerar en lista av nodes (typ array) så behöver vi göra en forEach loop för att sätta klasser på dem.
    let allLabels = document.querySelectorAll(`#formDiv label`);
    allLabels.forEach(label => label.classList.add(`login-label`));

    document.querySelector(`#msg`).classList.add(`winner-msg`);

    // Vi ville inte styla på id och satte då en klass på det fjärde barnet i form-elementet.
    document.querySelector(`form div:nth-child(4)`).classList.add(`checkbox-container`);

    // För att centrera vårt formulär så skapade vi en div som vi sedan lade redan existerande element i och stylade sedan på wrappern.
    let formWrapper = document.createElement(`div`);
    formWrapper.classList.add(`form-wrapper`);
    // Lägger in formWrapper före form i DOM.
    form.parentNode.insertBefore(formWrapper, form);
    // Möblerar om och lägger form inuti formWrapper.
    formWrapper.appendChild(form);


});

function validateLogin (event) {
    // För att inte ladda om sidan när formuläret skickas används preventDefault()
    event.preventDefault();

    const userNameNodeRef = document.querySelector(`#username`);
    const pWordNodeRef = document.querySelector(`#password`);
    const checkboxRef = document.querySelector(`#question`);
    // Some metoden returnerar en boolean. Vi kollar om det som är skrivet i fältet för användarnamn existerar i vår lista av users.
    const checkedName = users.some(user => user.username === userNameNodeRef.value);
    // Find metoden returnerar det object som har användarnamnet som är inskrivet.
    const userObject = users.find(user => user.username === userNameNodeRef.value);

    // För att sidan ska kunna fortsätta även vid error används try catch.
    try {
        // Om användarnamnet inte finns.
        if (checkedName === false) {
            throw {
                    nodeRef : userNameNodeRef,
                    msg: `Användarnamnet existerar inte`
            }
        }
        // Kollar objektets password och jämför med vad som är inskrivet i password-fältet. Om det inte överensstämmer triggas else if.
        else if (userObject.password !== pWordNodeRef.value){
            throw {
                nodeRef : pWordNodeRef,
                msg: `Fel lösenord!`
        }
        }
        // Om inte checkboxen är ikryssad triggas else if.
        else if (!checkboxRef.checked){
            throw {
                nodeRef : checkboxRef,
                msg: `Du får inte vara rädd för spöken!`
        }
        }
        // Om inget av våra kontroller triggas så går vi vidare och döljer formuläret genom att lägga till klassen d-none som har styling display: none
        else {
            document.querySelector(`#formDiv`).classList.add(`d-none`);
            initiateGame();
        }
        // Alla error som triggas genom if-satserna skickas hit som ett objekt. Vi kollar värdet på objektets nodeRef. Vilket är en referens till ett input-fält.
        // vi highlightar aktuellt fält där felet är. Sedan ändrar vi texten på span-elementet till objektets ifyllda värde på msg.
    } catch (error) {
        error.nodeRef.focus();
        document.querySelector(`#msg`).textContent = error.msg;
    }
}

function initiateGame () {

    let ghostContainer = document.createElement(`div`);
    ghostContainer.classList.add(`ghost-container`);
    let mainRef = document.querySelector(`main`);
    mainRef.appendChild(ghostContainer);
    
    oGameData.ghostsToCatch = Math.floor(Math.random() * 6) + 10;

    oGameData.caughtGhosts = oGameData.ghostsToCatch;

    for (let i = 0; i < oGameData.ghostsToCatch; i++){

        let lefty = oGameData.left();
        let toppy = oGameData.top();
        
        let ghostImage = document.createElement(`img`);
        ghostImage.classList.add(`ghost-image`);
        ghostImage.alt = `Spooky image of ghost.`;
        ghostImage.src = `/resources/ghost.png`;
        ghostImage.style.left = lefty +`px`;
        ghostImage.style.top = toppy +`px`;
        ghostContainer.appendChild(ghostImage);

        ghostImage.addEventListener(`mouseenter`, pointGoesDown);

        let netImage = document.createElement(`img`);
        netImage.alt = `Spooky image of net.`;
        netImage.src = `/resources/net.png`;
        netImage.style.left = lefty +`px`;
        netImage.style.top = toppy +`px`;
        ghostContainer.appendChild(netImage);
        netImage.classList.add(`d-none`, `net-image`);
        netImage.addEventListener(`mouseenter`, pointGoesUp);
    }
}


function pointGoesDown () {
    event.target.classList.toggle(`d-none`);
    event.target.nextElementSibling.classList.toggle(`d-none`);
    oGameData.ghostsToCatch--;
    gameOver();
}

function pointGoesUp () {
    event.target.classList.toggle(`d-none`);
    event.target.previousElementSibling.classList.toggle(`d-none`);
    oGameData.ghostsToCatch++;
}

function gameOver () {

    if (oGameData.ghostsToCatch === 0) {
        document.querySelector(`#formDiv`).classList.toggle(`d-none`);
        let winnerMsg = document.querySelector(`#msg`);
        let loggedInUser = document.querySelector(`#username`).value;
        winnerMsg.textContent = `Grattis ${loggedInUser} du fångade ${oGameData.caughtGhosts} spöken!`;
        winnerMsg.style.color = `green`;
        let ghostContainer = document.querySelector(`.ghost-container`);
        ghostContainer.remove();
    }
}