import { error, defaultModules, Stack } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

import debounce from 'lodash/debounce';
import fetchImages from './apiService.js'
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


const API_key = '23557940-e0a9cdf2e70b178fd7f1f33b8';
const page = 1;

refs.mainInput.addEventListener('input', debounce(onEnterInput, 1000));

function onEnterInput(e) {
    const value = e.target.value.trim();
    const searchQuery = `?image_type=photo&orientation=horizontal&q=${value}&page=${page}&per_page=12&key=${API_key}`;

    if (value.length < 1) {
        return;
    }
    refs.gallery.innerHTML = '';
    fetchImages(searchQuery)
        .then(data => {
            if (!data) {
                return;
            }
            return data;
        })
        .then(array => {
            console.log(array.hits)
            refs.gallery.insertAdjacentHTML('beforeend', cardMarkup(array));
        })
        .catch(error => {
            console.log(error);
        });
}







