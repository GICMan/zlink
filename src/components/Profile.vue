<template>
  <div class="profile-container">
    <button @click="signOut" class="logout-button">
      <i class="fas fa-sign-out-alt"></i>
      <span class="logout-text">Logout</span>
    </button>

    <img class="profile-image" v-bind:src="profileImage" />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  props: ["profileImage"],
  methods: {
    signOut: function() {
      firebase.auth().signOut();
    }
  }
};
</script>

<style>
.profile-container {
  float: right;
  height: 75px;
  border-radius: 100px;
  background-color: #b5b8ff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  -webkit-box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.17);
  -moz-box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.17);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.17);
}

.profile-image {
  height: 100%;
  border-radius: 50%;
}

.logout-button {
  color: white;
  background: none;
  border: none;
  margin: 14px;
  font-size: 1.2em;
  font-weight: 600;
}

.logout-button:hover {
  cursor: pointer;
  color: rgb(206, 230, 247);
}

.logout-button:focus {
  outline: 0;
}

.fa-sign-out-alt {
  margin-right: 5px;
}
</style>
