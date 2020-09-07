<template>
  <div class="login-container">
    <button
      @click="loginGoogle"
      class="primary-button login-google drop-shadow"
    >
      <i class="fab fa-google button-icon"></i> Login With Google
    </button>
    <h3 class="login-text">Or Login With Email</h3>

    <form>
      <label for="email">Email</label>
      <input
        class="text-field"
        type="email"
        name="email"
        placeholder="johndoe@hisdomain.com"
      />

      <label for="password">Password</label>
      <input
        class="text-field"
        type="password"
        name="password"
        placeholder="12345678"
      />

      <button
        class="login secondary-button drop-shadow"
        @click.prevent
        type="submit"
      >
        <i class="fas fa-envelope button-icon"></i>
        Login
      </button>
    </form>

    <span class="register-text">Don't have an account?</span>
    <router-link class="register-text" to="/register">Register</router-link>
  </div>
</template>

<script>
import { auth, provider } from "../firebase.js";

export default {
  methods: {
    loginGoogle: function() {
      auth.signInWithPopup(provider).catch(error => {
        console.error(error);
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 400px;
  margin: 50px auto;
}

.login-text {
  text-align: center;
  color: #a82981;
}

.login,
.login-google {
  width: 100%;
  font-weight: 700;
  font-size: 1em;
  position: relative;
}

.login {
  margin-bottom: 18px;
}

.register-text {
  text-align: center;
  color: #418bf9;
  font-size: 1.1em;
  width: 100%;
  display: block;
}

.button-icon {
  position: absolute;
  left: 30px;
  line-height: 20px;
}

label {
  margin-bottom: 10px;
  display: block;
  color: #6d72f2;
}
</style>
