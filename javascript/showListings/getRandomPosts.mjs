/**
 * Retrieves the last 100 posts that have been created from the Noroff Auction API.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array containing information about the last 100 posts.
 *
 * @example
 * // Example usage:
 * try {
 *   const posts = await showPosts();
 *   const randomPosts = getRandomPosts(posts, 4);
 *   console.log(randomPosts);
 *   // Now, you can use randomPosts to display the random posts on your webpage.
 * } catch (error) {
 *   console.error("Error retrieving posts:", error);
 *   alert("There was an error. Please try again later.");
 * }
 */

/**
 * Returns an array of randomly selected posts from the provided posts array.
 *
 * @param {Object[]} allPosts - An array containing information about all the posts.
 * @param {number} count - The number of random posts to select.
 * @returns {Object[]} - An array containing randomly selected posts.
 */
export function getRandomPosts(allPosts, count) {
  const totalPosts = allPosts.length;

  if (count >= totalPosts) {
    // If count is greater than or equal to the total number of posts, return a copy of allPosts
    return [...allPosts];
  }

  const randomPosts = [];
  const postsCopy = [...allPosts];

  for (let i = 0; i < count; i++) {
    if (postsCopy.length === 0) {
      // If there are no more posts available, break the loop.
      break;
    }

    // Generate a random index within the current available posts.
    const randomIndex = Math.floor(Math.random() * postsCopy.length);

    // Remove the selected post from the available posts and add it to the result.
    randomPosts.push(postsCopy.splice(randomIndex, 1)[0]);
  }

  return randomPosts;
}
