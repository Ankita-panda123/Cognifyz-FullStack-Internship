const express = require("express");
const path = require("path");

const app = express();
const PORT = 3004;

// =====================================
// CONFIGURATION
// =====================================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// =====================================
// MIDDLEWARE
// =====================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// =====================================
// TEMPORARY DATABASE
// =====================================

let users = [
    {
        id: 1,
        name: "Amiya Kumar",
        email: "amiya@example.com",
        course: "Full Stack Development"
    },
    {
        id: 2,
        name: "Ankita Panda",
        email: "ankita@example.com",
        course: "Web Development"
    }
];


// =====================================
// FRONT-END PAGE
// =====================================

app.get("/", (req, res) => {

    res.render("index");

});


// =====================================
// GET ALL USERS
// READ
// =====================================

app.get("/api/users", (req, res) => {

    res.json({
        success: true,
        data: users
    });

});


// =====================================
// GET ONE USER
// READ
// =====================================

app.get("/api/users/:id", (req, res) => {

    const id =
        parseInt(req.params.id);

    const user =
        users.find(
            user => user.id === id
        );

    if (!user) {

        return res.status(404).json({

            success: false,

            message: "User not found."

        });

    }

    res.json({

        success: true,

        data: user

    });

});


// =====================================
// CREATE USER
// CREATE
// =====================================

app.post("/api/users", (req, res) => {

    const {
        name,
        email,
        course
    } = req.body;


    if (
        !name ||
        !email ||
        !course
    ) {

        return res.status(400).json({

            success: false,

            message:
                "All fields are required."

        });

    }


    const newUser = {

        id:
            users.length > 0
                ? users[users.length - 1].id + 1
                : 1,

        name,
        email,
        course

    };


    users.push(newUser);


    res.status(201).json({

        success: true,

        message:
            "User created successfully.",

        data: newUser

    });

});


// =====================================
// UPDATE USER
// UPDATE
// =====================================

app.put("/api/users/:id", (req, res) => {

    const id =
        parseInt(req.params.id);

    const user =
        users.find(
            user => user.id === id
        );


    if (!user) {

        return res.status(404).json({

            success: false,

            message:
                "User not found."

        });

    }


    const {
        name,
        email,
        course
    } = req.body;


    if (
        !name ||
        !email ||
        !course
    ) {

        return res.status(400).json({

            success: false,

            message:
                "All fields are required."

        });

    }


    user.name = name;
    user.email = email;
    user.course = course;


    res.json({

        success: true,

        message:
            "User updated successfully.",

        data: user

    });

});


// =====================================
// DELETE USER
// DELETE
// =====================================

app.delete("/api/users/:id", (req, res) => {

    const id =
        parseInt(req.params.id);


    const userIndex =
        users.findIndex(
            user => user.id === id
        );


    if (userIndex === -1) {

        return res.status(404).json({

            success: false,

            message:
                "User not found."

        });

    }


    const deletedUser =
        users.splice(
            userIndex,
            1
        )[0];


    res.json({

        success: true,

        message:
            "User deleted successfully.",

        data: deletedUser

    });

});


// =====================================
// START SERVER
// =====================================

app.listen(PORT, () => {

    console.log(
        `Task 5 server running at http://localhost:${PORT}`
    );

});
