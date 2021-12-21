<!--
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
-->

<script>
    export let title, id = 'modal';

    export const show = () => {
        var modal = new bootstrap.Modal(document.getElementById(id));
        modal.show();
    };

    const labelId = id + 'Label';
</script>

<div class="modal fade" id={id} tabindex="-1" aria-labelledby={labelId} aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content text-dark">
            <div class="modal-header">
                <h5 class="modal-title" id={labelId}>{title}</h5>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
