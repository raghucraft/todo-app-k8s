// API endpoint.
// Nginx forwards "/todos" to the backend.
const API_URL = "/todos";

// Load all todos from the backend
async function loadTodos() {

    // Send GET request
    const response = await fetch(API_URL);

    // Convert JSON response to JavaScript objects
    const todos = await response.json();

    // Find the unordered list (<ul>) element
    const todoList = document.getElementById("todoList");

    // Remove old list items
    todoList.innerHTML = "";

    // Show a message if there are no todos
    if (todos.length === 0) {

        todoList.innerHTML = '<li class="empty-message">No todos yet.</li>';

        return;

    }

    todos.forEach(todo => {

        // Create a new list item (<li>)
        const li = document.createElement("li");

        // Create a span to hold the todo text
        const todoText = document.createElement("span");
        todoText.textContent = todo.title;

        // Add to css completed class if the todo is completed
        if (todo.completed) {
            todoText.classList.add("completed");
        }

        // Add the todo text to the list item
        li.appendChild(todoText);

        // Create button container
        const buttonGroup = document.createElement("div");
        buttonGroup.className = "button-group";

        // Create Complete / Undo button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = todo.completed
            ? "Undo"
            : "Complete";

        // Apply CSS class
        completeBtn.className = "complete-btn";

        completeBtn.addEventListener("click", async () => {

            await fetch(`${API_URL}/${todo._id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    completed: !todo.completed
                })

            });

            // Reload the todo list
            loadTodos();

        });

        // Create Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        // Apply CSS class
        deleteBtn.className = "delete-btn"; 

        deleteBtn.addEventListener("click", async () => {

            // Ask the user before deleting
            const confirmed = confirm("Are you sure you want to delete this todo?");

            // Stop if the user clicks Cancel
            if (!confirmed) {
                return;
            }

            // Delete the todo using its ID
            await fetch(`${API_URL}/${todo._id}`, {

                method: "DELETE"

            });

            // Reload the todo list
            loadTodos();

        });

        // Add buttons to the button container
        buttonGroup.appendChild(completeBtn);
        buttonGroup.appendChild(deleteBtn);

        // Add button container to the todo item
        li.appendChild(buttonGroup);

        // Add the <li> to the page
        todoList.appendChild(li);

    });

}

// Load todos when the page opens
loadTodos();

// Find the Add button
const addBtn = document.getElementById("addBtn");

// Find the input box
const todoInput = document.getElementById("todoInput");

// Run addTodo() when button is clicked
addBtn.addEventListener("click", addTodo);

// Run addTodo() when Enter is pressed
todoInput.addEventListener("keydown", function (event) {

    // Check if the Enter key was pressed
    if (event.key === "Enter") {

        // Prevent the browser's default action
        event.preventDefault();

        // Add the todo
        addTodo();

    }

});

// Add a new todo
async function addTodo() {

    const title = todoInput.value.trim();

    // Prevent empty or whitespace-only todos
    if (title === "") {

        // Show an error message to the user
        alert("Todo cannot be empty.");

        // Stop the function so no POST request is sent
        return;

    }

    await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            title: title,
            completed: false

        })

    });

    // Clear the input box
    todoInput.value = "";

    // Reload the todo list
    loadTodos();

}