<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    import { onMount } from 'svelte';

    import { groups, themeClass } from '../stores.js';

	import Form from '$lib/form/Form.svelte';
    import Footer from '$lib/Footer.svelte';
    
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap-icons/font/bootstrap-icons.css';

    onMount(() => {
        groups.init();
        themeClass.init();
    });
</script>

{#if $themeClass}
    <div id="main-container" class={$themeClass}>
        <div class="container py-5">
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

<style>
    #main-container {
        min-height: 100%;
    }
</style>
