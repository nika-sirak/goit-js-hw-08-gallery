import images from './gallery-items.js';

const listGalleryEl = document.querySelector('.js-gallery');
const galleryImagesEl = document.querySelectorAll('.gallery__image');
const modalContainerEl = document.querySelector('.js-lightbox');
const lightboxImageEl = document.querySelector('.lightbox__image');
const lightboxOverlayEl = document.querySelector('.lightbox__overlay');

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
listGalleryEl.addEventListener('click', onItemGalleryClick);

function onItemGalleryClick(event) {
  const galleryImg = event.target;
  if (galleryImg.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();
  openModal();
  addAtributes(galleryImg);
}

// Открытие модального окна по клику на элементе галереи.
function openModal() {
  window.addEventListener('keydown', onEscKeyPress);
  modalContainerEl.classList.add('is-open');
}

// Подмена значения атрибута src элемента img.lightbox__image.
function addAtributes(img) {
  lightboxImageEl.src = img.dataset.source;
  lightboxImageEl.alt = img.alt;
}

//Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
modalContainerEl.addEventListener('click', onModalButtonClick);
function onModalButtonClick(event) {
  const closeBtnEl = document.querySelector('[data-action="close-lightbox"]');
  if (closeBtnEl !== event.target) {
    return;
  }
  closeModal();
}

// Закрытие модального окна по клику на div.lightbox__overlay.
modalContainerEl.addEventListener('click', onModalBackdropClick);
function onModalBackdropClick(event) {
  if (lightboxOverlayEl !== event.target) {
    return;
  }
  closeModal();
}
// Закрытие модального окна по нажатию клавиши ESC.
function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function closeModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  modalContainerEl.classList.remove('is-open');
  removeAtributes(lightboxImageEl);
}
//Очистка значения атрибута src элемента img.lightbox__image.
function removeAtributes(image) {
  image.src = '';
  img.alt = '';
}
