/**
 *
 * @returns the last 100 posts the have been created
 */
export async function showPosts() {
  const API_URL = "https://api.noroff.dev/api/v1/auction";

  const url = API_URL + "/listings/";
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("There was an error", error);
    alert("There was an error try again later");
  }
}
