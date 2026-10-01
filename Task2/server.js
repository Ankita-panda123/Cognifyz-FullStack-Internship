const express = require("express");

const app = express();
const PORT = 3001;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Read form data
app.use(express.urlencoded({ extended: true }));

// Temporary server-side storage
let submittedData = [];

// Show the form
app.get("/", (req, res) => {
    res.render("index", {
        message: null,
        errors: {},
        formData: {}
    });
});

// Handle form submission
app.post("/submit", (req, res) => {

    const { name, email, phone, message } = req.body;

    let errors = {};

    // Server-side validation
    if (!name || name.trim() === "") {
        errors.name = "Name is required.";
    }

    if (!email || email.trim() === "") {
        errors.email = "Email is required.";
    } else if (!email.includes("@")) {
        errors.email = "Please enter a valid email.";
    }

    if (!phone || phone.trim() === "") {
        errors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(phone)) {
        errors.phone = "Phone number must contain exactly 10 digits.";
    }

    if (!message || message.trim() === "") {
        errors.message = "Message is required.";
    }

    // If validation fails
    if (Object.keys(errors).length > 0) {
        return res.render("index", {
            message: null,
            errors: errors,
            formData: req.body
        });
    }

    // Validated data
    const data = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim()
    };

    // Store temporarily on the server
    submittedData.push(data);

    console.log("Submitted Data:", data);

    // Show success message
    res.render("index", {
        message: "Form submitted successfully!",
        errors: {},
        formData: data
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});