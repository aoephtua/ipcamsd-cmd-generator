<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    export let className = undefined;
    export let type = undefined;
    export let onClick = undefined;
    export let disabled = undefined;

    const click = (e) => {
        if (onClick) onClick();
        e.target.blur();
    };
</script>

<button class={'btn ' + (className || 'btn-primary')}
        type={type || 'button'}
        on:click={click}
        {disabled}>
    <slot></slot>
</button>
