const API = "images";

const getImages = async () => {
  try {
    const response = await fetch(API);
    const data = await response.json();
    return data;
  } catch (error) {
    // SW not available (e.g. custom domain without CNAME) — fall back to
    // loading the dataset directly from the static JSON file.
    const fallback = await fetch("images_data.json");
    return fallback.json();
  }
};

const updateImage = async (element) => {
  try {
    await fetch(API + `/${element.id}`, {
      method: "PATCH",
      body: JSON.stringify(element),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  } catch (error) {
    console.error("PATCH error", error);
  }
};

export { getImages, updateImage };
