import { error, defaultModules, Stack } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

import refs from './refs.js'
import throwErrorInvalid from './index.js'

const myStack = new Stack({
    dir1: 'up',
    maxOpen: 1,
    maxStrategy: 'close',
    modal: true,
    overlayClose: true
});

export default function fetchImages(searchQuery) {
    if (searchQuery) {
        return fetch(`https://pixabay.com/api/${searchQuery}`)
            .then(response => {
                if (response.ok) {
                return response.json();
                }
                if (response.status === 404) {
                   throwErrorInvalid();
            }
            })
    }
}