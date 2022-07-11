<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    import { onMount } from 'svelte';

    import { formStorage } from '../../stores.js';

    import Button from './Button.svelte';
    import Checkbox from './controls/Checkbox.svelte';
    import Commands from './Commands.svelte';

    export let groups, onReset;

    let modal, commands;

    const removals = { date: '-', time: ':' };
    
    const getValue = (control) => {
        let value = (control.value + '').toLowerCase();
        let removal = removals[control.type];
        if (removal) {
            value = value.replaceAll(removal, '');
        }
        return value;
    };

    const getKey = (control) => {
        let key = control.relationId || control.id;
        if (control.reverseKey) {
            const char = '-';
            key = key.split(char).reverse().join(char);
        }
        return key;
    };

    const notEquals = (control, entries) => {
        let notEquals = control.notEquals;
        if (notEquals) {
            let relatedControl = entries.find(entry => entry.id === notEquals);
            if (relatedControl) {
                return control.value !== relatedControl.value;
            }
        }
        return true;
    };

    const getOptions = (entries) => {
        let options = {};
        if (entries) {
            for (let control of entries) {
                if (control.value && control.value !== control.default) {
                    if (notEquals(control, entries)) {
                        let key = getKey(control);
                        options[key] = getValue(control);
                    }
                }
            }
        }
        return options;
    };

    const getCommandString = (options) => {
        return 'ipcamsd ' + Object.keys(options)
            .map(key => `--${key} ${options[key]}`)
            .join(' ');
    };

    const getNativeCommands = () => {
        let commands = [];
        for (let group of groups) {
            let children = {};
            if (group.children) {
                for (let child of group.children) {
                    for (let entry of child.entries) {
                        children = { ...children, ...getOptions(entry) };
                    }
                }
            }
            for (let entry of group.entries) {
                let options = { ...getOptions(entry), ...children };
                commands.push(
                    getCommandString(options)
                );
            }
        }
        return commands;
    };

    const handleGenerateClick = () => {
        commands = getNativeCommands();
        modal.show();
    };

    onMount(() => formStorage.init());
</script>

<div class="row">
    <div class="col-8">
        <Button onClick={handleGenerateClick}>
            Generate
        </Button>
        <Button className="btn-primary ms-1"
                onClick={onReset}>
            Reset
        </Button>
    </div>
    <div class="col-4 d-flex align-self-center justify-content-end">
        <Checkbox title="Local Storage"
                  ctrlId="cbLocalStorage"
                  control={{ value: $formStorage }}
                  onClick={() => formStorage.switch() } />
    </div>
</div>

<Commands {commands} 
          bind:modal={modal} />
