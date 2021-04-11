import images from './gallery-items.js';

const listGalleryEl = document.querySelector('.js-gallery');
const galleryImagesEl = document.querySelectorAll('.gallery__image');
const lightboxImageEl = document.querySelector('.lightbox__image');

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
  addAtribute(event.target.dataset.source);
}

// Открытие модального окна по клику на элементе галереи.
function openModalWindow() {
  modalContainerEl.classList.add('is-open');
}

// Подмена значения атрибута src элемента img.lightbox__image.
function addAtribute(url) {
  lightboxImageEl.src = url;
}

//Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
modalContainerEl.addEventListener('click', onModalContainerClick);

function onModalContainerClick(event) {
  const closeBtnEl = document.querySelector('[data-action="close-lightbox"]');
  if (closeBtnEl !== event.target) {
    return;
  }
  modalContainerEl.classList.remove('is-open');
  removeAtribute(lightboxImageEl);
}
//Очистка значения атрибута src элемента img.lightbox__image.
function removeAtribute(event) {
  event.src = '';
}
