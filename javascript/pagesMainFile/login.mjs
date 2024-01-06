import { API_URL } from "./../api/api.mjs";

import * as JWT from "./../storageJWT/index.mjs";
const loginForm = document.querySelector(".loginForm");

// test1000@stud.noroff.no
// test1000

/**
 * main function that creates the profiile object which is added to the api call
 * to create a new user
 */
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  try {
    const profile = Object.fromEntries(formData.entries());
    await loginUser(profile);
    location.href = "/";
  } catch (error) {
    alert("There was en error", error);
  }
});

/**
 *
 * @param {object} profile
 * takes the data from the form entries and makes an asynchronous
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

    const { accessToken, ...user } = await response.json();

    JWT.save("token", accessToken);
    JWT.save("user", user);
    console.log("all went well");
  } catch (error) {
    console.log(error);
  }
}
