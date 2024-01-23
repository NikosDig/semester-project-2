import { loadJWT } from "./../storageJWT/loadJWT.mjs";
import { fixProfileForEditProfilePage } from "./../populateProfile/fixProfileValuesForEditProfile.mjs";
import { logOUt } from "../storageJWT/logOut.mjs";
import { API_URL } from "../api/api.mjs";

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
  // Call the fixProfile function after the user data is loaded
  fixProfileForEditProfilePage(user);
});

// Function to update the user's profile image
const updateProfileImage = async (newImageUrl) => {
  try {
    // Make an API call to update the profile image
    const loadedUser = await loadJWT("user");
    const loadKey = await loadJWT("token");

    // console.log("Loaded User:", loadedUser);
    // console.log("Loaded Token:", loadKey);
    // console.log("User Name:", loadedUser.name);

    const response = await fetch(
      `${API_URL}/profiles/${loadedUser.name}/media`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loadKey}`,
        },
        body: JSON.stringify({ avatar: newImageUrl }),
      }
    );

    //console.log("Response:", response);

    if (response.ok) {
      // Update the user object with the new avatar URL
      loadedUser.avatar = newImageUrl;
      console.log("Profile image updated successfully!");
      // You can perform additional actions here if needed
    } else {
      console.error("Error updating profile image. Please try again.");
      console.log("Response Status:", response.status); // Log the status code for further investigation
    }
  } catch (error) {
    console.error("Error updating profile image:", error);
  }
};

// Function to handle the form submission
const submitProfileImage = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the new image URL from the input field
  const newImageUrl = document.getElementById("url").value;

  console.log("New Image URL:", newImageUrl);

  // Call the updateProfileImage function
  await updateProfileImage(newImageUrl);

  console.log("After updateProfileImage");
  alert("You need to RE-log in to see the new avatar on your profile");

  // Redirect to /profile.html
  window.location.href = "/profile.html";

  // Ensure the default form submission is prevented
  return false;
};

// Attach event listener to the form's onsubmit event
document
  .getElementById("updateImageForm")
  .addEventListener("submit", submitProfileImage);

logOUt();
