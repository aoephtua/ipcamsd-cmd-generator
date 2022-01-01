<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    import { onMount } from 'svelte';

    import { groups, themeClass } from '../stores.js';

    import TitleBar from '$lib/TitleBar.svelte';
    import Form from '$lib/form/Form.svelte';
    import Footer from '$lib/Footer.svelte';
    
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap-icons/font/bootstrap-icons.css';

    import '../scrollbar.css';

    let isElectron;

    onMount(() => {
        isElectron = navigator.userAgent
            .indexOf(' Electron/') > -1;
        groups.init();
        themeClass.init();
    });
</script>

{#if $themeClass}
    {#if isElectron}
        <TitleBar themeClass={$themeClass} />
    {/if}
    <div id="main-container" class={$themeClass}>
        <div class={'container ' + (isElectron ? 'pt-6 pb-5' : 'py-5')}>
            <main>
                <div class="row g-5">
                    <div class="col-12">
                        <Form groups={$groups} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    </div>
{/if}

{#if false}<slot/>{/if}

<style>
    #main-container {
        min-height: 100%;
    }

    .pt-6 {
        padding-top: 5rem !important;
    }
</style>
