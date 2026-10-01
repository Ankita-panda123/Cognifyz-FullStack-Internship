const express = require("express");
const path = require("path");

const app = express();
const PORT = 3002;

// EJS configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ===============================
// GET - Display the webpage
// ===============================

app.get("/", (req, res) => {
    res.render("index", {
        errors: [],
        submitted: false,
        formData: {
            name: "",
            email: "",
            phone: "",
            message: ""
        }
    });
});

// ===============================
// POST - Handle form submission
// ===============================

app.post("/submit", (req, res) => {

    const formData = {
        name: req.body.name || "",
        email: req.body.email || "",
        phone: req.body.phone || "",
        message: req.body.message || ""
    };

    const errors = [];

    // Validation
    if (!formData.name.trim()) {
        errors.push("Name is required.");
    }

    if (!formData.email.trim()) {
        errors.push("Email is required.");
    }

    if (!formData.phone.trim()) {
        errors.push("Phone is required.");
    }

    if (!formData.message.trim()) {
        errors.push("Message is required.");
    }

    // Validation failed
    if (errors.length > 0) {

        return res.render("index", {
            errors: errors,
            submitted: false,
            formData: formData
        });
    }

    // Successful submission
    res.render("index", {
        errors: [],
        submitted: true,
        formData: formData
    });
});

// ===============================
// Start server
// ===============================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});