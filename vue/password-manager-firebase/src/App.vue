<script setup>
import { onMounted, ref } from '@vue/runtime-core';
import { store } from './store';

import LoginForm from './components/forms/LoginForm.vue';
import SignUpForm from './components/forms/SignUpForm.vue';
import MasterPasswordForm from './components/forms/MasterPasswordForm.vue';
import AddPasswordForm from './components/forms/AddPasswordForm.vue';
import Passwords from './components/Passwords.vue';
import Header from './components/Header.vue';

import BootstrapCard from './components/bootstrap/BootstrapCard.vue';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from './firebase/config';

// onMounted(() => {
//   console.log('App mounted');

//   // This is for testing firebase security rules! It should be removed in production.
//   // This should yield an error (FirebaseError: Missing or insufficient permissions). If it does not, then the security rules are not working.
//   getDocs(collection(db, 'encryptionKeys')).then(() => console.log('Firebase rules are not working!')).catch((error) => console.log(error + ' Firebase rules are working!'));
//   getDocs(collection(db, 'passwords')).then(() => console.log('Firebase rules are not working!')).catch((error) => console.log(error + ' Firebase rules are working!'));
// });
</script>

<template>
  <div class="container">
    <div v-if="store.loginStateChecked">
      <Header />
      <div class="col-md-6 offset-md-3 text-center">
        <BootstrapCard :title="store.currentView">
          <LoginForm v-if="store.currentView === 'Login' && store.loginStateChecked && !store.userIsLoggedIn" />
          <SignUpForm v-if="store.currentView === 'Signup' && store.loginStateChecked && !store.userIsLoggedIn" />
          <MasterPasswordForm v-if="store.currentView === 'Master Password'" />
          <Passwords v-if="store.currentView === 'Passwords' && store.userIsLoggedIn && store.passwords" />
          <AddPasswordForm
            v-if="store.currentView === 'Add Password' && store.loginStateChecked && store.userIsLoggedIn" />
          <div v-if="store.currentView === 'loading'">Loading...</div>
        </BootstrapCard>
      </div>
    </div>
  </div>
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
</style>