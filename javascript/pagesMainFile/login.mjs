import { API_URL } from "./../api/api.mjs";
import { logOUt } from "../storageJWT/logOut.mjs";

import * as JWT from "./../storageJWT/index.mjs";
const loginForm = document.querySelector(".loginForm");

/**
 * Main function that creates the profile object which is added to the API call
 * to create a new user
 */
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  try {
    const profile = Object.fromEntries(formData.entries());
    await loginUser(profile);
  } catch (error) {
    alert("There was an error: " + error);
  }
});

/**
 * Function to handle login and redirect
 * @param {object} profile
 * Takes the data from the form entries and makes an asynchronous
 * call to the API to login a new user
 */
async function loginUser(profile) {
  try {
    const url = `${API_URL}/auth/login`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(profile),
    });

    if (response.ok) {
      const { accessToken, ...user } = await response.json();

      JWT.save("token", accessToken);
      JWT.save("user", user);
      console.log("all went well");

      // Redirect only when login is successful
      location.href = "/";
    } else {
      await handleLoginFailure(response);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");
  }
}

/**
 * Function to handle login failure and show appropriate alerts.
 * @param {Response} response
 */
async function handleLoginFailure(response) {
  try {
    const data = await response.json();
    if (data && data.errors && data.errors.length > 0) {
      const errorMessage = data.errors[0].message;
      alert(`Login failed: ${errorMessage}`);
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Error parsing response:", error);
    alert("Something went wrong. Please try again.");
  }
}

logOUt();
