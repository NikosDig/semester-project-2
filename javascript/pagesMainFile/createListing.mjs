import { API_URL } from "./../api/api.mjs";
import { loadJWT } from "./../storageJWT/loadJWT.mjs";

const createListingForm = document.querySelector("#createListingForm");

/**
 * Creates a new post by making a POST request to the API endpoint.
 *
 * @param {object} postData - The data for the new post, including title, description, tags, media, etc.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.description - The description of the post.
 * @param {string} postData.tags - A comma-separated string of tags associated with the post.
 * @param {string} postData.media - A comma-separated string of media URLs associated with the post.
 * @returns {object} - The result of the POST request.
 * @throws {Error} - Throws an error if there is an issue creating the post.
 */
async function createPost(postData) {
  const url = API_URL + "/listings";
  const token = loadJWT("token");

  // Convert "tags" and "media" to arrays if they are not already
  postData.tags = postData.tags
    ? postData.tags.split(",").map((tag) => tag.trim())
    : [];
  postData.media = postData.media
    ? postData.media.split(",").map((url) => url.trim())
    : [];

  try {
    // Make a POST request to create a new post
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "post",
      body: JSON.stringify(postData),
    });
    // Parse the response as JSON
    const result = await response.json();
    //console.log(result);
    // Alert the user that the listing is created
    alert("Listing created successfully!");
    // Reset the form values
    createListingForm.reset();
    // Return the result of the POST request
    return result;
  } catch (error) {
    console.log("There was an error", error);
    alert("There was en error creating the post,try again later");
    throw error;
  }
}

/**
 * Event listener for the submission of the create listing form.
 * Prevents the default form submission, captures form data, and creates a new post.
 *
 * @param {Event} e - The form submission event.
 */
createListingForm.addEventListener("submit", async (e) => {
  // Prevent the default form submission
  e.preventDefault();
  // Get the form element
  const form = e.target;
  // Create a FormData object from the form
  const formData = new FormData(form);
  // Convert FormData to an object
  const post = Object.fromEntries(formData.entries()); //stolen line from Oliver
  // Call the createPost function with the captured form data
  await createPost(post);
});
