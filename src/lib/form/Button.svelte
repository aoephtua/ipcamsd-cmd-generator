<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    export let title;
    export let className = undefined;
    export let type = undefined;
    export let onClick = undefined;
    export let disabled = undefined;
</script>

<button class={'btn ' + (className || 'btn-primary')}
        type={type || 'button'}
        on:click={onClick}
        {disabled}>
    {title}
</button>
