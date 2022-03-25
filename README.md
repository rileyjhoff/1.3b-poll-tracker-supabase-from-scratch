## The Golden Rule: 

🦸 🦸‍♂️ `Stop starting and start finishing.` 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

## Making a plan

1) **Make a drawing of your app. Simple "wireframes"**
1) **Look at the drawing and name the HTML elements you'll need to realize your vision**
1) **Look at the drawing and imagine using the app. What _state_ do you need to track?**
1) **For each HTML element ask: Why do I need this? (i.e., "we need div to display the results in")**
1) **Once we know _why_ we need each element, think about how to implement the "Why" as a "How" (i.e., `resultsEl.textContent = newResults`)**
1) **Find all the 'events' (user clicks, form submit, on load etc) in your app. Ask one by one, "What happens when" for each of these events. Does any state change? Does any DOM update?**
1) **Think about how to validate each of your features according to a Definition of Done. (Hint: console.log usually helps here.)**
1) **Consider what features _depend_ on what other features. Use this dependency logic to figure out what order to complete tasks.**

Additional considerations:

- Ask: which of your HTML elements need to be hard coded, and which need to be dynamically generated?
- Consider your data model.
  - What kinds of objects (i.e., Dogs, Friends, Todos, etc) will you need?
  - What are the key/value pairs?
  - What arrays might you need?
  - What needs to live in a persistence layer?
- Is there some state we need to initialize?
- Ask: should any of this work be abstracted into functions? (i.e., is the work complicated? can it be reused?)

# Grading Rubric

| User should be able to . . .                                                         |             |
| :----------------------------------------------------------------------------------- | ----------: |
| Visit the deployed pages on GitHub pages, with link in the About section of the Github repo|        1 |

| Events  `                                                                            |             |
| :----------------------------------------------------------------------------------- | ----------: |
| On the home page (`'/'`), Login and Signup using the login and signup form. On success, redirect to the `/polls` page   |        2 |
| Logout by clicking the logout button                                                       |        1 |
| If a non-logged-in user tries to visit the polls page, redirect them to the login page | 1 |
| On the polls page load, see a form and empty current poll div                              |        2 |
| On the polls page load, fetch all past polls and render them to the past polls div         |        2 |
| On submit, add the poll options and question to the current poll div.  Use the `displayCurrentPollEl` function to do this                                   |        1 |
| On clicking add increment the correct votes in the current poll div. Use the `displayCurrentPollEl` function to do this. |     1 |
| On clicking finish, empty the current poll div, and use supabase to add the current poll to the database. |1|
| On clicking finish, clear the past polls div, then fetch all past polls from supabase and render them in the past polls div. Do this in a function called `displayAllPolls` |2|

| Functions                                                              |             |
| :----------------------------------------------------------------------------------- | ----------: |
| IMPURE: `displayCurrentPollEl()` : displays the current poll state to the current poll DOM element | 1|
| IMPURE: `displayAllPolls()` : clears out and appends to polls div | 1|
| PURE (stretch: with TDD): `renderPoll(poll)` : returns DOM node | 1|
| ASYNC (stretch: with TDD): `createPoll(poll)` : creates a poll for currently logged in user in supabase |1|
| ASYNC (stretch: with TDD): `getPolls()` : returns polls for currently logged in user from supabase |1|

# Plan

## Order

1. hard code html for sign in/up and polls pages
2. style hard coded html
3. sign in page set up
    1. form event listeners
    2. supabase fetch function
        - sign in function
        - sing up function
        - redirect function
        - authenticate/user function
4. polls page set up
    1. form event listener
        - updates current poll state (questions & options)
    2. render poll function
    3. display poll function
        - clears current poll container
        - calls render poll function
        - appends to current poll container
    4. vote increment/decrement event listeners
        - updates current poll state (votes)
        - calls display poll function
    5. supabase fetch functions
        - create a poll function
            - inserts current poll state to a row in supabase
        - get polls function
            - fetches all rows of poll data from supabase
        - logout function
    6. display past polls function
        - clears past poll container
        - gets past poll data via getPolls function
        - loop through array of past poll data
            - calls render poll for each object of data
            - appends to past poll container
    7. on load event listener
        - calls display past polls function
    8. publish poll event listener
        - calls create a poll function
        - clears current poll container
        - resets state
        - calls display past polls function
    9. logout event listener
        - calls supabase logout function (redirects user to sign in/up page)
5. stretch goals / styling

# Sign In/Up Page

![sign in/up page wireframes](/assets/sign-in-up-wireframes.png)

## HTML Setup

- sign in div
  - sign in h3
  - sign in form
    - email label/input
    - password label/input
    - submit button
- sign up div
  - sign up h3
  - sign up form
    - email label/input
    - password label/input
    - submit button

## Events

- user signs in or signs up
  - get the username and password
  - log in the user via supabase
  - redirect to polls page (if user is still signed in, automatically redirect to polls page)

# Polls Page

![polls page wireframes](/assets/polls-wireframes.png)

## HTML Setup

- logout button (not in wireframes)
  - in header
- top div/section
  - create a poll div
    - create a poll header
    - poll form
      - question label/input
      - option 1 label/input
      - option 2 label/input
      - launch poll (submit) button
  - current poll div
    - current poll header
    - current poll state container (div) - dynamically render and append following
      - question & options div
        - question header
        - option p tags
          - span for vote state
        - publish poll button (not in wireframes)
      - voting div
        - voting header
        - buttons div
          - option 1 button div
            - option 1 p tag
            - add & subtract buttons
          - option 2 button div
            - option 2 p tag
            - add & subtract buttons
  - current poll div
- bottom div/section
  - past polls header (h2?)
  - past polls container (div)
    - dynamically render and append past polls with user data to this container

## Events

- user launches a poll (via form submit)
  - get poll question and options from the form & add to current poll state
  - clear form
  - dynamically render and append the current poll state to the current poll container
- user votes on poll
  - update vote state
  - clear current poll container
  - dynamically render and append the current poll state to the current poll container
- user publishes a poll
  - store data in supabase
  - reset current poll state
  - clear current poll container
  - clear past poll container
  - fetch user's poll data from supabase
  - dynamically render and append past polls to the past poll container
- past polls display on load
  - fetch user's poll data from supabase
  - dynamically render and append past polls to the past poll container
