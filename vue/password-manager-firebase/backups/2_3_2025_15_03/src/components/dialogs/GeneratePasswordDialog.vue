<script>
import { defineComponent } from 'vue';
import { closeDialog } from 'vue3-promise-dialog'
import GeneratePasswordForm from '../forms/GeneratePasswordForm.vue'

export default defineComponent({
    setup() {
        function usePassword(password) {
          closeDialog(password)
        }

        return {
            closeDialog,
            usePassword
        };
    },
    components: { GeneratePasswordForm }
});
</script>

<template>
  <div class="dialog">
    <div class="center bg-dark">
      <GeneratePasswordForm @use-password="usePassword" @cancel="closeDialog(false)"/>
      <button @click="closeDialog(false)" class="btn btn-secondary">Close</button>
      <!-- <button @click="closeDialog()" class="btn">Add Password</button> -->
    </div>
  </div>
</template>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
}

.btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>