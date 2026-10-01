const express = require("express");
const path = require("path");

const app = express();
const PORT = 3003;

// EJS configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// Start server
app.listen(PORT, () => {
    console.log(`Task 4 server running at http://localhost:${PORT}`);
});