<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    import Modal from '$lib/Modal.svelte';

    export let commands = [], modal = undefined;

    const copyCommand = (command) => {
        if (command) {
            navigator.clipboard.writeText(command);
        }
    };
</script>

<Modal title="Commands" bind:this={modal}>
    {#each commands as command, i}
        <div class={'bg-light rounded p-3' + (i > 0 ? ' mt-3' : '')}>
            <div class="row">
                <div class="col-11">
                    <span class="text-muted">$</span> {command}
                </div>
                <div class="col-1">
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <a role="button"
                       tabindex="0"
                       class="text-decoration-none float-end"
                       on:click={() => copyCommand(command)}>
                        <i class="bi bi-clipboard"></i>
                    </a>
                </div>
            </div>
        </div>
    {/each}
</Modal>
