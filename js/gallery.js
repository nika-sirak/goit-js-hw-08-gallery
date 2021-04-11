import images from './gallery-items.js';

const listGalleryEl = document.querySelector('.js-gallery');

// Create Markup for items and insert into the gallery list
// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const makeGalleryItemMarkup = ({ preview, original, description }) => {
  return `
    <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
  `;
};
const galleryItems = images.map(makeGalleryItemMarkup).join('');
listGalleryEl.insertAdjacentHTML('beforeend', galleryItems);

//Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
const modalContainerEl = document.querySelector('.js-lightbox');

listGalleryEl.addEventListener('click', onItemGalleryClick);

function onItemGalleryClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();
  openModalWindow();
}

// Открытие модального окна по клику на элементе галереи.
function openModalWindow() {
  modalContainerEl.classList.add('is-open');
}

// Подмена значения атрибута src элемента img.lightbox__image.
const modalImgEl = document.querySelector('.lightbox__image');
const originalImagesEl = document.querySelectorAll('.gallery__image');

const originalImgLinksEl = originalImagesEl.forEach(image => {
  if (modalImgEl.src !== image.dataset.source) {
    modalImgEl.src = image.dataset.source;
  }
});

//Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
modalContainerEl.addEventListener('click', onModalContainerClick);

function onModalContainerClick(event) {
  const closeBtnEl = document.querySelector('[data-action="close-lightbox"]');
  if (closeBtnEl !== event.target) {
    return;
  }
  modalContainerEl.classList.remove('is-open');
}
//Очистка значения атрибута src элемента img.lightbox__image.
