// ===============================================
//apiService.js
// import refs from './refs.js'
// import throwErrorInvalid from './index.js'

// const myStack = new Stack({
//     dir1: 'up',
//     maxOpen: 1,
//     maxStrategy: 'close',
//     modal: true,
//     overlayClose: true
// });

// export default function fetchImages(searchQuery) {
//     if (searchQuery) {
//         return fetch(`https://pixabay.com/api/${searchQuery}`)
//             .then(response => {
//                 if (response.ok) {
//                 return response.json();
//                 }
//                 if (response.status === 404) {
//                    throwErrorInvalid();
//             }
//             })
//     }
// }

// // ===============================================
// //index.js
// import { error, defaultModules, Stack } from '@pnotify/core/dist/PNotify.js';
// import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';
// defaultModules.set(PNotifyMobile, {});

// import debounce from 'lodash/debounce';
// import fetchImages from './apiService.js'
// import refs from './refs.js'
// import { template } from 'handlebars';
// import cardMarkup from './templates/cardMarkup.hbs'

// const myStack = new Stack({
//     dir1: 'up',
//     maxOpen: 1,
//     maxStrategy: 'close',
//     modal: true,
//     overlayClose: true
// });
// //========================================================
// const API_key = '23557940-e0a9cdf2e70b178fd7f1f33b8';
// let page = 1;
// let value = ''
// refs.button.classList.add('hide');
// refs.mainInput.addEventListener('input', debounce(onEnterInput, 1500));
// refs.button.addEventListener('click', () => {
//     page += 1;
//     const searchQuery = `?image_type=photo&orientation=horizontal&q=${value}&page=${page}&per_page=12&key=${API_key}`;
//     fetchAndRenderImages(searchQuery);
// });

// function onEnterInput(e) {
//     value = e.target.value.trim();
//     page = 1;
//     const searchQuery = `?image_type=photo&orientation=horizontal&q=${value}&page=${page}&per_page=12&key=${API_key}`;
//      if (value.length < 1) {
//          throwErrorInvalid();
//             return;
//         }   
//      refs.gallery.innerHTML = '';
//     fetchAndRenderImages(searchQuery);
//     refs.button.classList.remove('hide');
//  }

//  function fetchAndRenderImages(searchQuery) {
//     fetchImages(searchQuery)
//         .then(data => {
//             if (!data) {
//                 return;
//             }
//             return data;
//         })
//         .then(array => {
//         createMarkup(array);
//         onSmoothScroll();
//         }).catch(error => {
//             console.log(error);
//         });
// }

// function createMarkup(array) {
//     const { hits } = array;
//     if (hits.length === 0) {
//         throwErrorInvalid();
//             return;
//     }
//     refs.gallery.insertAdjacentHTML('beforeend', cardMarkup(hits));
// }

// function onSmoothScroll() {
//     refs.gallery.scrollIntoView({
//     behavior: 'smooth',
//     block: 'end',
// });
// }

// export function throwErrorInvalid() {
//     refs.mainInput.disabled = true;
//             error({
//              text: "Please enter valid query!",
//              stack: myStack
//             });
//     refs.mainInput.disabled = false;
//         refs.mainInput.value = '';
//  }