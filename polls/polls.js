// import functions and grab DOM elements
import { logout, checkSession, createPoll, getPolls, deletePoll, updatePoll } from '../fetch-utils.js';
import { renderCurrentPoll, renderPastPoll } from '../render-utils.js';

const logoutButton = document.getElementById('logout');
const pollForm = document.getElementById('poll-form');
const currentPollEl = document.getElementById('current-poll-container');
const pastPollsEl = document.getElementById('past-polls-container');

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

window.addEventListener('load', async () => {
    displayAllPolls();
});

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
        displayCurrentPoll();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'option1-subtract') {
        votes1--;
        displayCurrentPoll();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'option2-add') {
        votes2++;
        displayCurrentPoll();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'option2-subtract') {
        votes2--;
        displayCurrentPoll();
    }
});

document.addEventListener('click', async (e) => {
    if (e.target.id === 'publish-poll') {
        const poll = { question:question, option1:option1, option2:option2, votes1:votes1, votes2:votes2 };
        await createPoll(poll);
        displayAllPolls();
        question = '';
        option1 = '';
        option2 = '';
        votes1 = 0;
        votes2 = 0;
        currentPollEl.textContent = '';
    }
});


logoutButton.addEventListener('click', async () => {
    await logout();
});

function displayCurrentPoll() {
    currentPollEl.textContent = '';
    const newPoll = renderCurrentPoll(question, option1, option2, votes1, votes2);
    currentPollEl.append(newPoll);
}

async function displayAllPolls() {
    pastPollsEl.textContent = '';
    const allPolls = await getPolls();
    for (let poll of allPolls) {
        const pastPoll = renderPastPoll(poll);
        pastPoll.setAttribute('id', poll.id);
        pastPollsEl.append(pastPoll);
    }
}

document.addEventListener('click', async (e) => {
    if (e.target.id === 'delete-poll') {
        if (confirm('Are you sure you want to delete this poll?') === true) {
            alert('Poll deleted');
            const pollId = e.path[2].id;
            await deletePoll(pollId);
            displayAllPolls();
        }
    }
});

document.addEventListener('click', async (e) => {
    if (e.target.id === 'edit-poll') {
        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirm Edits';
        confirmButton.id = 'confirm-edits';
        const editablePoll = e.path[2];
        editablePoll.removeChild(editablePoll.lastChild);
        editablePoll.append(confirmButton);
        const editableQuestion = editablePoll.childNodes[0];
        const editableOption1 = editablePoll.childNodes[1].childNodes[0];
        const editableOption2 = editablePoll.childNodes[2].childNodes[0];
        const editableVotes1 = editablePoll.childNodes[1].childNodes[2];
        const editableVotes2 = editablePoll.childNodes[2].childNodes[2];
        editableQuestion.setAttribute('contenteditable', 'true');
        editableOption1.setAttribute('contenteditable', 'true');
        editableOption2.setAttribute('contenteditable', 'true');
        editableVotes1.setAttribute('contenteditable', 'true');
        editableVotes2.setAttribute('contenteditable', 'true');
        editablePoll.style.fontStyle = 'italic';
        alert(`You can now edit past poll details for: ${editableQuestion.textContent}. After making changes, press CONFIRM EDITS.`);
        document.addEventListener('click', async (e) => {
            if (e.target.id === 'confirm-edits') {
                if (confirm('Press OK to confirm changes.') === true) {
                    alert('Poll details updated.');
                    const updatedPoll = { question:editableQuestion.textContent, 
                        option1:editableOption1.textContent, option2:editableOption2.textContent,
                        votes1:editableVotes1.textContent, votes2:editableVotes2.textContent };
                    const pollId = e.path[1].id;
                    await updatePoll(updatedPoll, pollId);
                    displayAllPolls();
                }
            }
        });
    }
});