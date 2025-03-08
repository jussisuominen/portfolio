<script setup>
import { onMounted, ref } from '@vue/runtime-core';
import { store } from './store';
// import { DialogWrapper } from 'vue3-promise-dialog';

import LoginForm from './components/forms/LoginForm.vue';
import SignUpForm from './components/forms/SignUpForm.vue';
import EncryptionKeyForm from './components/forms/EncryptionKeyForm.vue';
import AddPasswordForm from './components/forms/AddPasswordForm.vue';
import Passwords from './components/Passwords.vue';
// import AddPasswordModal from './components/modals/AddPasswordModal.vue';
import GeneratePasswordModal from './components/modals/GeneratePasswordModal.vue';
import Header from './components/Header.vue';

import securityKey from './key';
import BootstrapCard from './components/bootstrap/BootstrapCard.vue';

const accessGranted = ref(false);

onMounted(() => {
  // Show the page only if URL contains a security key as a query string parameter.
  // In <template> code we check if the security key is correct and conditionally render
  // the page if the security key is correct. If the security key is incorrect, we will
  // show the message "Access denied" to the user.

  // Extract "key" parameter from the query string.
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);

  // const key = urlParams.get('key');

  // if (key === securityKey) {
  //   accessGranted.value = true;
  // }

  // if (key === 'testmode') {
  //   accessGranted.value = true;
  //   store.backend = urlParams.get('backend');
  // }
});
</script>

<template>
  <div class="container">
    <!-- Don't render main view before login state is checked. Login state is checked
    when the user opens the app. -->
    <div v-if="store.loginStateChecked">
      <Header />
      <div class="col-md-6 offset-md-3 text-center">
        <BootstrapCard :title="store.currentView">
          <LoginForm v-if="store.currentView === 'Login' && store.loginStateChecked && !store.userIsLoggedIn" />
          <SignUpForm v-if="store.currentView === 'Signup' && store.loginStateChecked && !store.userIsLoggedIn" />
          <EncryptionKeyForm v-if="store.userIsLoggedIn && !store.passwords" />
          <Passwords v-if="store.currentView === 'Passwords' && store.userIsLoggedIn && store.passwords" />
          <AddPasswordForm v-if="store.currentView === 'Add Password' && store.loginStateChecked && store.userIsLoggedIn"/>
        </BootstrapCard>
      </div>
    </div>
    <!--These are needed for modals. -->
    <!-- <AddPasswordModal /> -->
    <GeneratePasswordModal />
    <!-- This is needed for vue-3-promise dialog. -->
    <!-- <DialogWrapper :transition-attrs="{name: 'dialog'}"/> -->
  </div>
  <!--Show this if the security key is not correct. -->
  <!-- <h1 v-else style="text-align: center">Access denied!</h1> -->
</template>

<style>
html,
body {
  height: 100%;
}

body {
  padding-top: 5rem;
  background: #333;
}

/* .card {
  background: #444;
  color: #eee;
  border-color: black;
}

.card-body {
  background: #666;
} */
</style>