<script setup>
import { store } from "../store";

import Password from "./Password.vue";
</script>

<template>

  <div class="text-center">
    <p v-if="store.passwords.length === 0">
      There are no passwords.
    </p>

    <div class="mt-auto">
      <button @click="store.currentView = 'Add Password'" type="button" class="btn btn-primary">Add Password</button>
    </div>
  </div>

  <Password v-for="password in store.passwords" :key="password.id" :password="password" />

</template>

<style></style>