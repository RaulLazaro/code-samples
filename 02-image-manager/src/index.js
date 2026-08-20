import "core-js/stable";
import "regenerator-runtime/runtime";

import "./style.css";
import ImageList from "./ImageList/ImageList";

// The in-browser mock backend is a service worker. On the very first visit the
// page is not yet controlled by it, so we register, wait until it's active and
// reload once if needed. Subsequent visits are served straight from the mock.
const SW_KEY = "sw-primed:" + location.pathname.replace(/\/index\.html$/, "/");

const ensureServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) return;

  try {
    await navigator.serviceWorker.register("./sw.js");
    const reg = await navigator.serviceWorker.ready;

    if (navigator.serviceWorker.controller) {
      sessionStorage.removeItem(SW_KEY);
      return;
    }

    // SW is active but not controlling this page. Ask it to claim us.
    if (reg.active) {
      reg.active.postMessage({ type: "CLAIM" });
    }

    await new Promise((resolve) => {
      const timeout = setTimeout(resolve, 3000);
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        clearTimeout(timeout);
        resolve();
      }, { once: true });
    });
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
