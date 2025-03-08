<script setup>
import { store } from "../store";

import Password from "./Password.vue";
import AddPasswordForm from "./forms/AddPasswordForm.vue";
import BootstrapCard from "./bootstrap/BootstrapCard.vue";
// import ShowAddPasswordModalButton from "./ShowAddPasswordModalButton.vue";
// import GeneratePasswordButton from "./ShowGeneratePasswordModalButton.vue";
</script>

<template>
  <div class="row">
    <!-- <h1>Password Vault</h1> -->

    <div class="col-md-6 offset-md-3 text-center">
      <!-- <div class="card">
        <div class="card-header">
          <h2><u>Passwords</u></h2>
        </div>
        <div class="card-body">
          <div v-if="store.passwords.length === 0">
            There are no passwords. Use the form below to add one.
          </div>
          <Password
            v-for="password in store.passwords"
            :key="password.id"
            :password="password"
          />
        </div> -->
      <BootstrapCard title="Passwords">
        <div v-if="store.passwords.length === 0">
          There are no passwords. Use the form below to add one.
        </div>

        <Password
          v-for="password in store.passwords"
          :key="password.id"
          :password="password"
        />
      </BootstrapCard>

      <hr />

      <!-- <h2><u>Add Password</u></h2> -->
      <!-- <BootstrapCard title="Add Password">
        <AddPasswordForm />
      </BootstrapCard> -->
    </div>
  </div>
</template>

<style>
</style>