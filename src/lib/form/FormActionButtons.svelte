<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    import { onMount } from 'svelte';

    import { mergeCommands, formStorage } from '../../stores.js';

    import Button from './Button.svelte';
    import Checkbox from './controls/Checkbox.svelte';
    import Commands from './Commands.svelte';

    export let groups, onReset;

    let modal, commands;

    const removals = { date: '-', time: ':' };
    
    const getValue = (control, group) => {
        let value = control.value + '';
        if (group && value === '') {
            value = group.controls.find(ctrl => ctrl.id === control.id)?.value + '';
        }
        if (control.strMeth) {
            value = value[control.strMeth]?.() || value;
        }
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

    const getOptions = (entries, group) => {
        let options = {};
        if (entries) {
            for (let control of entries) {
                let cmd = control.cmd !== false;
                let valid = group || control.value;
                if (cmd && valid && control.value !== control.default) {
                    if (notEquals(control, entries)) {
                        let key = getKey(control);
                        options[key] = getValue(control, group);
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

    const isEnabledGroup = (entries) => entries.some(
        entry => entry.id === 'enabled' && entry.value
    );

    const hasEnabledGroup = () => groups.some(
        group => group.entries.some(entry =>
            isEnabledGroup(entry)
        )
    );

    const getGroupOptions = (group) => {
        const options = [];
        for (let entry of group.entries) {
            if (isEnabledGroup(entry)) {
                options.push(getOptions(entry, group));
            }
        }
        return options;
    };

    const getMergedOptions = (options) => {
        const result = {};
        const keys = options
            .map(entries => Object.keys(entries))
            .sort((a, b) => b.length - a.length);
        for (const key of keys[0]) {
            result[key] = [];
            for (const option of options) {
                result[key].push(option[key]);
            }
            if (result[key].every(val => val === result[key][0])) {
                result[key] = result[key][0];
            } else {
                result[key] = result[key].join(' ');
            }
        }
        return result;
    };

    const getNativeCommands = () => {
        let commands = [];
        if (hasEnabledGroup()) {
            for (let group of groups) {
                let children = {};
                if (group.children) {
                    for (let child of group.children) {
                        for (let entry of child.entries) {
                            children = { ...children, ...getOptions(entry) };
                        }
                    }
                }
                let options = getGroupOptions(group);
                if (mergeCommands.get() === 'true') {
                    options = [].concat(getMergedOptions(options));
                }
                for (const entry of options) {
                    commands.push(
                        getCommandString({ ...entry, ...children })
                    );
                }
            }
        }
        return commands;
    };

    const handleGenerateClick = () => {
        commands = getNativeCommands();
        modal.show();
    };

    onMount(() => {
        mergeCommands.init();
        formStorage.init();
    });
</script>

<div class="row mb-3">
    <div class="col-12">
        <Checkbox title="Merge Commands"
            ctrlId="cbMergeCommands"
            control={{ value: $mergeCommands }}
            onClick={() => mergeCommands.switch() } />
    </div>
</div>

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
