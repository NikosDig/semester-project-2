/**
 *
 * @param {number} id the id of the particular post
 * @returns returns the spesific post you have selected (needs id of post)
 */
export async function showOnePost(id) {
  const API_URL = "https://api.noroff.dev/api/v1/auction";
  const url = `${API_URL}/listings/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  if (response.ok) {
    console.log(data);
    return data;
  } else {
    return console.log("Post not found");
  }
}

//showOnePost("27414c36-7071-435f-b117-89c12ad9fae6");
