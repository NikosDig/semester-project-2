import { remove } from "./removeJWT.mjs";

export function logOUt() {
  const loggerOut = document.querySelector(".loggerOut");

  loggerOut.onclick = function () {
    console.log("Button clicked!");
    remove("token");
    remove("user");
    location.reload();
  };
}
