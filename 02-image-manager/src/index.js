import "core-js/stable";
import "regenerator-runtime/runtime";

import "./style.css";
import ImageList from "./ImageList/ImageList";

// The in-browser mock backend is a service worker. On the very first visit the
// page is not yet controlled by it, so we register, wait until it's active and
// reload once if needed. Subsequent visits are served straight from the mock.
const ensureServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) return;

  try {
    await navigator.serviceWorker.register("./sw.js");
    await navigator.serviceWorker.ready;

    if (!navigator.serviceWorker.controller && !sessionStorage.getItem("sw-primed")) {
      sessionStorage.setItem("sw-primed", "1");
      window.location.reload();
    }
  } catch (error) {
    console.error("SW registration failed", error);
  }
};

const init = async () => {
  const app = document.querySelector("#app");
  app.appendChild(await ImageList());
};

window.addEventListener("DOMContentLoaded", () => {
  ensureServiceWorker().then(() => init());
});
