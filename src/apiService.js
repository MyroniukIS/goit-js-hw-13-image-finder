import { error, defaultModules, Stack } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

import refs from './refs.js'

const myStack = new Stack({
    dir1: 'up',
    maxOpen: 1,
    maxStrategy: 'close',
    modal: true,
    overlayClose: true
});

// объект отвечающий за логику HTTP-запросов к API
export default function fetchImages(searchQuery) {
    if (searchQuery) {
        return fetch(`https://pixabay.com/api/${searchQuery}`)
            .then(response => {
                if (response.ok) {
                return response.json();
                }
                if (response.status === 404) {
                    refs.mainInput.disabled = true;
                 error({
            text: "Please enter valid query!",
            stack: myStack
                 });
                    refs.mainInput.disabled = false;
                    refs.mainInput.value = '';
            }
            })
    }
}