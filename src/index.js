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
 let page = 1;
let value = ''
 console.log(value)
 
refs.mainInput.addEventListener('input', debounce(onEnterInput, 1500));
 
refs.button.addEventListener('click', () => {
    const searchQuery = `?image_type=photo&orientation=horizontal&q=${value}&page=${page}&per_page=12&key=${API_key}`;
    console.log(value)
    fetchImages(searchQuery).then(array => {
            console.log(array)
        createMarkup(array);
        onSmoothScroll();
            page += 1;
            console.log("on click", page)
        }).catch(error => {
            console.log(error);
        });
});

 function onEnterInput(e) {
     value = e.target.value.trim();
     console.log(value)
     const searchQuery = `?image_type=photo&orientation=horizontal&q=${value}&page=${page}&per_page=12&key=${API_key}`;
     
     
     if (value.length < 1) {
         error({
             text: "Please enter valid query!",
             stack: myStack
            });
            return;
        }   
     refs.gallery.innerHTML = '';
     page = 1;
     console.log(page)
        fetchImages(searchQuery)
        .then(data => {
            if (!data) {
                return;
            }
            return data;
        })
        .then(array => {
            console.log(array)
            
            createMarkup(array);
            page += 1;
            console.log("on input", page)
            
        })
        .catch(error => {
            console.log(error);
        });
}

function createMarkup(array) {
    const { hits } = array;
    if (hits.length === 0) {
            error({
             text: "Please enter valid query!",
             stack: myStack
            });
            return;
        }   
    refs.gallery.insertAdjacentHTML('beforeend', cardMarkup(hits));
}

function onSmoothScroll() {
    refs.gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
});
}