/*
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
*/

import { writable } from 'svelte/store';

import groupsData from './data/groups.json';

const createWritableStore = (options) => {
    const { subscribe, set, update } = writable();

    let key = options.key;
    let values = options.values, defaultValue;
    let type = options.type;
    let getValue = options.getValue;
    let setValue = options.setValue;

    const setItem = (value) => localStorage.setItem(
        key,
        setValue ? setValue(value) : value
    );

    const store = {
        subscribe,
        init: () => {
            let value = localStorage.getItem(key);
            if (value !== null) {
                if (getValue) value = getValue(value);
            } else {
                value = defaultValue;
            }
            set(value);
        },
        get: () => localStorage.getItem(key) || defaultValue + '',
        set: (value) => {
            setItem(value);
            set(value);
        },
        reset: () => set(defaultValue)
    };

    if (type === 'json') {
        defaultValue = values;
        if (!getValue) {
            getValue = (value) => JSON.parse(value);
        }
        if (!setValue) {
            setValue = (value) => JSON.stringify(value);
        }
    }

    if (type === 'switch') {
        if (!values) {
            values = [true, false];
            if (!getValue) {
                getValue = (value) => value === 'true';
            }
        }
        defaultValue = values[0];
        store.switch = () => update(previous => {
            let value = previous === values[0] 
                ? values[1] : values[0];
            setItem(value);
            return value;
        });
    }

    return store;
};

export const mergeCommands = createWritableStore({
    key: 'mergeCommands',
    type: 'switch'
});

export const formStorage = createWritableStore({
    key: 'formStorage',
    type: 'switch'
});

export const groups = createWritableStore({
    key: 'groups',
    values: groupsData,
    type: 'json'
});

export const themeClass = createWritableStore({
    key: 'theme',
    values: [
        'bg-light text-dark',
        'bg-dark text-light'
    ],
    type: 'switch'
});
