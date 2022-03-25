// import functions and grab DOM elements
import { signInUser, signUpUser, redirectToPolls } from './fetch-utils.js';

const signInForm = document.getElementById('sign-in');
const signUpForm = document.getElementById('sign-up');

// let state
redirectToPolls();

// set event listeners 
// get user input
// use user input to update state 
// update DOM to reflect the new state
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(signInForm);
    const user = await signInUser(data.get('email'), data.get('password'));

    if (user) {
        redirectToPolls();
    } else {
        console.error(user);
    }
});

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(signUpForm);
    const user = await signUpUser(data.get('email'), data.get('password'));

    if (user) {
        redirectToPolls();
    } else {
        console.error(user);
    }
});