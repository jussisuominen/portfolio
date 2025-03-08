<script setup>
import { ref } from "vue";

import { store } from "@/store";

const emailRef = ref("");
const passwordRef = ref("");

const handleSubmit = () => {
  const email = emailRef.value;
  const password = passwordRef.value;
  store.login(email, password);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <!-- Email (username) input -->
    <div>
      <label for="password">Email (username):</label>
    </div>
    <input id="email" class="form-control" type="email" placeholder="Give email here" v-model="emailRef" />

    <!-- Password input -->
    <div class="ml-1 mt-2">
      <label for="password">Password:</label>
    </div>
    <input id="password" class="form-control" type="password" placeholder="Give password here" v-model="passwordRef" />
    <!-- Login and "Signup instead" buttons -->
    <div class="text-center mt-3">
      <button class="btn btn-primary">Login</button>
      <button @click="store.currentView = 'Signup'" class="btn btn-outline text-decoration-underline">Signup
        instead</button>
    </div>
  </form>
</template>