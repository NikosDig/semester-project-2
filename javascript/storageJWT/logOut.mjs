import { remove } from "./removeJWT.mjs";

export function logOUt() {
  const loggerOut = document.querySelector(".loggerOut");

  loggerOut.onclick = function () {
    remove("token");
    remove("user");
    window.location.href = "/logIn.html";
  };
}
