const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === "") {
        alert("You must write something!");
        return;
    }

    // Create li
    const li = document.createElement("li");

    // Create icon
    const icon = document.createElement("i");
    icon.className = "fa-regular fa-circle";
    li.appendChild(icon);

    // Add task text
    li.appendChild(document.createTextNode(" " + taskText));

    // Create close button
    const span = document.createElement("span");
    span.innerHTML = "&times;";
    li.appendChild(span);

    listContainer.appendChild(li);
    inputBox.value = "";

    saveData();
}

// Toggle checked state and icon
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI" || e.target.tagName === "I") {
        let li;
        if (e.target.tagName === "LI") {
            li = e.target;
        } else {
            li = e.target.parentElement;
        }
        li.classList.toggle("checked");
        const icon = li.querySelector("i");
        if (li.classList.contains("checked")) {
            icon.className = "fa-regular fa-circle-check";
        } else {
            icon.className = "fa-regular fa-circle";
        }
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Save and load data
function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
    // Fix icons after loading
    Array.from(listContainer.children).forEach(li => {
        const icon = li.querySelector("i");
        if (li.classList.contains("checked")) {
            if (icon) icon.className = "fa-regular fa-circle-check";
        } else {
            if (icon) icon.className = "fa-regular fa-circle";
        }
    });
}

showTasks();

inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});