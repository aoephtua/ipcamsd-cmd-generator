<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    export let control, ctrlId;
    export let onChange = () => {};
</script>

<input type="time"
       class="form-control"
       id={ctrlId}
       bind:value={control.value}
       on:change={() => onChange(control)}
       step={control.step || null}>
