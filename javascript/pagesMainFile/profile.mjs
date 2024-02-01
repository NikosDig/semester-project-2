import { loadJWT } from "./../storageJWT/loadJWT.mjs";
import { fixProfile } from "../populateProfile/fixProfileValues.mjs";
import { logOUt } from "../storageJWT/logOut.mjs";
import { checkUserLoggedIn } from "./../isLogedIn/checkUserLoggedIn.mjs";

// Use an async function to load the user data
const loadUser = async () => {
  try {
    // Check if the user is logged in
    const isLoggedIn = checkUserLoggedIn();

    const userNotLoggedInElement = document.querySelector(".userNotLogedIn");
    const userLoggedInElement = document.querySelector(".userLogedIn");

    if (!isLoggedIn) {
      // If not logged in, handle UI accordingly
      if (userNotLoggedInElement && userLoggedInElement) {
        userNotLoggedInElement.classList.remove("d-none");
        userLoggedInElement.classList.add("d-none");
      }

      return null;
    }

    // If logged in, proceed to load user data
    const loadedUser = await loadJWT("user");
    return loadedUser;
  } catch (error) {
    console.error("Error loading user data:", error);
    return null;
  }
};

// Call the async function to load the user data
loadUser().then((user) => {
  if (user) {
    // Call the fixProfile function after the user data is loaded
    fixProfile(user);
    //console.log(user)
  }
});

logOUt();
