<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    import Button from '$lib/form/Button.svelte';

    export let themeClass = undefined;

    const electron = window['electron'];

    let maximized, fullscreen;

    if (electron.on) {
        electron
            .on('maximize', () => maximized = true)
            .on('unmaximize', () => maximized = false)
            .on('fullscreen', value => fullscreen = value);
    }

    const maximize = () => 
        maximized ? electron.unmaximize() : electron.maximize();
</script>

{#if electron && !fullscreen}
    <nav class={themeClass + ' fixed-top float-start w-100'}>
        <i class="bi bi-list p-3 text-primary"
           on:click={electron.showMenu}>
        </i>
        <div class="float-end p-3">
            <Button className="btn-outline-primary btn-sm"
                    onClick={electron.minimize}>
                -
            </Button>
            <Button className="btn-outline-primary btn-sm ms-1"
                    onClick={maximize}>
                {maximized ? '[[]]' : '[]'}
            </Button>
            <Button className="btn-outline-primary btn-sm ms-1"
                    onClick={electron.close}>
                x
            </Button>
        </div>
    </nav>

    <style>
        nav {
            -webkit-user-select: none;
            -webkit-app-region: drag;
        }

        nav i {
            font-size: 32px;
            cursor: pointer;
        }

        nav button, nav i {
            -webkit-app-region: no-drag;
        }
    </style>
{/if}
