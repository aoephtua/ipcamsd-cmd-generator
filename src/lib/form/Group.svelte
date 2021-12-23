<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    import { cloneDeep } from 'lodash-es';

    import { getUniqueIdentifier } from '$lib/utils/shared.js';

    import Button from './Button.svelte';
    import GroupEntry from './GroupEntry.svelte';
    import Line from './Line.svelte';
    import UserControl from './UserControl.svelte';

    export let title, defaults, controls, children, multiple;
    export let collapsed = undefined;
    export let setGroups = () => {};

    let containerId = getUniqueIdentifier('collapse');

    const handleAddClick = () => {
        controls = controls.concat([ cloneDeep(defaults) ]);
        setGroups();
    };

    const handleRemoveClick = () => {
        controls.pop();
        controls = [ ...controls ];
        setGroups();
    };

    const setCollapsed = () => {
        collapsed = !collapsed;
        setGroups();
    };
</script>

<div class="row mb-3">
    <div class={multiple ? 'col-6' : 'col'}>
        <h5 class="d-inline">{title}</h5>
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="ms-1"
           role="button"
           tabindex="0"
           on:click={setCollapsed}>
            <i class={'bi bi-chevron-' + (collapsed ? 'down' : 'up')}></i>
        </a>
    </div>
    {#if multiple}
        <div class="col-6">
            <div class="float-end">
                <Button title="+"
                        className="btn-primary btn-sm"
                        onClick={handleAddClick}
                        disabled={controls.length === multiple?.limit} />
                <Button title="-"
                        className="btn-primary btn-sm ms-1"
                        onClick={handleRemoveClick}
                        disabled={controls.length === 1} />
            </div>
        </div>
    {/if}
</div>
{#if controls && controls.length > 0}
    <div class={'collapse' + (!collapsed ? 'show' : '')} id={containerId}>
        <div class="row gy-3">
            {#each controls as control}
                {#each control as entry}
                    <UserControl control={entry}
                                 onChange={setGroups} />
                {/each}
            {/each}
        </div>
    </div>
{/if}
<Line />
{#if children && children.length > 0}
    {#each children as child}
        <GroupEntry group={child}
                    {setGroups} />
    {/each}
{/if}
