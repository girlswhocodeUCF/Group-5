let timer;
let minutes = 25;
let seconds = 0;

function startPomodoro() {
    resetTimer();
    minutes = 25;
    updateDisplay();
}

function startBreak() {
    resetTimer();
    minutes = 10;
    updateDisplay();
}

function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

function pauseTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    minutes = 25; // Default to Pomodoro time
    seconds = 0;
    updateDisplay();
}

function updateTimer() {
    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        alert("Timer complete!");
        return;
    }

    if (seconds === 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }

    updateDisplay();
}

function updateDisplay() {
    document.getElementById("minutes").innerText = padZero(minutes);
    document.getElementById("seconds").innerText = padZero(seconds);
}

function padZero(value) {
    return value < 10 ? "0" + value : value;
}

// Initial display
updateDisplay();

// ... (previous code)

// To-Do List functions
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    const taskText = document.createTextNode(taskInput.value);
    const taskItem = document.createElement("li");

    // Add a checkbox for task completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", toggleTask);

    // Add a button to delete the task
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "x";
    deleteButton.addEventListener("click", deleteTask);

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    // Save tasks to local storage
    saveTasksToLocalStorage();

    // Clear the input field
    taskInput.value = "";
}

function toggleTask() {
    saveTasksToLocalStorage();
}

function deleteTask() {
    const taskList = document.getElementById("taskList");
    const taskItem = this.parentNode;
    taskList.removeChild(taskItem);

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const taskList = document.getElementById("taskList");
    const tasks = [];

    for (let i = 0; i < taskList.children.length; i++) {
        const taskItem = taskList.children[i];
        const taskText = taskItem.childNodes[1].textContent;
        const taskCompleted = taskItem.childNodes[0].checked;

        tasks.push({ text: taskText, completed: taskCompleted });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const taskList = document.getElementById("taskList");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (const task of tasks) {
        const taskItem = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", toggleTask);

        const taskText = document.createTextNode(task.text);

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "x";
        deleteButton.classList.add("btn taskbutton"); 
        deleteButton.addEventListener("click", deleteTask);

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    }
}

// Load tasks from local storage when the page is loaded
loadTasksFromLocalStorage();



