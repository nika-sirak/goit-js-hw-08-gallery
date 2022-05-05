import images from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalBackground: document.querySelector('.lightbox__overlay'),
  modalBtn: document.querySelector('[data-action="close-lightbox"]'),
  modalImg: document.querySelector('.lightbox__image'),
};

//Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
refs.galleryList.insertAdjacentHTML('beforeend', galleryMarkUp(images));

//Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
//Открытие модального окна по клику на элементе галереи.
refs.galleryList.addEventListener('click', onGalleryListClick);

function galleryMarkUp(items) {
  return items
    .map(({ preview, original, description }) => {
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
</li>`;
    })
    .join('');
}
//Подмена значения атрибута src элемента img.lightbox__image.
function onGalleryListClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  addImgAtributes(evt.target);

  openModal();
}

function onModalClick(evt) {
  refs.modalBtn.addEventListener('click', onModalBtnClick);
  if (evt.target === refs.modalBackground) {
    closeModal();
  }
}

function onModalBtnClick() {
  closeModal();
}

function openModal() {
  refs.modal.addEventListener('click', onModalClick);
  window.addEventListener('keydown', onKeyPressModal);
  refs.modal.classList.add('is-open');
  window.addEventListener('keydown', changeImageByKeys);
}
function closeModal() {
  refs.modal.classList.remove('is-open');
  window.removeEventListener('keydown', onKeyPressModal);
  window.removeEventListener('keydown', changeImageByKeys);
  clearImgAtributes();
}
function onKeyPressModal(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}
function addImgAtributes(img) {
  refs.modalImg.src = img.dataset.source;
  refs.modalImg.alt = img.alt;
}

function clearImgAtributes() {
  refs.modalImg.src = '';
  refs.modalImg.alt = '';
}

//Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

const imgSrcs = images.map(e => e.original);
function changeImageByKeys(evt) {
  let currentSrcIndex = imgSrcs.indexOf(refs.modalImg.src);
  let lastSrcIndex = imgSrcs.indexOf(imgSrcs[imgSrcs.length - 1]);
 
  if (evt.code === 'ArrowLeft') {
    currentSrcIndex =
      currentSrcIndex !== 0 ? currentSrcIndex - 1 : lastSrcIndex;
  }
  if (evt.code === 'ArrowRight') {
    currentSrcIndex =
      currentSrcIndex !== lastSrcIndex ? currentSrcIndex + 1 : 0;
  }

  setModalImg(currentSrcIndex);
}
function setModalImg(src) {
  refs.modalImg.src = imgSrcs[src];
}
