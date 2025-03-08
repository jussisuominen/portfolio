<script setup>
import AddPasswordForm from "../forms/AddPasswordForm.vue";
</script>

<template>
    <div
    class="modal"
    id="addPasswordModal"
    tabindex="-1"
    aria-labelledby="addPasswordModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addPasswordModalLabel">Add Password</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body"><AddPasswordForm /></div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import AddPasswordForm from "../forms/AddPasswordForm.vue";

export default {
    name: "AddPasswordModal",
    components: { AddPasswordForm }
}
</script> -->

<style>

</style>