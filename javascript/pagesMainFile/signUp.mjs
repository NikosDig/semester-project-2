import { API_URL } from "./../api/api.mjs";
import { logOUt } from "../storageJWT/logOut.mjs";

const signUpForm = document.querySelector(".signUpForm");

/**
 * main function that creates the profile object which is added to the API call
 * to create a new user
 */
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  registerUser(profile);
});

/**
 *
 * @param {object} profile
 * takes the data from the form entries using the name attribute and makes an asynchronous
 * call to the API to register a new user
 */
async function registerUser(profile) {
  try {
    const url = `${API_URL}/auth/register`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(profile),
    });

    if (response.status === 201) {
      alert(
        "Register user successful, you are being redirected to the login page"
      );
      setTimeout(() => {
        redirectUserToLogInPage();
      }, 3000);
    } else {
      handleRegistrationFailure(response);
    }
  } catch (error) {
    console.error(error);
    alert(
      "Something went wrong. Check if you filled the fields correctly and try again."
    );
  }
}

/**
 * Redirects the user to the login page after registration.
 */
function redirectUserToLogInPage() {
  location.href = "../../logIn.html";
}

/**
 * Handles registration failure and shows appropriate alerts.
 * @param {Response} response
 */
async function handleRegistrationFailure(response) {
  try {
    const data = await response.json();
    if (data && data.errors && data.errors.length > 0) {
      const errorMessage = data.errors[0].message;
      alert(`Registration failed: ${errorMessage}`);
    } else {
      alert(
        "Something went wrong. Check if you filled the fields correctly and try again."
      );
    }
  } catch (error) {
    console.error("Error parsing response:", error);
    alert(
      "Something went wrong. Check if you filled the fields correctly and try again."
    );
  }
}

logOUt();
