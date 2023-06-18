/* DOM ELEMENTS */
const todoForm = document.querySelector("#todo-form");
const mainInput = document.querySelector("#todo-form div input");
const todoList = document.querySelector(".todos");
const totalTasks = document.querySelector("#total-tasks");
const completedTasks = document.querySelector("#completed-tasks");
const remainingTasks = document.querySelector("#remaining-tasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.addEventListener("load", () => {
  if (localStorage.getItem("tasks")) {
    tasks.map((task) => {
      createTask(task);
    });
  }
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = mainInput.value;

  if (inputValue == "") return;

  const task = {
    id: new Date().getTime(),
    name: inputValue,
    isCompleted: false,
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  createTask(task);

  todoForm.reset();
  mainInput.focus();
});

todoList.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("remove-task") ||
    e.target.classList.contains("fa-trash-can")
  ) {
    const taskid = e.target.closest("li").id;
    removeTask(taskid);
  }

});

todoList.addEventListener("input", (e) => {
  const taskid = e.target.closest("li").id;
  updateTask(taskid, e.target);
});
todoList.addEventListener("keydown", (e) => {
 if(e.keyCode === 13){
    e.preventDefault()
    e.target.blur()
 }
});

/* FUNCTIONS */
const createTask = (task) => {
  const taskEl = document.createElement("li");

  taskEl.setAttribute("id", task.id);

  if (task.isCompleted) {
    taskEl.classList.add("completed");
  }

  const taskElMarkup = `

  <div >
    <input type="checkbox" name="tasks" id="${task.id}" ${task.isCompleted ? 'checked' : '' } />
    <span ${!task.isCompleted ? 'contenteditable' : ''}>${task.name}</span>
  </div>
  <button title="Remove the '${
    task.name
  }' task" class="remove-task"><i class="fa-solid fa-trash-can"></i></button>

  `;

  taskEl.innerHTML = taskElMarkup;

  todoList.appendChild(taskEl);

  countTasks();
};

const countTasks = () => {
  const completedTasksArr = tasks.filter((task) => {
    task.isCompleted === true;
  });
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completedTasksArr.length;
  remainingTasks.textContent = tasks.length - completedTasksArr.length;
};

const removeTask = (taskid) => {
  tasks = tasks.filter((task) => task.id !== parseInt(taskid));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById(taskid).remove();
  countTasks();
};

const updateTask = (taskid, el) => {
  const task = tasks.find((task) => task.id === parseInt(taskid));
  if (el.hasAttribute("contenteditable")) {
    task.name = el.textContent;
  } else {
    const span = el.nextElementSibling;
    const parent = el.closest("li");

    task.isCompleted = !task.isCompleted;
    if (task.isCompleted) {
      span.removeAttribute("contenteditable");
      parent.classList.add("complete");
    } else {
      span.setAttribute("contenteditable", "true");
      parent.classList.remove("complete");
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  countTasks();
};
