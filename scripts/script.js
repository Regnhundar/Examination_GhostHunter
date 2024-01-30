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
            initiateGame();
        }
    } catch (error) {
        error.nodeRef.focus();
        document.querySelector(`#msg`).textContent = error.msg
        console.log(error);
    }
    
    console.log(`validateLogin()`);
}
