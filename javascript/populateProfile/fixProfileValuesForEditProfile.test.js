import { fixProfileForEditProfilePage } from "./fixProfileValuesForEditProfile.mjs";

describe("fixProfileForEditProfilePage", () => {
  test("updates user profile elements on the Edit Profile page in the DOM", () => {
    document.body.innerHTML = `
        <div class="profileName"></div>
        <div class="profileEmail"></div>
        <div class="profileCredits"></div>
      `;

    const user = {
      name: "John Doe",
      email: "john@example.com",
      credits: 500,
    };

    fixProfileForEditProfilePage(user);

    expect(document.querySelector(".profileName").innerText).toBe(user.name);
    expect(document.querySelector(".profileEmail").innerText).toBe(user.email);
    expect(document.querySelector(".profileCredits").innerText).toBe(
      user.credits.toString()
    );
  });
});
