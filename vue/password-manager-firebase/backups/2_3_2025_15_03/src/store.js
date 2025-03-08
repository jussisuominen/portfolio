import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase/config";

import fireStoreUpdatePassword from "./firebase/passwords/updatePassword";
import fireStoreLoadPasswords from "./firebase/passwords/loadPasswords";
import fireStoreAddPassword from "./firebase/passwords/addPassword";
import fireStoreDeletePassword from "./firebase/passwords/deletePassword";

import { reactive } from "vue";

import securityKey from "./key.js";

export const store = reactive({
  userId: null,
  userIsLoggedIn: false,
  userEmail: null,
  loginStateChecked: false,
  passwords: null,
  encryptionKey: "",
  newPassword: null,
  passwordToEdit: "",
  accessKey: securityKey,
  currentView: "Login",
  login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        //alert('User signed in successfully!')
        this.userIsLoggedIn = true;
        this.currentView = "Master Password"
      })
      .catch((error) => {
        alert("Unable to login! " + error);
      });
  },
  logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // alert('The user signed out successfully!')
        store.passwords = null;
        store.currentView = "Login";
      })
      .catch((error) => {
        // An error happened.
        alert("Unable to sign out the user! " + error);
      });
  },
  async signup(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("User signed up successfully!");
      this.userIsLoggedIn = true;
    } catch (error) {
      alert("Unable to sign up the user! " + error);
    }
  },
  async addPassword(passwordName, username, password) {
    const addedPassword = await fireStoreAddPassword(
      store.userId,
      passwordName,
      username,
      password,
      this.encryptionKey
    );

    this.passwords.push({
      id: addedPassword.id,
      passwordName,
      username,
      password,
    });
  },
  loadPasswords(encryptionKey) {
    this.encryptionKey = encryptionKey;

    fireStoreLoadPasswords(encryptionKey, this.userId)
      .then((passwords) => {
        if (passwords) {
          this.passwords = [];
          this.passwords.push(...passwords);
        }
      })
      .catch((error) => console.log("Could not load passwords!", error));
  },
  changePassword(passwordId, newPassword) {
    fireStoreUpdatePassword(passwordId, newPassword, this.encryptionKey)
      .then(() => alert("Password changed successfully!"))
      .catch((error) => alert("Could not update password:", error));

    let password = this.passwords.find(
      (password) => password.id === passwordId
    );

    password.password = newPassword;
  },
  useGeneratedPassword(password) {
    console.log(
      "Setting password of " + this.passwordToEdit + " to " + password
    );

    const passwordToChange = this.passwords.find(
      (p) => p.id === this.passwordToEdit
    );

    passwordToChange.password = password;

    this.passwordToEdit = "";
  },
  deletePassword(passwordId) {
    fireStoreDeletePassword(passwordId)
      .then(() => {
        alert("Password deleted successfully!");
        this.passwords = this.passwords.filter((p) => p.id !== passwordId);
      })
      .catch((error) => alert("Could not delete password! " + error));
  },
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is logged in!')
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    store.userIsLoggedIn = true;
    console.log(user.uid);
    store.userId = user.uid;
    store.userEmail = user.email;
  } else {
    console.log('User is logged out!')
    // User is signed out
    store.userIsLoggedIn = false;
    store.userId = null;
    store.userEmail = null;
  }

  store.loginStateChecked = true;
});
