<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    export let control, ctrlId;
    export let onChange = () => {};
</script>

<select id={ctrlId}
        class="form-select"
        bind:value={control.value}
        on:change={() => onChange(control)}>
    {#each control.options as option}
        <option>{option}</option>
    {/each}
</select>
