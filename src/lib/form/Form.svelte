<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    import { cloneDeep } from 'lodash-es';

    import { formStorage, groups as groupsData } from '../../stores.js';

    import FormActionButtons from './FormActionButtons.svelte';
    import GroupEntry from './GroupEntry.svelte';

    export let groups;

    const setGroups = () => {
        if ($formStorage) {
            groupsData.set($groupsData);
        }
    };
    
    const setEntries = (entries, reset) => {
        for (let group of entries) {
            for (let control of group.controls) {
                if ((reset || !control.value) && control.default) {
                    control.value = control.default;
                }
            }
            if (reset || !group.entries) {
                group.entries = [ cloneDeep(group.controls) ];
            }
            if (group.children) {
                setEntries(group.children, reset);
            }
        }
    };

    const resetEntries = () => {
        setEntries(groups, true);
        groups = [ ...groups ];
        setGroups();
    };

    setEntries(groups);
</script>

{#if groups && groups.length > 0}
    <form>
        {#each groups as group}
            <GroupEntry {group}
                        {setGroups} />
        {/each}
        <FormActionButtons {groups}
                           onReset={resetEntries} />
    </form>
{/if}
