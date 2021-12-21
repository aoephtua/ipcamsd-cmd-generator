<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    import { themeClass } from '../stores.js';

    export let className = undefined;
</script>

<div class={className}>
    <i class={'text-primary bi bi-' + ($themeClass.includes('bg-light') ? 'moon' : 'sun')}
       on:click={themeClass.switch}>
    </i>
</div>

<style>
    i {
        cursor: pointer;
    }
</style>
