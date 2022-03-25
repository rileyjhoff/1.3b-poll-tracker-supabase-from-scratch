// import functions and grab DOM elements
import { logout, checkSession } from '../fetch-utils.js';

const logoutButton = document.getElementById('logout');

// let state
checkSession();

// set event listeners 
// get user input
// use user input to update state 
// update DOM to reflect the new state

logoutButton.addEventListener('click', async () => {
    await logout();
});