// import functions and grab DOM elements
import { logout, checkSession } from '../fetch-utils.js';
import {} from '../render-utils.js';

const logoutButton = document.getElementById('logout');
const pollForm = document.getElementById('poll-form');

// let state
checkSession();
let question = '';
let option1 = '';
let option2 = '';
let votes1 = 0;
let votes2 = 0;

// set event listeners 
// get user input
// use user input to update state 
// update DOM to reflect the new state

pollForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(pollForm);
    question = data.get('question');
    option1 = data.get('option1');
    option2 = data.get('option2');
    pollForm.reset();
});

logoutButton.addEventListener('click', async () => {
    await logout();
});