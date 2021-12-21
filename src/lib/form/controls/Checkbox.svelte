<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    export let control, title, ctrlId;
    export let className = undefined;
    export let onClick = undefined;
    export let onChange = () => {};
</script>

<div class={'form-check form-switch' + (className ? ` ${className}` : '')}>
    <input type="checkbox"
           class="form-check-input"
           id={ctrlId}
           bind:checked={control.value}
           on:click={onClick}
           on:change={() => onChange(control)}>
    <label class="form-check-label" for={ctrlId}>
        {title}
    </label>
</div>
