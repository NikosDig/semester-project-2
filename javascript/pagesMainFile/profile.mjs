import { loadJWT } from "./../storageJWT/loadJWT.mjs";
import { fixProfile } from "../populateProfile/fixProfileValues.mjs";
import { logOUt } from "../storageJWT/logOut.mjs";

// Use an async function to load the user data
const loadUser = async () => {
  try {
    const loadedUser = await loadJWT("user");
    return loadedUser;
  } catch (error) {
    console.error("Error loading user data:", error);
    return null;
  }
};

// Call the async function to load the user data
loadUser().then((user) => {
  // console.log(user);

  // Call the fixProfile function after the user data is loaded
  fixProfile(user);
});

logOUt();
