const USER_LS = 'currentUser';

const showUser = document.getElementById('jsUser');
const userForm = document.getElementById('jsUserForm');
const userInput = document.querySelector('#jsUserForm input');
const resetBtn = document.getElementById('jsResetName');
const todoContainer = document.getElementById('todo-container');
const scheduleContainer = document.getElementById('schedule-container');

const setUser = (userValue) => {
  userForm.classList.add('hiding');
  showUser.innerText = userValue;
  resetBtn.classList.remove('hiding');
  todoContainer.classList.remove('hiding');
  scheduleContainer.classList.remove('hiding');
};

const handleReset = () => {
  localStorage.removeItem(USER_LS);
  userForm.classList.remove('hiding');
  resetBtn.classList.add('hiding');
  todoContainer.classList.add('hiding');
  scheduleContainer.classList.add('hiding');
  showUser.innerText = 'What is your name?';
};

const handleSubmit = (event) => {
  event.preventDefault();
  resetBtn.classList.remove('hiding');
  const h2s = todoContainer.querySelectorAll('h2');
  const scheduleH2 = scheduleContainer.querySelector('h2');
  h2s.forEach((h2) => h2.classList.remove('hiding'));
  scheduleH2.classList.remove('hiding');

  todoContainer.classList.remove('hiding');
  scheduleContainer.classList.remove('hiding');
  const userValue = userInput.value;
  localStorage.setItem(USER_LS, userValue);
  setUser(userValue);
};

const askUser = () => {
  userForm.addEventListener('submit', handleSubmit);
};

const loadUser = () => {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askUser();
  } else {
    setUser(currentUser);
  }
};

function init() {
  loadUser();
  resetBtn.addEventListener('click', handleReset);
}

init();
