<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    import ThemeSwitch from './ThemeSwitch.svelte';

    const year = new Date().getFullYear();
</script>

<footer class="pt-5 text-muted text-small">
    <div class="row">
        <div class="col-10">
            &copy; {year} <a href="https://github.com/aoephtua" target="_blank">aoephtua</a>
        </div>
        <div class="col-2">
            <ThemeSwitch className="float-end" />
        </div>
    </div>
</footer>
