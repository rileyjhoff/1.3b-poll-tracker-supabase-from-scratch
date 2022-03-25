{/* <div class="current">
    <div class="question-container">
        <h3>What is this going to look like?</h3>
        <p>Option 1: 0</p>
        <p>Option 2: 0</p>
        <button id="publish-poll">Publish Poll</button>
    </div>
    <div class="voting-container">
        <h3>Voting</h3>
        <p>Option 112312312312312</p>
        <div class="voting-buttons">
            <button id="option1-add">+</button>
            <button id="option1-subtract">-</button>
        </div>
        <p>Option 2</p>
        <div class="voting-buttons">
            <button id="option2-add">+</button>
            <button id="option2-subtract">-</button>
        </div>
    </div>
</div> */}

export function renderCurrentPoll(question, option1, option2, votes1, votes2) {
    const pollDiv = document.createElement('div');
    const questionDiv = document.createElement('div');
    const questionEl = document.createElement('h3');
    const option1El = document.createElement('p');
    const option2El = document.createElement('p');
    const publishPollButton = document.createElement('button');
    const votingDiv = document.createElement('div');
    const votingEl = document.createElement('h3');
    const option1LabelEl = document.createElement('p');
    const option1ButtonDiv = document.createElement('div');
    const option1AddButton = document.createElement('button');
    const option1SubtractButton = document.createElement('button');
    const option2LabelEl = document.createElement('p');
    const option2ButtonDiv = document.createElement('div');
    const option2AddButton = document.createElement('button');
    const option2SubtractButton = document.createElement('button');

    pollDiv.classList.add('current');
    questionDiv.classList.add('question-container');
    votingDiv.classList.add('voting-container');
    option1ButtonDiv.classList.add('voting-buttons');
    option2ButtonDiv.classList.add('voting-buttons');
    publishPollButton.setAttribute('id', 'publish-poll');
    option1AddButton.setAttribute('id', 'option1-add');
    option1SubtractButton.setAttribute('id', 'option1-subtract');
    option2AddButton.setAttribute('id', 'option2-add');
    option2SubtractButton.setAttribute('id', 'option2-subtract');

    questionEl.textContent = question;
    option1El.textContent = option1 + ': ' + votes1;
    option2El.textContent = option2 + ': ' + votes2;
    publishPollButton.textContent = 'Publish Poll';
    votingEl.textContent = 'Voting';
    option1LabelEl.textContent = option1;
    option1AddButton.textContent = '+';
    option1SubtractButton.textContent = '-';
    option2LabelEl.textContent = option2;
    option2AddButton.textContent = '+';
    option2SubtractButton.textContent = '-';

    questionDiv.append(questionEl, option1El, option2El, publishPollButton);
    option1ButtonDiv.append(option1AddButton, option1SubtractButton);
    option2ButtonDiv.append(option2AddButton, option2SubtractButton);
    votingDiv.append(votingEl, option1LabelEl, option1ButtonDiv, option2LabelEl, option2ButtonDiv);
    pollDiv.append(questionDiv, votingDiv);

    return pollDiv;
}

{/* <div class="past">
    <h3>What is this going to look like? when i stretch it out this far</h3>
    <p>Option 1: 0</p>
    <p>Option 2: 0</p>
    <div>
        <button id="edit-poll">Edit</button>
        <button id="delete-poll">Delete</button>
    </div>
</div> */}

export function renderPastPoll(poll) {
    const pollDiv = document.createElement('div');
    const questionEl = document.createElement('h3');
    const option1El = document.createElement('p');
    const option1NameEl = document.createElement('span');
    const votes1El = document.createElement('span');
    const option2El = document.createElement('p');
    const option2NameEl = document.createElement('span');
    const votes2El = document.createElement('span');
    const buttonDiv = document.createElement('div');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    pollDiv.classList.add('past');
    buttonDiv.classList.add('hide');
    editButton.setAttribute('id', 'edit-poll');
    deleteButton.setAttribute('id', 'delete-poll');

    questionEl.textContent = poll.question;
    option1NameEl.textContent = poll.option1;
    votes1El.textContent = poll.votes1;
    option2NameEl.textContent = poll.option2;
    votes2El.textContent = poll.votes2;
    editButton.textContent = 'Edit';
    deleteButton.textContent = 'Delete';

    option1El.append(option1NameEl);
    option1El.append(': ');
    option1El.append(votes1El);
    option2El.append(option2NameEl);
    option2El.append(': ');
    option2El.append(votes2El);
    buttonDiv.append(editButton, deleteButton);
    pollDiv.append(questionEl, option1El, option2El, buttonDiv);

    return pollDiv;
}