import { getImages, updateImage } from "../services/data-service";
import view from "./ImageList.html";

const ImageList = async () => {
  const images = await getImages();

  const divElement = document.createElement("div");
  divElement.className = "container";
  divElement.innerHTML = view;

  const table = divElement.querySelector("table");

  images.forEach((image) => {
    const row = table.insertRow();
    row.id = image.id;
    row.innerHTML = `
      <td class="table__image">
        <img src="${image.image}" alt="${image.file_name}"/>
      </td>
      <td class="table__processed">
        <input 
          name="processed" 
          data-image-id="${image.id}" 
          type="checkbox" ${image.processed ? "checked" : ""}
        />
      </td>
      <td class="table__views">
        <input 
          name="views" 
          data-image-id="${image.id}" 
          type="number"
          value="${image.views ? image.views : 0}"
        />
      </td>
      <td class="table__comment">
        <textarea 
          name="comments" 
          data-image-id="${image.id}"
        >${image.comments ? image.comments : ""}</textarea>
      </td>
    `;
  });

  divElement.addEventListener("change", (event) => {
    let element = {
      id: Number(event.target.dataset.imageId),
    };

    let value;
    switch (event.target.type) {
      case "checkbox":
        value = event.target.checked;
        break;

      case "number":
        value = event.target.valueAsNumber;
        break;

      case "textarea":
        value = event.target.value;
        break;

      default:
        value = event.target.value;
        break;
    }

    element[event.target.name] = value;
    updateImage(element);
  });

  return divElement;
};

export default ImageList;
