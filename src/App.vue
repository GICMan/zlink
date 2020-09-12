<template>
  <div id="app">
    <div class="navbar drop-shadow">
      <router-link to="/" class="nav-link home-link">
        <img class="nav-logo" src="@/assets/logo-light.svg" alt="Z" />
      </router-link>
      <router-link
        v-if="this.$route.name == 'Home'"
        to="/dashboard"
        class="nav-link go-link"
      >
        Go To Zlink <i class="fa fa-arrow-circle-right"></i>
      </router-link>
      <img
        v-if="this.$route.name == 'Dashboard'"
        class="profile"
        :src="this.userData.photoURL"
      />
      <button
        v-if="this.$route.name == 'Dashboard'"
        @click="logout"
        class="logout"
      >
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </div>
    <router-view :loggedIn="loggedIn" :userData="userData" />
  </div>
</template>

<script>
import "./assets/main.css";
import { auth } from "./firebase";

export default {
  name: "App",
  components: {},
  data() {
    return {
      userData: {},
      loggedIn: false
    };
  },
  mounted: function() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.userData = user;
        this.loggedIn = true;

        if (this.$route.name == "Login") {
          this.$router.push("Dashboard");
        }
      } else {
        this.userData = null;
        this.loggedIn = false;
        this.$router.push("/");
      }
    });
  },
  methods: {
    logout: function() {
      auth.signOut();
    }
  }
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 45px;
  background-color: #b5b8ff;
  box-sizing: border-box;
  padding: 5px 50px 5px 50px;
}

.nav-logo {
  height: 25px;
  padding: 5px 0;
  display: block;
}

.go-link {
  float: right;
}

.nav-link {
  display: inline-block;
  text-decoration: none;
  color: white;
  line-height: 35px;
}

.logout {
  color: white;
  border: none;
  background-color: transparent;
  float: right;
  cursor: pointer;
  font-weight: 800;
  font-size: 1em;
  line-height: 35px;
}

.logout:hover {
  color: #f2f2f2;
}

.logout:focus {
  outline: 0;
}

.profile {
  border-radius: 50%;
  height: 31px;
  margin: 0px 5px;
  border: solid #f2f2f2 2px;
  float: right;
}
</style>
