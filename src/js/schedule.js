const SCHEDULE_LS = 'schedule';

const scheduleForm = document.getElementById('jsScheduleForm');
const scheduleInput = scheduleForm.querySelectorAll('input');
const scheduleList = document.getElementById('jsScheduleList');

let schedules = [];

const saveScheduleList = (data) => {
  localStorage.setItem(SCHEDULE_LS, JSON.stringify(data));
};

const handleDeleteSchedule = (event) => {
  const btn = event.target;
  const li = btn.parentNode;

  scheduleList.removeChild(li);
  const cleanSchedules = schedules.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  schedules = cleanSchedules;

  for (let i = 0; i < schedules.length; i++) {
    schedules[i].id = i + 1;
  }

  for (let i = 0; i < scheduleList.childNodes.length; i++) {
    scheduleList.childNodes[i].id = i + 1;
  }

  saveScheduleList(schedules);
};

const scheduleDownIdRenewal = (li) => {
  let temp;

  temp = schedules[li.id];
  schedules[li.id] = schedules[li.id - 1];
  schedules[li.id - 1] = temp;

  for (let i = 0; i < schedules.length; i++) {
    schedules[i].id = i + 1;
  }
};

const handleScheduleDown = (event) => {
  const btn = event.target;
  const li = btn.parentNode;

  const nextLi = schedules.find((schedule) => {
    return schedule.id === parseInt(li.id) + 1;
  });
  if (nextLi === undefined) return;

  const nextLiId = nextLi.id;
  scheduleDownIdRenewal(li);

  for (let i = 0; i < scheduleList.childNodes.length; i++) {
    if (parseInt(scheduleList.childNodes[i].id) === nextLiId) {
      scheduleList.insertBefore(scheduleList.childNodes[i], li);
    }
  }

  for (let i = 0; i < scheduleList.childNodes.length; i++) {
    scheduleList.childNodes[i].id = i + 1;
  }

  saveScheduleList(schedules);
};

const scheduleUpIdRenewal = (li) => {
  let temp;

  temp = schedules[li.id - 2];
  schedules[li.id - 2] = schedules[li.id - 1];
  schedules[li.id - 1] = temp;

  for (let i = 0; i < schedules.length; i++) {
    schedules[i].id = i + 1;
  }
};

const handleScheduleUp = (event) => {
  const btn = event.target;
  const li = btn.parentNode;

  const prevLi = schedules.find((schedule) => {
    return schedule.id === parseInt(li.id) - 1;
  });
  if (prevLi === undefined) return;

  const prevLiId = prevLi.id;
  scheduleUpIdRenewal(li);

  for (let i = 0; i < scheduleList.childNodes.length; i++) {
    if (scheduleList.childNodes[i].id === li.id) {
      scheduleList.insertBefore(li, scheduleList.childNodes[prevLiId - 1]);
    }
  }

  for (let i = 0; i < scheduleList.childNodes.length; i++) {
    scheduleList.childNodes[i].id = i + 1;
  }

  saveScheduleList(schedules);
};

const scheduleGenericElement = () => {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const upBtn = document.createElement('button');
  const downBtn = document.createElement('button');

  delBtn.innerHTML = '❌';
  delBtn.addEventListener('click', handleDeleteSchedule);
  li.appendChild(delBtn);

  upBtn.innerHTML = '🔼';
  upBtn.addEventListener('click', handleScheduleUp);
  li.appendChild(upBtn);

  downBtn.innerHTML = '🔽';
  downBtn.addEventListener('click', handleScheduleDown);
  li.appendChild(downBtn);

  return li;
};

const paintSchedule = (text) => {
  const li = scheduleGenericElement();
  const span = document.createElement('span');
  let id = 0;

  id = schedules.length + 1;
  li.id = id;
  scheduleList.appendChild(li);

  span.innerHTML = text;
  li.appendChild(span);

  const textObj = {
    text,
    id,
  };

  schedules.push(textObj);
  saveScheduleList(schedules);
};

const handleScheduleSubmit = (event) => {
  event.preventDefault();
  const h2 = scheduleContainer.querySelector('h2');
  h2.classList.remove('hiding');
  const date = scheduleInput[0].value.split('-');
  console.log(date);
  const inputValue = `${date[1]}-${date[2]} ${scheduleInput[1].value}`;
  paintSchedule(inputValue);
  scheduleInput[1].value = '';
};

const askSchedule = () => {
  scheduleForm.addEventListener('submit', handleScheduleSubmit);
};

const loadSchedule = () => {
  const schedule = localStorage.getItem(SCHEDULE_LS);
  if (schedule !== null) {
    const parsedSchedules = JSON.parse(schedule);
    parsedSchedules.forEach((schedule) => {
      paintSchedule(schedule.text);
    });
  }
};

function init() {
  loadSchedule();
  askSchedule();
}

init();
