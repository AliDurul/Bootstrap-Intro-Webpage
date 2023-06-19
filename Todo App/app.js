/* DOM ELEMENTS */
const todoForm = document.querySelector("#todo-form");
const mainInput = document.querySelector("#todo-form div input");
const todoList = document.querySelector(".todos");
const totalTasks = document.querySelector("#total-tasks");
const completedTasks = document.querySelector("#completed-tasks");
const remainingTasks = document.querySelector("#remaining-tasks");

//1 Check if local storage empty or no
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 4 Getting tasks from local storage and display
window.addEventListener("load", () => {
  if (localStorage.getItem("tasks")) {
    tasks.map((task) => {
      createTask(task);
    });
  }
});
//2
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = mainInput.value;

  if (inputValue === "") return;

  const task = {
    id: new Date().getTime(),
    name: inputValue,
    isCompleted: false,
  };
  //Save the object to local storage
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // 3
  createTask(task);

  //Reset input
  todoForm.reset();
  mainInput.focus();
});

//6 Removing the li element
todoList.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("remove-task") ||
    e.target.classList.contains("fa-trash-can")
  ) {
    const taskid = e.target.closest("li").id;
    //7
    removeTask(taskid);
  }
});
// 8 updateing the tasks name
todoList.addEventListener("input", (e) => {
  const taskid = e.target.closest("li").id;
  //9 calling function here
  updateTask(taskid, e.target);
});

//10 avoiding the enter key when u are editing
todoList.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    //removes the focus
    e.target.blur();
  }
});

/* FUNCTIONS */
//3
const createTask = (task) => {
  //creating li
  const taskEl = document.createElement("li");
  taskEl.setAttribute("id", task.id);

  //checking checkbox
  if (task.isCompleted) {
    taskEl.classList.add("completed");
  }

  const taskElMarkup = `

  <div >
    <input type="checkbox" name="tasks" id="${task.id}" ${
    task.isCompleted ? "checked" : ""
  } />
    <span ${!task.isCompleted ? "contenteditable" : ""}>${task.name}</span>
  </div>
  <button title="Remove the '${
    task.name
  }' task" class="remove-task"><i class="fa-solid fa-trash-can"></i></button>

  `;

  taskEl.innerHTML = taskElMarkup;

  todoList.appendChild(taskEl);

  countTasks();
};
// 5 count the tasks
const countTasks = () => {
  const completedTasksArr = tasks.filter((task) => task.isCompleted === true);
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completedTasksArr.length;
  remainingTasks.textContent = tasks.length - completedTasksArr.length;
};

//7 remove element and update local storage
const removeTask = (taskid) => {
  tasks = tasks.filter((task) => task.id !== parseInt(taskid));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById(taskid).remove();
  countTasks();
};
// 9 editing the task name
const updateTask = (taskid, el) => {
  const task = tasks.find((task) => task.id === parseInt(taskid));
  console.log(task);
  if (el.hasAttribute("contenteditable")) {
    task.name = el.textContent;
  } else {
    const span = el.nextElementSibling;
    const parent = el.closest("li");

    // check is it completed or no
    // so that it can be editable
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
