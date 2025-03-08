<!-- This component will show a Generate Password Button. When the user presses the button
the Generate Password modal will open. User can then use this modal to generate a password. -->
<script setup>
  import GeneratePasswordForm from '../forms/GeneratePasswordForm.vue';
</script>

<template>
  <!-- Button that opens the Generate Password modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#generatePasswordModal"
  >
    Generate Password
  </button>
</template>