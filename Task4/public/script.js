// =====================================
// GET ELEMENTS
// =====================================

const form =
    document.getElementById("registrationForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const phoneInput =
    document.getElementById("phone");

const passwordInput =
    document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const termsInput =
    document.getElementById("terms");


// =====================================
// ERROR ELEMENTS
// =====================================

const nameError =
    document.getElementById("nameError");

const emailError =
    document.getElementById("emailError");

const phoneError =
    document.getElementById("phoneError");

const confirmPasswordError =
    document.getElementById(
        "confirmPasswordError"
    );

const termsError =
    document.getElementById("termsError");


// =====================================
// PASSWORD ELEMENTS
// =====================================

const strengthBar =
    document.getElementById("strengthBar");

const strengthText =
    document.getElementById("strengthText");

const lengthRule =
    document.getElementById("lengthRule");

const uppercaseRule =
    document.getElementById("uppercaseRule");

const lowercaseRule =
    document.getElementById("lowercaseRule");

const numberRule =
    document.getElementById("numberRule");

const specialRule =
    document.getElementById("specialRule");


// =====================================
// SUCCESS MESSAGE
// =====================================

const successMessage =
    document.getElementById(
        "successMessage"
    );


// =====================================
// VALIDATE NAME
// =====================================

function validateName() {

    const value =
        nameInput.value.trim();

    if (value.length < 3) {

        nameInput.classList.add("invalid");
        nameInput.classList.remove("valid");

        nameError.textContent =
            "Name must contain at least 3 characters.";

        return false;
    }

    nameInput.classList.remove("invalid");
    nameInput.classList.add("valid");

    nameError.textContent = "";

    return true;
}


// =====================================
// VALIDATE EMAIL
// =====================================

function validateEmail() {

    const value =
        emailInput.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {

        emailInput.classList.add("invalid");
        emailInput.classList.remove("valid");

        emailError.textContent =
            "Please enter a valid email address.";

        return false;
    }

    emailInput.classList.remove("invalid");
    emailInput.classList.add("valid");

    emailError.textContent = "";

    return true;
}


// =====================================
// VALIDATE PHONE
// =====================================

function validatePhone() {

    const value =
        phoneInput.value.trim();

    const phonePattern =
        /^[0-9]{10}$/;

    if (!phonePattern.test(value)) {

        phoneInput.classList.add("invalid");
        phoneInput.classList.remove("valid");

        phoneError.textContent =
            "Phone number must contain exactly 10 digits.";

        return false;
    }

    phoneInput.classList.remove("invalid");
    phoneInput.classList.add("valid");

    phoneError.textContent = "";

    return true;
}


// =====================================
// PASSWORD VALIDATION
// =====================================

function validatePassword() {

    const password =
        passwordInput.value;

    const hasLength =
        password.length >= 8;

    const hasUppercase =
        /[A-Z]/.test(password);

    const hasLowercase =
        /[a-z]/.test(password);

    const hasNumber =
        /[0-9]/.test(password);

    const hasSpecial =
        /[^A-Za-z0-9]/.test(password);


    // Update rules

    updateRule(
        lengthRule,
        hasLength,
        "At least 8 characters"
    );

    updateRule(
        uppercaseRule,
        hasUppercase,
        "One uppercase letter"
    );

    updateRule(
        lowercaseRule,
        hasLowercase,
        "One lowercase letter"
    );

    updateRule(
        numberRule,
        hasNumber,
        "One number"
    );

    updateRule(
        specialRule,
        hasSpecial,
        "One special character"
    );


    // Calculate strength

    let score = 0;

    if (hasLength) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;


    if (password.length === 0) {

        strengthBar.style.width = "0%";

        strengthText.textContent =
            "Password strength: Not entered";

        return false;
    }


    if (score <= 2) {

        strengthBar.style.width = "30%";

        strengthBar.style.background =
            "#ef4444";

        strengthText.textContent =
            "Password strength: Weak";

    } else if (score <= 4) {

        strengthBar.style.width = "65%";

        strengthBar.style.background =
            "#f59e0b";

        strengthText.textContent =
            "Password strength: Medium";

    } else {

        strengthBar.style.width = "100%";

        strengthBar.style.background =
            "#22c55e";

        strengthText.textContent =
            "Password strength: Strong";
    }


    return score === 5;
}


// =====================================
// UPDATE PASSWORD RULE
// =====================================

function updateRule(
    element,
    valid,
    text
) {

    if (valid) {

        element.textContent =
            "✓ " + text;

        element.classList.add(
            "valid-rule"
        );

    } else {

        element.textContent =
            "✗ " + text;

        element.classList.remove(
            "valid-rule"
        );
    }
}


// =====================================
// CONFIRM PASSWORD
// =====================================

function validateConfirmPassword() {

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;


    if (
        confirmPassword === "" ||
        confirmPassword !== password
    ) {

        confirmPasswordInput.classList.add(
            "invalid"
        );

        confirmPasswordInput.classList.remove(
            "valid"
        );

        confirmPasswordError.textContent =
            "Passwords do not match.";

        return false;
    }


    confirmPasswordInput.classList.remove(
        "invalid"
    );

    confirmPasswordInput.classList.add(
        "valid"
    );

    confirmPasswordError.textContent = "";

    return true;
}


// =====================================
// TERMS
// =====================================

function validateTerms() {

    if (!termsInput.checked) {

        termsError.textContent =
            "You must accept the terms and conditions.";

        return false;
    }

    termsError.textContent = "";

    return true;
}


// =====================================
// INPUT EVENTS
// =====================================

nameInput.addEventListener(
    "input",
    validateName
);

emailInput.addEventListener(
    "input",
    validateEmail
);

phoneInput.addEventListener(
    "input",
    validatePhone
);

passwordInput.addEventListener(
    "input",
    () => {

        validatePassword();

        if (
            confirmPasswordInput.value
        ) {

            validateConfirmPassword();
        }
    }
);

confirmPasswordInput.addEventListener(
    "input",
    validateConfirmPassword
);

termsInput.addEventListener(
    "change",
    validateTerms
);


// =====================================
// FORM SUBMISSION
// =====================================

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const validName =
            validateName();

        const validEmail =
            validateEmail();

        const validPhone =
            validatePhone();

        const validPassword =
            validatePassword();

        const validConfirmPassword =
            validateConfirmPassword();

        const validTerms =
            validateTerms();


        if (
            validName &&
            validEmail &&
            validPhone &&
            validPassword &&
            validConfirmPassword &&
            validTerms
        ) {

            // Hide form

            form.style.display = "none";


            // Show success message

            successMessage.classList.add(
                "show"
            );


            // Update browser route

            history.pushState(
                {},
                "",
                "#success"
            );

        } else {

            // Scroll to form

            form.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }
);


// =====================================
// CLIENT-SIDE ROUTING
// =====================================

const pages =
    document.querySelectorAll(".page");

const routeElements =
    document.querySelectorAll(
        "[data-route]"
    );


function showPage(route) {

    pages.forEach(page => {

        page.classList.remove(
            "active"
        );
    });


    const target =
        document.getElementById(route);

    if (target) {

        target.classList.add(
            "active"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


// =====================================
// ROUTE CLICK
// =====================================

routeElements.forEach(element => {

    element.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            const route =
                this.getAttribute(
                    "data-route"
                );

            showPage(route);

            history.pushState(
                {},
                "",
                "#" + route
            );
        }
    );
});


// =====================================
// BROWSER BACK/FORWARD
// =====================================

window.addEventListener(
    "popstate",
    function() {

        let route =
            window.location.hash
                .replace("#", "");

        if (!route) {

            route = "home";
        }

        showPage(route);
    }
);


// =====================================
// INITIAL ROUTE
// =====================================

let initialRoute =
    window.location.hash
        .replace("#", "");

if (!initialRoute) {

    initialRoute = "home";
}

showPage(initialRoute);