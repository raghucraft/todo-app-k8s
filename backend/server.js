// Import Express
const express = require("express");

// Import Mongoose
const mongoose = require("mongoose");

// Import Todo model
const Todo = require("./models/Todo");


// Create Express application
const app = express();

// Parse incoming JSON requests
app.use(express.json());

// Server port
const PORT = 3000;

// MongoDB connection string
// "mongodb" is the service name from docker-compose.yml
const MONGO_URI = "mongodb://mongodb:27017/tododb";

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Home route
app.get("/", (req, res) => {
    res.send("Hello, Docker!");
});

// GET all todos
app.get("/todos", async (req, res) => {

    // Fetch all todos from MongoDB
    const todos = await Todo.find();

    // Return todos as JSON
    res.json(todos);
});

// Create a new todo
app.post("/todos", async (req, res) => {

    // Save the received todo to MongoDB
    const todo = await Todo.create(req.body);

    // Return the created todo
    res.json(todo);
});

// Update an existing todo
app.put("/todos/:id", async (req, res) => {

    // Update the todo using its ID
    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    // Return the updated todo
    res.json(todo);
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {

    // Delete the todo using its ID
    await Todo.findByIdAndDelete(req.params.id);

    // Send success message
    res.json({ message: "Todo deleted successfully" });
});

// Start Express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});