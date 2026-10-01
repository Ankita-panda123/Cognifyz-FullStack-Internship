const express = require("express");

const app = express();
const PORT = 3000;

// EJS template engine
app.set("view engine", "ejs");

// Read form data
app.use(express.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
    res.render("index", {
        message: null
    });
});

// Form submission
app.post("/submit", (req, res) => {
    const { name, email, message } = req.body;

    res.render("index", {
        message: `Hello ${name}! Your form was submitted successfully.`,
        email: email,
        userMessage: message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});