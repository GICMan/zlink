<template>
  <div class="login-container">
    <p class="welcome-text">
      Welcome to ZLink! All your zoom links in one place. Create, edit, and
      remove different links as you need to. Sign in to get started!
    </p>
    <button class="login-button drop-shadow" @click="login">Sign in with Google</button>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  methods: {
    login: function() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
.login-container {
  text-align: center;
}

.welcome-text {
  color: #418bf9;
  margin: 50px 0 50px 0;
}

.login-button {
  border: none;
  color: white;
  background-color: #418bf9;
  height: 40px;
  width: 85%;
  border-radius: 20px;
  cursor: pointer;
}

.login-button:active {
  outline: 0;
}

.login-button:hover {
  background-color: #80b0f8;
}
</style>
