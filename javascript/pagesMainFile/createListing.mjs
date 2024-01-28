import { API_URL } from "./../api/api.mjs";
import { loadJWT } from "./../storageJWT/loadJWT.mjs";

const createListingForm = document.querySelector("#createListingForm");

async function createPost(postData) {
  const url = API_URL + "/listings";
  const token = loadJWT("token");

  // Convert "tags" and "media" to arrays if they are not already
  postData.tags = postData.tags
    ? postData.tags.split(",").map((tag) => tag.trim())
    : [];
  postData.media = postData.media ? [postData.media] : [];

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "post",
      body: JSON.stringify(postData),
    });
    const result = await response.json();
    console.log(result);
    // Alert the user that the listing is created
    alert("Listing created successfully!");
    // Reset the form values
    createListingForm.reset();
    return result;
  } catch (error) {
    console.log("There was an error", error);
    alert("There was en error creating the post,try again later");
  }
}

createListingForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const post = Object.fromEntries(formData.entries()); //stolen line from Oliver
  await createPost(post);
});
