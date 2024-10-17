// Select elements
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// Load tasks from local storage
loadTasks();

// Event listener for form submission
todoForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the form from reloading the page

  const taskText = todoInput.value.trim();

  if (taskText !== "") {
    addTask(taskText); // Add task to the list
    saveTask(taskText); // Save task to local storage
    todoInput.value = ""; // Clear the input field
  }
});

// Function to add a task
function addTask(task) {
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  li.textContent = task;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
  deleteBtn.textContent = 'Delete';
  
  // Add delete functionality
  deleteBtn.addEventListener('click', function() {
    li.remove(); // Remove the task from the list
    removeTaskFromStorage(task); // Remove task from local storage
  });

  li.appendChild(deleteBtn); // Add delete button to the task
  todoList.appendChild(li); // Add task to the list
}

// Function to save task to local storage
function saveTask(task) {
  let tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove task from local storage
function removeTaskFromStorage(task) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to get tasks from local storage
function getTasksFromStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Function to load tasks from local storage
function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach(task => {
    addTask(task); // Add each task to the list
  });
}