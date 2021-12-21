<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    import { getUniqueIdentifier } from '$lib/utils/shared.js';

    import Checkbox from './controls/Checkbox.svelte';
    import Date from './controls/Date.svelte';
    import Number from './controls/Number.svelte';
    import Select from './controls/Select.svelte';
    import Text from './controls/Text.svelte';
    import Time from './controls/Time.svelte';

    export let control;
    export let onChange = undefined;

    const ctrlId = getUniqueIdentifier('crl');

    const title = control.title || control.id
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

    if (control.type !== 'select') {
        control.value = control.default || control.value || '';
    }
</script>

<div class={control.class || 'col' }>
    {#if control.type === 'checkbox'}
        <Checkbox {control}
                  {title}
                  {ctrlId}
                  {onChange} />
    {:else}
        <label for={ctrlId} class="form-label">{title}</label>
        {#if control.type === 'date'}
            <Date {control}
                  {ctrlId}
                  {onChange} />
        {/if}
        {#if control.type === 'number'}
            <Number {control}
                    {ctrlId}
                    {onChange} />
        {/if}
        {#if control.type === 'select'}
            <Select {control}
                    {ctrlId}
                    {onChange} />
        {/if}
        {#if control.type === 'text'}
            <Text {control}
                  {ctrlId}
                  {onChange} />
        {/if}
        {#if control.type === 'time'}
            <Time {control}
                  {ctrlId}
                  {onChange} />
        {/if}
    {/if}
</div>
