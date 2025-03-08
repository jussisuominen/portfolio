<template>
  <div v-if="noMasterPassword" class="card bg-secondary text-dark mb-4 p-2 rounded text-white">
    Please provide your master password. Choose a secure password that you will remember or store it in a safe place. If
    you forget your master password, you will lose access to your passwords!
  </div>
  <form v-if="noMasterPassword != null" @submit.prevent="handleSubmit">
    <input class="form-control" type="password" placeholder="Give master password here" v-model="encryptionKey" />
    <button class="btn btn-primary mt-2">{{ noMasterPassword === false ? 'Load passwords' : 'Set master password' }}</button>
  </form>
  <div v-else>Loading...</div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { store } from "../../store";
import { encryptionKeyIsSet } from "../../firebase/passwords/encryptionKeyIsSet";
import setEncryptionKey from "../../firebase/passwords/setEncryptionKey";

let noMasterPassword = ref(null);
const encryptionKey = ref('');

const handleSubmit = async () => {
  if (noMasterPassword.value === true) {
    try {
      await setEncryptionKey(encryptionKey.value, store.userId)
      store.loadPasswords(encryptionKey.value);
    } catch (error) {
      alert(error)
    }
  } else {
    console.log('Trying to decrypt passwords with key: ' + encryptionKey.value);
    store.loadPasswords(encryptionKey.value);
  }
};

onMounted(() => {
  encryptionKeyIsSet(store.userId).then(result => noMasterPassword.value = !result)
})
</script>