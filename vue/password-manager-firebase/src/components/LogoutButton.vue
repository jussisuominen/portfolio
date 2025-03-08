<template>
  <button
    @click="handleClick"
  >
    Logout
  </button>
</template>

<script>
import { store } from "../store";

export default {
  name: "LogoutButton",
  setup() {
    const handleClick = () => {
      store.logout();
    };

    return { handleClick };
  },
};
</script>