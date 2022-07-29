import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const refs = {
  gallery: document.querySelector(".gallery"),
};
// console.log(refs.gallery.text);

const galleryItemsDivs = galleryItems
  .map(({ preview, original, description }) => {
    return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </div>`;
  })
  .join("");

refs.gallery.innerHTML = galleryItemsDivs;
// console.log(galleryItemsDivs);

// refs.gallery.addEventListener("click", (evt) => {
//   evt.preventDefault();
//   // console.log(evt.target.classList.contains("gallery__image"));

//   if (!evt.target.classList.contains("gallery__image")) {
//     return;
//   }
//   basicLightbox
//     .create(
//       `
//       <img
//             class="gallery__image"
//             src="${evt.target.dataset.source}"
//             data-source="${evt.target.dataset.source}"
//             alt="${evt.target.alt}"
//             />
// 	`
//     )
//     .show();
// });

refs.gallery.addEventListener("click", (evt) => {
  evt.preventDefault();
  // console.log(evt.target.classList.contains("gallery__image"));
  const onEsapeClose = ({ code }) => {
    console.log(code);
    if (code === "Escape") {
      instance.close();
    }
  };
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }
  const instance = basicLightbox.create(
    `
      <img
            class="gallery__image"
            src="${evt.target.dataset.source}"
            data-source="${evt.target.dataset.source}"
            alt="${evt.target.alt}"
            />
	`,
    {
      /*
       * Prevents the lightbox from closing when clicking its background.
       */
      closable: true,
      /*
       * One or more space separated classes to be added to the basicLightbox element.
       */
      className: "",
      /*
       * Function that gets executed before the lightbox will be shown.
       * Returning false will prevent the lightbox from showing.
       */
      onShow: (instance) => {
        window.addEventListener("keydown", onEsapeClose);
      },
      /*
       * Function that gets executed before the lightbox closes.
       * Returning false will prevent the lightbox from closing.
       */
      onClose: (instance) => {
        window.removeEventListener("keydown", onEsapeClose);
      },
    }
  );
  instance.show();
});
