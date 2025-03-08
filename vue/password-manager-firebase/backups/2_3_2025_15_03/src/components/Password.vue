<script setup>
import { ref } from "@vue/reactivity";

import { store } from "../store";

import GeneratePasswordDialog from "./dialogs/GeneratePasswordDialog.vue";

const props = defineProps(['password'])

const oldPassword = ref(props.password.password);

const showPassword = ref(false)

const handleGeneratePasswordButtonClick = async () => {
  console.log("handleGeneratePasswordButtonClick()");
  const generatedPassword = await openDialog(GeneratePasswordDialog);

  if (generatedPassword) {
    // console.log("Generated password:", generatedPassword);

    props.password.password = generatedPassword;
  } else {
    // console.log("Password generation cancelled.");
  }
};

const handleSubmit = () => {
  oldPassword.value = props.password.password;
  store.changePassword(props.password.id, props.password.password);
};

const handleDeletePassword = () => {
  store.deletePassword(props.password.id);
};
</script>

<template>
  <div style="position: relative">
    
    <h3 class="mt-4" @click="showPassword = !showPassword"><u>{{ password.passwordName }}</u></h3>

    <button class="btn btn-primary btn-sm" style="position: absolute; top: 0; right: 0" @click="showPassword = !showPassword">{{ showPassword ? 'Hide' : 'Show' }}</button>

  </div>
  <div v-if="showPassword">
    <div class="my-4"><b>Username: </b>{{ password.username }}</div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="new-password" class="mb-2">Password: </label>
        <input
          class="form-control"
          type="text"
          v-model="password.password"
          name="new-password"
          ref="passwordInput"
        />
      </div>
      <p>
        <button
          class="btn btn-primary mt-4"
          v-if="password.password !== oldPassword"
        >
          Save changes
        </button>
      </p>
    </form>
    <div class="text-center">

      <button
        class="btn btn-secondary btn-sm"
        @click="handleGeneratePasswordButtonClick"
      >
        Generate Password
      </button>
      <!-- Delete Password Button -->
      <button class="btn btn-secondary btn-sm mx-4" @click="handleDeletePassword">
        Delete Password
      </button>
    </div>
  </div>
</template>

<style>
</style>