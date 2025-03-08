<script setup>
import { store } from '../store';

import ShowAddPasswordModalButton from './modals/ShowAddPasswordModalButton.vue';
import LogoutButton from './LogoutButton.vue';
</script>

<template>
  <div
    class="fixed-top pt-2 text-center bg-dark text-white"
    style="height: 4rem"
  >
    <h1 class="d-inline float-none">Password Vault</h1>
    <div class="fixed-top d-flex justify-content-end align-items-center mt-3">
      <LogoutButton
        class="btn btn-secondary mx-2 logout-button"
        v-if="store.userIsLoggedIn"
      />
      <span v-if="store.userEmail" class="mx-2">{{ store.userEmail }}</span>
    </div>
  </div>
</template>