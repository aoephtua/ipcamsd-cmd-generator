<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    import Group from './Group.svelte';

    export let group, setGroups;
</script>

<Group title={group.title}
       defaults={group.controls}
       bind:controls={group.entries}
       children={group.children}
       multiple={group.multiple}
       bind:collapsed={group.collapsed}
       {setGroups} />
