<template>
  <div class="d-flex flex-column justify-content-center" style="height: 50vh">
    <!-- <h1 class="text-center mb-4">Password Vault</h1> -->
    <form @submit.prevent="handleSubmit">
      <div class="mx-auto" style="max-width: 30rem">
        <h2 class="text-center mb-4 ">
          <label for="master-password">Master password:</label>
        </h2>
        <input
          id="master-password"
          class="form-control"
          type="password"
          placeholder="Give master password here"
          v-model="masterPassword"
        />
      </div>
      <div class="text-center">
        <button class="btn btn-primary mt-3">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

import { store } from "@/store";

export default {
  name: "MasterPassword",
  setup() {
    const masterPassword = ref("");

    const handleSubmit = () => {
      const password = masterPassword.value;
      store.login("jussitsuominen@gmail.com", password);
    };

    return { masterPassword, handleSubmit };
  },
};
</script>