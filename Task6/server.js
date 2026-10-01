const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

require("dotenv").config();

const User = require("./models/user");
const authenticateToken = require("./middleware/auth");

const app = express();

const PORT = process.env.PORT || 3005;


// ==========================================
// VIEW ENGINE
// ==========================================

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);


// ==========================================
// STATIC FILES
// ==========================================

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log(
            "MongoDB connected successfully!"
        );

    })
    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

    });


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.redirect("/register");

});


// ==========================================
// REGISTER PAGE
// ==========================================

app.get("/register", (req, res) => {

    res.render("register");

});


// ==========================================
// LOGIN PAGE
// ==========================================

app.get("/login", (req, res) => {

    res.render("login");

});


// ==========================================
// DASHBOARD PAGE
// ==========================================

app.get("/dashboard", (req, res) => {

    res.render("dashboard");

});


// ==========================================
// REGISTER API
// ==========================================

app.post(
    "/api/register",
    async (req, res) => {

        try {

            const {
                name,
                email,
                password
            } = req.body;


            // Check required fields

            if (
                !name ||
                !email ||
                !password
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Name, email and password are required."

                });

            }


            // Check password length

            if (password.length < 6) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Password must contain at least 6 characters."

                });

            }


            // Check if email already exists

            const existingUser =
                await User.findOne({

                    email:
                        email.toLowerCase().trim()

                });


            if (existingUser) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Email is already registered."

                });

            }


            // Hash password

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );


            // Create new user

            const newUser =
                new User({

                    name:
                        name.trim(),

                    email:
                        email.toLowerCase().trim(),

                    password:
                        hashedPassword

                });


            // Save user

            await newUser.save();


            // Send response

            res.status(201).json({

                success: true,

                message:
                    "User registered successfully.",

                user: {

                    id:
                        newUser._id,

                    name:
                        newUser.name,

                    email:
                        newUser.email

                }

            });

        }

        catch (error) {

            console.error(
                "Registration error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Server error during registration."

            });

        }

    }
);


// ==========================================
// LOGIN API
// ==========================================

app.post(
    "/api/login",
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;


            // Check required fields

            if (
                !email ||
                !password
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Email and password are required."

                });

            }


            // Find user

            const user =
                await User.findOne({

                    email:
                        email.toLowerCase().trim()

                });


            if (!user) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid email or password."

                });

            }


            // Compare password

            const passwordMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );


            if (!passwordMatch) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid email or password."

                });

            }


            // Create JWT token

            const token =
                jwt.sign(

                    {
                        id:
                            user._id,

                        email:
                            user.email
                    },

                    process.env.JWT_SECRET,

                    {
                        expiresIn: "1h"
                    }

                );


            // Send response

            res.json({

                success: true,

                message:
                    "Login successful.",

                token:
                    token,

                user: {

                    id:
                        user._id,

                    name:
                        user.name,

                    email:
                        user.email

                }

            });

        }

        catch (error) {

            console.error(
                "Login error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Server error during login."

            });

        }

    }
);


// ==========================================
// PROTECTED API - CURRENT USER
// ==========================================

app.get(
    "/api/me",
    authenticateToken,
    async (req, res) => {

        try {

            const user =
                await User
                    .findById(req.user.id)
                    .select("-password");


            if (!user) {

                return res.status(404).json({

                    success: false,

                    message:
                        "User not found."

                });

            }


            res.json({

                success: true,

                user:
                    user

            });

        }

        catch (error) {

            console.error(
                "Get current user error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Server error."

            });

        }

    }
);


// ==========================================
// PROTECTED API - ALL USERS
// ==========================================

app.get(
    "/api/users",
    authenticateToken,
    async (req, res) => {

        try {

            const users =
                await User
                    .find()
                    .select("-password");


            res.json({

                success: true,

                count:
                    users.length,

                users:
                    users

            });

        }

        catch (error) {

            console.error(
                "Get users error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Server error."

            });

        }

    }
);


// ==========================================
// START SERVER
// ==========================================

app.listen(
    PORT,
    () => {

        console.log(
            `Task 6 server running at http://localhost:${PORT}`
        );

    }
);