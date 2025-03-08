<template>
  <!-- Generate Password Modal -->

  <div
    class="modal bg-dark"
    id="generatePasswordModal"
    tabindex="-1"
    aria-labelledby="generatePasswordModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="generatePasswordModalLabel">
            Generate Password
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body"><GeneratePasswordForm @use-password="useGeneratedPassword"/></div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            ref="closeButton"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { store } from "../../store";

import GeneratePasswordForm from "../forms/GeneratePasswordForm.vue";

const closeButton = ref(null)

function useGeneratedPassword(password) {
  console.log(closeButton)

  closeButton.value.click()

  store.useGeneratedPassword(password)
}
</script>