<script setup>
import { ref } from "vue";

import { store } from "@/store";

const emailRef = ref("");
const passwordRef = ref("");
const passwordConfirmRef = ref("");

const handleSubmit = () => {
  const email = emailRef.value.trim();
  const password = passwordRef.value;
  const passwordConfirm = passwordConfirmRef.value;

  if (password !== passwordConfirm) {
    alert("Passwords do not match");
    return;
  }

  store.signup(email, password);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
        <p>
          <label for="password">Email (username):</label>
          <input id="email" class="form-control" type="email" placeholder="Give email here" v-model="emailRef" />
        </p>

        <p>
          <label for="password">Password:</label>
          <input id="password" class="form-control" type="password" placeholder="Give password here"
            v-model="passwordRef" />
        </p>

        <p>
          <label for="password-confirmation">Confirm your password:</label>
          <input id="password-confirmation" class="form-control" type="password"
            placeholder="Give password confirmation here" v-model="passwordConfirmRef" />
        </p>
      <div class="text-center mt-3">
        <button class="btn btn-primary">Sign Up</button>
        <button @click="store.currentView = 'Login'" class="btn btn-outline text-decoration-underline">Login
          instead</button>
      </div>
    </form>
</template>