<script setup>
import { ref } from "@vue/reactivity";

import { store } from "../../store";

import GeneratePasswordForm from "./GeneratePasswordForm.vue";

const passwordName = ref("");
const username = ref("");
const password = ref("");

store.newPassword = password;

const showGeneratePasswordForm = ref(false);

const handleSubmit = () => {
  //const closeModalButton = document.getElementById("closeModalButton");
  // console.log("Password name:", passwordName.value);
  // console.log("Username:", username.value);
  // console.log("Password:", password.value);
  store
    .addPassword(passwordName.value, username.value, password.value)
    .then(() => {
      alert("Password added successfully!");
      // Close the modal by "clicking" the close modal button.
      passwordName.value = "";
      username.value = "";
      password.value = "";
      //closeModalButton.click();
    })
    .catch((error) => alert("Could not add the password!", error));
};

const generatePassword = () => {
  showGeneratePasswordForm.value = true;
};

const useGeneratedPassword = (generatedPassword) => {
  showGeneratePasswordForm.value = false;
  console.log("AddPasswordForm: useGeneratedPassword()");
  console.log('Generated password:', generatedPassword)
  password.value = generatedPassword
};
</script>

<template>
  <div v-if="!showGeneratePasswordForm">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label" for="passwordName">Password name: </label>
        <input
          class="form-control"
          type="text"
          id="passwordName"
          required
          v-model="passwordName"
        />
      </div>
      <br />
      <div class="form-group">
        <label class="form-label" for="passwordName">Username: </label>
        <input
          class="form-control"
          type="text"
          name="username"
          required
          v-model="username"
        />
      </div>
      <br />
      <div class="form-group">
        <label class="form-label" for="password">Password:</label>
        <input
          class="form-control"
          type="text"
          name="password"
          required
          v-model="password"
        />
      </div>
      <hr />
      <div class="text-center">
        <button class="btn btn-primary">Add password</button>
      </div>
    </form>
  </div>

  <p class="text-center mt-3">
    <button class="btn btn-secondary btn-sm" @click="generatePassword" v-if="!showGeneratePasswordForm">Generate Password</button>
  </p>

  <div v-if="showGeneratePasswordForm">
    <GeneratePasswordForm @use-password="useGeneratedPassword" @cancel="showGeneratePasswordForm = false"/>
    <!-- This button is for canceling the password generation. It will hide the
    Generate Password form and thus returning the user back to the Add Password form. -->
    <!-- <button class="btn btn-secondary mt-4" @click="showGeneratePasswordForm = false">Back to Add Password Form</button> -->
  </div>
</template>