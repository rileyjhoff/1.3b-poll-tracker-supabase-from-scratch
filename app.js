// import functions and grab DOM elements
import { signIn, signUp, redirectToPolls, getUser } from './fetch-utils.js';

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
    await signIn(data.get('email'), data.get('password'));
    
    const user = getUser(); 

    if (user) {
        redirectToPolls();
    } else {
        console.error(user);
    }
});

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(signUpForm);
    await signUp(data.get('email'), data.get('password'));
    
    const user = getUser(); 
    
    if (user) {
        redirectToPolls();
    } else {
        console.error(user);
    }
});