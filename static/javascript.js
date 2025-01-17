//Method to open a webpage
function navigateToPage(url) {
    window.location.href = url;
}

//Async function for verifying signup
async function verify_signup(event) {
    event.preventDefault(); //Stops website refreshing

    let cont = true; //Used to verify if User Inputs should still be validated

    //Gather User Inputs
    const name = document.getElementById('name').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPass = document.getElementById('verify-pass').value.trim();
    const email = document.getElementById('email').value.trim();

    //Clear all Client-Side Errors
    document.getElementById('name-error').textContent = "";
    document.getElementById('username-error').textContent = "";
    document.getElementById('password-error').textContent = "";
    document.getElementById('verify-pass-error').textContent = "";
    document.getElementById('email-error').textContent = "";

    //Check if all User Inputs are provided
    if (!name) {
        document.getElementById('name-error').textContent = "Enter your Name";
        cont = false;
    }
    if (!username) {
        document.getElementById('username-error').textContent = "Enter a Username";
        cont = false;
    }
    if (!password) {
        document.getElementById('password-error').textContent = "Enter a Password";
        cont = false;
    }
    if (!email) {
        document.getElementById('email-error').textContent = "Enter your Email";
        cont = false;
    }

    // ontinue with further checks only if all inputs are provided
    if (cont) {
        //Check Password Validations
        if (password.length < 8) {
            document.getElementById('password-error').textContent = "Password must be at least 8 characters";
            cont = false;
        }
        if (!/[A-Z]/.test(password)) {
            document.getElementById('password-error').textContent = "Password must contain at least one uppercase letter";
            cont = false;
        }
        if (!/\d/.test(password)) {
            document.getElementById('password-error').textContent = "Password must contain at least one number";
            cont = false;
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            document.getElementById('password-error').textContent = "Password must contain at least one special character";
            cont = false;
        }

        //Check if Confirm Password matches
        if (confirmPass !== password) {
            document.getElementById('verify-pass-error').textContent = "Passwords do not match";
            cont = false;
        }

        //Validate Email format
        if (!email.includes('@')) {
            document.getElementById('email-error').textContent = "Email is not valid";
            cont = false;
        }

        //If all checks pass, send data to the backend
        if (cont) {
            console.log("Client-Side Valid");

            //Package data to send to backend
            const data = { name, username, password, email };

            try {
                //Send data to backend
                const response = await fetch('/new-account', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const result = await response.json();
                    alert(`Success: ${result.message}`);
                } else {
                    const error = await response.json();
                    alert(`Error: ${error.message}`);
                }
            } catch (error) {
                alert('An error occurred: ' + error.message);
            }
        }
    }
}