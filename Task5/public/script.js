// =====================================
// ELEMENTS
// =====================================

const userForm =
    document.getElementById("userForm");

const userId =
    document.getElementById("userId");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const courseInput =
    document.getElementById("course");

const usersContainer =
    document.getElementById("usersContainer");

const message =
    document.getElementById("message");

const formTitle =
    document.getElementById("formTitle");

const cancelButton =
    document.getElementById("cancelButton");

const apiResponse =
    document.getElementById("apiResponse");


// =====================================
// LOAD USERS
// =====================================

async function loadUsers() {

    try {

        const response =
            await fetch("/api/users");

        const result =
            await response.json();

        displayUsers(result.data);

    } catch (error) {

        usersContainer.innerHTML =
            "Error loading users.";

    }

}


// =====================================
// DISPLAY USERS
// =====================================

function displayUsers(users) {

    if (!users || users.length === 0) {

        usersContainer.innerHTML =
            "<p>No users available.</p>";

        return;
    }


    usersContainer.innerHTML = `

        <div class="users-grid">

            ${users.map(user => `

                <div class="user-card">

                    <h4>
                        ${escapeHTML(user.name)}
                    </h4>

                    <p>
                        <strong>Email:</strong>
                        ${escapeHTML(user.email)}
                    </p>

                    <p>
                        <strong>Course:</strong>
                        ${escapeHTML(user.course)}
                    </p>

                    <div class="user-actions">

                        <button
                            class="edit-button"
                            onclick="editUser(${user.id})"
                        >
                            Edit
                        </button>

                        <button
                            class="delete-button"
                            onclick="deleteUser(${user.id})"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `).join("")}

        </div>

    `;
}


// =====================================
// CREATE / UPDATE
// =====================================

userForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const data = {

            name:
                nameInput.value.trim(),

            email:
                emailInput.value.trim(),

            course:
                courseInput.value.trim()

        };


        const id =
            userId.value;


        try {

            let response;


            if (id) {

                response =
                    await fetch(
                        `/api/users/${id}`,
                        {

                            method: "PUT",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(data)

                        }
                    );

            } else {

                response =
                    await fetch(
                        "/api/users",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(data)

                        }
                    );

            }


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message
                );

            }


            showMessage(
                result.message,
                "success"
            );


            resetForm();

            loadUsers();

        } catch (error) {

            showMessage(
                error.message,
                "error"
            );

        }

    }
);


// =====================================
// EDIT USER
// =====================================

async function editUser(id) {

    try {

        const response =
            await fetch(
                `/api/users/${id}`
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message
            );

        }


        const user =
            result.data;


        userId.value =
            user.id;

        nameInput.value =
            user.name;

        emailInput.value =
            user.email;

        courseInput.value =
            user.course;


        formTitle.textContent =
            "Edit User";

        cancelButton.style.display =
            "block";

    } catch (error) {

        showMessage(
            error.message,
            "error"
        );

    }

}


// =====================================
// DELETE USER
// =====================================

async function deleteUser(id) {

    if (
        !confirm(
            "Are you sure you want to delete this user?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `/api/users/${id}`,
                {
                    method: "DELETE"
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message
            );

        }


        showMessage(
            result.message,
            "success"
        );


        loadUsers();

    } catch (error) {

        showMessage(
            error.message,
            "error"
        );

    }

}


// =====================================
// TEST GET ALL API
// =====================================

async function testGetAPI() {

    try {

        const response =
            await fetch(
                "/api/users"
            );


        const data =
            await response.json();


        showAPIResponse(data);

    } catch (error) {

        showAPIResponse({
            error: error.message
        });

    }

}


// =====================================
// TEST GET ONE API
// =====================================

async function testGetOneAPI() {

    try {

        const response =
            await fetch(
                "/api/users/1"
            );


        const data =
            await response.json();


        showAPIResponse(data);

    } catch (error) {

        showAPIResponse({
            error: error.message
        });

    }

}


// =====================================
// TEST POST API
// =====================================

async function testPostAPI() {

    try {

        const newUser = {

            name: "Test User",

            email: "test@example.com",

            course: "API Development"

        };


        const response =
            await fetch(
                "/api/users",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(newUser)

                }
            );


        const data =
            await response.json();


        showAPIResponse(data);

        loadUsers();

    } catch (error) {

        showAPIResponse({
            error: error.message
        });

    }

}


// =====================================
// TEST PUT API
// =====================================

async function testPutAPI() {

    try {

        const updatedUser = {

            name: "Updated User",

            email: "updated@example.com",

            course: "Advanced API Development"

        };


        const response =
            await fetch(
                "/api/users/1",
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(updatedUser)

                }
            );


        const data =
            await response.json();


        showAPIResponse(data);

        loadUsers();

    } catch (error) {

        showAPIResponse({
            error: error.message
        });

    }

}


// =====================================
// TEST DELETE API
// =====================================

async function testDeleteAPI() {

    try {

        const response =
            await fetch(
                "/api/users/1",
                {

                    method: "DELETE"

                }
            );


        const data =
            await response.json();


        showAPIResponse(data);

        loadUsers();

    } catch (error) {

        showAPIResponse({
            error: error.message
        });

    }

}


// =====================================
// SHOW API RESPONSE
// =====================================

function showAPIResponse(data) {

    apiResponse.textContent =
        JSON.stringify(
            data,
            null,
            4
        );

}


// =====================================
// CANCEL EDIT
// =====================================

function cancelEdit() {

    resetForm();

}


// =====================================
// RESET FORM
// =====================================

function resetForm() {

    userForm.reset();

    userId.value = "";

    formTitle.textContent =
        "Add New User";

    cancelButton.style.display =
        "none";

}


// =====================================
// MESSAGE
// =====================================

function showMessage(
    text,
    type
) {

    message.textContent =
        text;

    message.className =
        `message ${type}`;


    setTimeout(
        () => {

            message.className =
                "message";

        },
        3000
    );

}


// =====================================
// SCROLL
// =====================================

function scrollToUsers() {

    document
        .getElementById("users")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =====================================
// HTML SECURITY
// =====================================

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// =====================================
// START
// =====================================

loadUsers();