const USER_LS = 'currentUser';

const showUser = document.getElementById('jsUser');
const userForm = document.getElementById('jsUserForm');
const userInput = document.querySelector('#jsUserForm input');

const setUser = (userValue) => {
  userForm.classList.add('hiding');
  showUser.innerText = userValue;
};

const handleSubmit = (event) => {
  event.preventDefault();
  const userValue = userInput.value;
  localStorage.setItem(USER_LS, userValue);
  setUser(userValue);
};

const askUser = () => {
  userForm.classList.remove('hiding');
  userForm.addEventListener('submit', handleSubmit);
};

const loadUser = () => {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askUser();
  } else {
    console.log('ask');
    setUser(currentUser);
  }
};

const init = () => {
  loadUser();
};

init();
