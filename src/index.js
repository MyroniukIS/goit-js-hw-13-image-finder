import { error, defaultModules, Stack } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

import debounce from 'lodash/debounce';
import objFetchImg from './apiService.js'
import refs from './refs.js'
import { template } from 'handlebars';
import cardMarkup from './templates/cardMarkup.hbs'

const myStack = new Stack({
    dir1: 'up',
    maxOpen: 1,
    maxStrategy: 'close',
    modal: true,
    overlayClose: true
});
//========================================================

refs.button.classList.add('hide');
refs.mainInput.addEventListener('input', debounce(onEnterInput, 1500));
refs.button.addEventListener('click', () => {
    objFetchImg.fetchImages()
});

function onEnterInput(e) {
    let value = e.target.value.trim();
    if (value.length < 1) {
         throwErrorInvalid();
            return;
        }   
    objFetchImg.query(value);
    refs.gallery.innerHTML = '';
    objFetchImg.fetchImages();
    refs.button.classList.remove('hide');
 }

//  function fetchAndRenderImages(searchQuery) {
//     fetchImages(searchQuery)
//         .then(data => {
//             // if (!data) {
//             //     return;
//             // }
//             // return data;
//         })
//         .then(array => {
//         // createMarkup(array);
//         // onSmoothScroll();
//         }).catch(error => {
//             console.log(error);
//         });
// }

export function createMarkup(hits) {
        if (hits.length === 0) {
        throwErrorInvalid();
            return;
    }
    refs.gallery.insertAdjacentHTML('beforeend', cardMarkup(hits));
}

export function onSmoothScroll() {
    refs.gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
});
}

export function throwErrorInvalid() {
    refs.mainInput.disabled = true;
            error({
             text: "Please enter valid query!",
             stack: myStack
            });
    refs.mainInput.disabled = false;
        refs.mainInput.value = '';
 }