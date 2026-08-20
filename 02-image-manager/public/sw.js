// In-browser mock backend.
// Intercepts GET /images and PATCH /images/:id, backed by the original dataset
// loaded from images_data.json, replicating the previous Express API so the
// demo runs fully static with the real records.

const DATA_URL = "images_data.json";
const IMAGE_LIST = /\/images\/?$/;
const IMAGE_ITEM = /\/images\/(\d+)\/?$/;

let dataset = [];

self.addEventListener("install", (event) => {
  event.waitUntil(
    fetch(DATA_URL)
      .then((r) => r.json())
      .then((data) => {
        dataset = data;
        self.skipWaiting();
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Reset support: reload the original dataset so the demo returns to its
// initial state without touching any app logic.
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CLAIM") {
    self.clients.claim();
    event.source?.postMessage({ type: "CLAIM_DONE" });
  }
  if (event.data && event.data.type === "RESET") {
    fetch(DATA_URL)
      .then((r) => r.json())
      .then((data) => {
        dataset = data;
        event.source?.postMessage({ type: "RESET_DONE" });
      });
  }
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method === "GET" && IMAGE_LIST.test(url.pathname)) {
    event.respondWith(
      new Response(JSON.stringify(dataset), {
        headers: { "Content-Type": "application/json" },
      })
    );
    return;
  }

  const itemMatch = url.pathname.match(IMAGE_ITEM);
  if (event.request.method === "PATCH" && itemMatch) {
    event.respondWith(
      event.request
        .clone()
        .json()
        .then((element) => {
          const index = dataset.findIndex((image) => image.id === element.id);
          if (index !== -1) {
            dataset[index] = { ...dataset[index], ...element };
            return new Response(JSON.stringify({ message: "Image updated!" }), {
              headers: { "Content-Type": "application/json" },
              status: 200,
            });
          }
          return new Response(
            JSON.stringify({ message: "Wrong id" }),
            { headers: { "Content-Type": "application/json" }, status: 400 }
          );
        })
    );
    return;
  }
});
