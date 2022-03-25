// import functions and grab DOM elements
import { logout, checkSession } from '../fetch-utils.js';
import { renderCurrentPoll } from '../render-utils.js';

const logoutButton = document.getElementById('logout');
const pollForm = document.getElementById('poll-form');
const currentGameEl = document.getElementById('current-poll-container');

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
    displayCurrentPoll();
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'option1-add') {
        votes1++;
        console.log('working');
        displayCurrentPoll();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'option1-subtract') {
        votes1--;
        console.log('working');
        displayCurrentPoll();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'option2-add') {
        votes2++;
        console.log('working');
        displayCurrentPoll();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'option2-subtract') {
        votes2--;
        console.log('working');
        displayCurrentPoll();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'publish-poll') {
        console.log('working');
    }
});

logoutButton.addEventListener('click', async () => {
    await logout();
});

function displayCurrentPoll() {
    currentGameEl.textContent = '';
    const newPoll = renderCurrentPoll(question, option1, option2, votes1, votes2);
    currentGameEl.append(newPoll);
}