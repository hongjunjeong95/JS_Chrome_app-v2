const PENDING_LS = "pending";
const FINISHED_LS = "finished";

const todoForm = document.getElementById("jsTodoForm");
const input = todoForm.querySelector("input");
const pendingList = document.getElementById("jsPendingList");
const finishedList = document.getElementById("jsFinishedList");

let pendings = [];
let dones = [];

const saveList = (list, data) => {
  localStorage.setItem(list, JSON.stringify(data));
};

const handleChange = (event, option) => {
  const target = event.target;
  const li = target.parentNode;
  const span = li.childNodes[5];
  const text = span.innerHTML;
  paintTodo(text, option);
  handleDelete(event);
};

const handleFinish = (event) => {
  handleChange(event, FINISHED_LS);
};

const handlePending = (event) => {
  handleChange(event, PENDING_LS);
};

const handleDelete = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  if (ul.id === "jsPendingList") {
    pendingList.removeChild(li);
    const cleanPendings = pendings.filter(function (todo) {
      return todo.id !== parseInt(li.id);
    });
    pendings = cleanPendings;

    for (let i = 0; i < pendings.length; i++) {
      pendings[i].id = i + 1;
    }

    for (let i = 0; i < pendingList.childNodes.length; i++) {
      pendingList.childNodes[i].id = i + 1;
    }

    saveList(PENDING_LS, pendings);
  } else if (ul.id === "jsFinishedList") {
    finishedList.removeChild(li);
    const cleanDones = dones.filter(function (todo) {
      return todo.id !== parseInt(li.id);
    });
    dones = cleanDones;

    for (let i = 0; i < dones.length; i++) {
      dones[i].id = i + 1;
    }

    for (let i = 0; i < finishedList.childNodes.length; i++) {
      finishedList.childNodes[i].id = i + 1;
    }

    saveList(FINISHED_LS, dones);
  }
};

const downIdRenewal = (option, li) => {
  let temp;

  if (option === PENDING_LS) {
    temp = pendings[li.id];
    pendings[li.id] = pendings[li.id - 1];
    pendings[li.id - 1] = temp;

    for (let i = 0; i < pendings.length; i++) {
      pendings[i].id = i + 1;
    }
  } else if (option === FINISHED_LS) {
    temp = dones[li.id];
    dones[li.id] = dones[li.id - 1];
    dones[li.id - 1] = temp;

    for (let i = 0; i < dones.length; i++) {
      dones[i].id = i + 1;
    }
  }
};

const handleDown = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  if (ul.id === "jsPendingList") {
    const nextLi = pendings.find((pending) => {
      return pending.id === parseInt(li.id) + 1;
    });
    if (nextLi === undefined) return;

    const nextLiId = nextLi.id;
    downIdRenewal(PENDING_LS, li);

    for (let i = 0; i < pendingList.childNodes.length; i++) {
      if (parseInt(pendingList.childNodes[i].id) === nextLiId) {
        pendingList.insertBefore(pendingList.childNodes[i], li);
      }
    }

    for (let i = 0; i < pendingList.childNodes.length; i++) {
      pendingList.childNodes[i].id = i + 1;
    }

    saveList(PENDING_LS, pendings);
  } else if (ul.id === "jsFinishedList") {
    const nextLi = dones.find((done) => {
      return done.id === parseInt(li.id) + 1;
    });
    if (nextLi === undefined) return;

    const nextLiId = nextLi.id;
    downIdRenewal(FINISHED_LS, li);
    ///

    for (let i = 0; i < finishedList.childNodes.length; i++) {
      if (parseInt(finishedList.childNodes[i].id) === nextLiId) {
        finishedList.insertBefore(finishedList.childNodes[i], li);
      }
    }

    for (let i = 0; i < finishedList.childNodes.length; i++) {
      finishedList.childNodes[i].id = i + 1;
    }

    saveList(FINISHED_LS, dones);
  }
};

const upIdRenewal = (option, li) => {
  let temp;

  if (option === PENDING_LS) {
    temp = pendings[li.id - 2];
    pendings[li.id - 2] = pendings[li.id - 1];
    pendings[li.id - 1] = temp;

    for (let i = 0; i < pendings.length; i++) {
      pendings[i].id = i + 1;
    }
  } else if (option === FINISHED_LS) {
    temp = dones[li.id - 2];
    dones[li.id - 2] = dones[li.id - 1];
    dones[li.id - 1] = temp;

    for (let i = 0; i < dones.length; i++) {
      dones[i].id = i + 1;
    }
  }
};

const handleUp = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  if (ul.id === "jsPendingList") {
    const prevLi = pendings.find((pending) => {
      return pending.id === parseInt(li.id) - 1;
    });
    console.log(prevLi);
    if (prevLi === undefined) return;

    const prevLiId = prevLi.id;
    upIdRenewal(PENDING_LS, li);

    for (let i = 0; i < pendingList.childNodes.length; i++) {
      if (pendingList.childNodes[i].id === li.id) {
        pendingList.insertBefore(li, pendingList.childNodes[prevLiId - 1]);
      }
    }

    for (let i = 0; i < pendingList.childNodes.length; i++) {
      pendingList.childNodes[i].id = i + 1;
    }

    saveList(PENDING_LS, pendings);
  } else if (ul.id === "jsFinishedList") {
    const prevLi = dones.find((done) => {
      return done.id === parseInt(li.id) - 1;
    });
    if (prevLi === undefined) return;

    const prevLiId = prevLi.id;
    upIdRenewal(FINISHED_LS, li);

    for (let i = 0; i < finishedList.childNodes.length; i++) {
      if (finishedList.childNodes[i].id === li.id) {
        finishedList.insertBefore(li, finishedList.childNodes[prevLiId - 1]);
      }
    }

    for (let i = 0; i < finishedList.childNodes.length; i++) {
      finishedList.childNodes[i].id = i + 1;
    }

    saveList(FINISHED_LS, dones);
  }
};

const handleAmendInput = (event, option) => {
  event.preventDefault();
  const form = event.target;
  const li = form.parentNode;
  const span = li.childNodes[5];
  const input = form.querySelector("input");
  const text = input.value;
  span.innerHTML = text;
  li.removeChild(form);

  if (option === "jsPendingList") {
    pendings.forEach(function (todo) {
      if (todo.id === parseInt(li.id)) {
        todo.text = text;
      }
    });
    saveList(PENDING_LS, pendings);
  } else if (option === "jsFinishedList") {
    dones.forEach(function (todo) {
      if (todo.id === parseInt(li.id)) {
        todo.text = text;
      }
    });
    saveList(PENDING_LS, dones);
  }
};

const handleAmend = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  const span = li.childNodes[5];
  const input = document.createElement("input");
  const form = document.createElement("form");

  input.value = span.innerHTML;
  form.appendChild(input);
  li.appendChild(form);
  span.innerHTML = "";

  if (ul.id === "jsPendingList") {
    form.addEventListener("submit", (event) =>
      handleAmendInput(event, "jsPendingList")
    );
  } else if (ul.id === "jsFinishedList") {
    form.addEventListener("submit", (event) =>
      handleAmendInput(event, "jsFinishedList")
    );
  }
};

const genericElement = () => {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const upBtn = document.createElement("button");
  const downBtn = document.createElement("button");
  const amendBtn = document.createElement("butoon");

  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", handleDelete);
  li.appendChild(delBtn);

  upBtn.innerHTML = "🔼";
  upBtn.addEventListener("click", handleUp);
  li.appendChild(upBtn);

  downBtn.innerHTML = "🔽";
  downBtn.addEventListener("click", handleDown);
  li.appendChild(downBtn);

  amendBtn.innerHTML = "✍";
  amendBtn.addEventListener("click", handleAmend);
  li.appendChild(amendBtn);

  return li;
};

const paintTodo = (text, option) => {
  const li = genericElement();
  const span = document.createElement("span");
  const finBtn = document.createElement("button");
  const todoBtn = document.createElement("button");
  let id = 0;

  finBtn.innerHTML = "✅";
  finBtn.addEventListener("click", handleFinish);
  todoBtn.innerHTML = "⏪";
  todoBtn.addEventListener("click", handlePending);

  if (option === PENDING_LS) {
    li.appendChild(finBtn);
    id = pendings.length + 1;
    li.id = id;
    pendingList.appendChild(li);
  } else if (option === FINISHED_LS) {
    li.appendChild(todoBtn);
    id = dones.length + 1;
    li.id = id;
    finishedList.appendChild(li);
  }
  span.innerHTML = text;
  li.appendChild(span);

  const textObj = {
    text: text,
    id: id,
  };

  if (option === PENDING_LS) {
    pendings.push(textObj);
    saveList(PENDING_LS, pendings);
  } else if (option === FINISHED_LS) {
    dones.push(textObj);
    saveList(FINISHED_LS, dones);
  }
};

const handleTodoSubmit = (event) => {
  event.preventDefault();
  // const h2s = todoContainer.querySelectorAll('h2');
  // h2s.forEach((h2) => h2.classList.remove('hiding'));
  const todoInput = input.value;
  paintTodo(todoInput, PENDING_LS);
  input.value = "";
};

const askTodo = () => {
  todoForm.addEventListener("submit", handleTodoSubmit);
};

const loadTodo = () => {
  const todo = localStorage.getItem(PENDING_LS);
  const done = localStorage.getItem(FINISHED_LS);
  if (todo !== null) {
    const parsedTodos = JSON.parse(todo);
    parsedTodos.forEach((todo) => {
      paintTodo(todo.text, PENDING_LS);
    });
  }
  if (done !== null) {
    const parsedDones = JSON.parse(done);
    parsedDones.forEach((done) => {
      paintTodo(done.text, FINISHED_LS);
    });
  }
};

function init() {
  loadTodo();
  askTodo();
}

init();
