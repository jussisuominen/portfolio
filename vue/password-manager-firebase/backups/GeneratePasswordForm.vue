<template>
  <h3>Generate password</h3>

  <form @submit.prevent="generatePassword">
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        name="lowercaseLettersCheckbox"
        value="lowercase-letters"
        v-model="passwordCharacters"
      />
      <label for="lowercaseLettersCheckbox" class="form-check-label"
        >Lowercase letters
      </label>
    </div>

    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        name="uppercaseLettersCheckbox"
        value="uppercase-letters"
        v-model="passwordCharacters"
      />
      <label for="uppercaseLettersCheckbox" class="form-check-label"
        >Uppercase letters
      </label>
    </div>

    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        name="numbersCheckbox"
        value="numbers"
        v-model="passwordCharacters"
      />
      <label class="form-check-label" for="numbersCheckbox">Numbers </label>
    </div>

    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        name="symbolsCheckbox"
        value="symbols"
        v-model="passwordCharacters"
      />
      <label class="form-check-label" for="symbolsCheckbox">Symbols </label>
    </div>

    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        name="excludeSimilarCharactersCheckbox"
        value="exclude-similar-characters"
        v-model="passwordCharacters"
      />
      <label class="form-check-label" for="excludeSimilarCharactersCheckbox"
        >Exclude Similar Characters
      </label>
    </div>

    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        name="strictCheckbox"
        value="strict"
        v-model="passwordCharacters"
      />
      <label class="form-check-label" for="excludeSimilarCharactersCheckbox"
        >Strict: Password must include at least one character from each pool
      </label>
    </div>

    <!-- <div class="form-row">
          <div class="col-7">
              <label for="passwordLength">Password length: </label>
              <input class="form-control" type="number" name="passwordLength" v-model="passwordLength" style="width: 5rem" />
          </div>

          <div class="col"><label for="passwordLength">Characters to exclude: </label>
          <input class="form-control" type="text" name="charsToExclude" v-model="charsToExclude" />
          </div>
        </div> -->

    <div class="text-center mt-3">
      <label for="passwordLength">Password length: &nbsp;</label>
      <input
        type="number"
        class="form-control"
        style="width: 5rem; display: inline"
        v-model="passwordLength"
      />

      <div class="my-3">
        <label for="charsToExclude">&nbsp;&nbsp;Characters to exclude: </label>
        <input
          class="form-control"
          type="text"
          name="charsToExclude"
          v-model="charsToExclude"
        />
      </div>
    </div>

    <div class="text-center">
      <!-- <button
        v-if="
          passwordCharacters.length > 0 &&
          passwordLength != '' &&
          passwordLength >= 3
        "
        class="btn btn-primary"
      >
        Generate password
      </button> -->

      <div
        v-if="
          passwordCharacters.length > 0 &&
          passwordLength != '' &&
          passwordLength >= 3
        "
      >
        <button class="btn btn-primary">Generate</button>
      </div>
    </div>

    <div v-if="passwordCharacters.length === 0">
      Choose at least one character group!
    </div>

    <div v-if="passwordLength < 3">
      The password is invalid (too short or the value is empty). To generate the
      password, it's length must be at least three characters to at least
      somewhat secure.
    </div>
  </form>

  <div class="text-center mt-4">
    <p v-if="generatedPassword">Generated password:</p>
    <p>{{ generatedPassword }}</p>

    <!-- This version of the "Use this password" button will be shown when the user has clicked
    Add Password button. It will close the Generate Password modal and return back to the Add Password modal and call useGeneratePassword method. -->
    <button
      class="btn btn-primary btn-sm"
      data-bs-target="#addPasswordModal"
      data-bs-toggle="modal"
      data-bs-dismiss="modal"
      v-if="passwordToEdit == '' && generatedPassword != ''"
      @click="useGeneratedPassword"
    >
      Use this password

    <!-- This version of the "Use this password" button will be shown when the user has clicked
    Generate Password button of a password item (when user wants to change an existing password with a new generated password). When clicked it will close the Generate Password modal and call useGeneratePassword method. -->
    </button>

    <button
      class="btn btn-primary btn-sm"
      data-bs-dismiss="modal"
      v-if="passwordToEdit != '' && generatedPassword != ''"
      @click="useGeneratedPassword"
    >
      Use this password
    </button>

    <button
      v-if="generatedPassword"
      @click="copyGeneratedPasswordToClipboard"
      class="btn btn-secondary btn-sm"
    >
      Copy to clipboard
    </button>
  </div>
</template>

<script>
import { computed, ref } from "vue";

import { store } from "../../store";

import generator from "generate-password";

export default {
  name: "GeneratePasswordForm",
  emits: "useGeneratedPassword",
  setup() {
    const passwordLength = ref(10);
    const passwordCharacters = ref(["lowercase-letters"]);
    const charsToExclude = ref("");

    //console.log('Password to edit: ' + passwordToEdit)

    //console.log(store.passwordToEdit)

    const generatedPassword = ref("");

    const generatePassword = () => {
      console.log("generatePassword()");
      console.log(passwordCharacters.value);

      generatedPassword.value = generator.generate({
        length: passwordLength.value,
        numbers: passwordCharacters.value.includes("numbers"),
        lowercase: passwordCharacters.value.includes("lowercase-letters"),
        uppercase: passwordCharacters.value.includes("uppercase-letters"),
        symbols: passwordCharacters.value.includes("symbols"),
        excludeSimilarCharacters: passwordCharacters.value.includes(
          "exclude-similar-characters"
        ),
        strict: passwordCharacters.value.includes("strict"),
        exclude: charsToExclude.value,
      });
    };

    const useGeneratedPassword = () => {
      store.useGeneratedPassword(generatedPassword.value);

      // Reset the value of generatedPassword so that when the user next time wants to generate the 
      // the previously generated password will not be shown.
      generatedPassword.value = ''
    };

    // const copyGeneratedPasswordToClipboard = () => {
    //   navigator.clipboard
    //     .writeText(generatedPassword.value)
    //     .then(() => alert("Password copied to clipboard!"));
    // };

    //onMounted(() => console.log(store.passwordToEdit))
    const passwordToEdit = computed(() => {
      return store.passwordToEdit;
    });

    return {
      generatedPassword,
      passwordCharacters,
      passwordLength,
      charsToExclude,
      passwordToEdit,
      useGeneratedPassword,
      generatePassword,
    };
  },
};
</script>

<style>
.form-check,
.card-body {
  text-align: left;
}
</style>