<template>
  <div id="app">
    <Profile v-bind:profileImage="userData.photoURL" v-if="userData" />
    <div class="main-container drop-shadow">
      <div class="heading">
        <h1 class="container-title" v-bind:class="{ centered: !userData }">
          My Zoom Links
        </h1>

        <div v-if="userData && view.name === 'LIST'" class="device-selector">
          <button
            class="icon-wrapper"
            :class="selectedDevice === 0 ? 'selected' : ''"
            @click="selectDevice(0)"
          >
            <i class="fas fa-desktop"></i>
          </button>
          <button
            class="icon-wrapper"
            :class="selectedDevice === 1 ? 'selected' : ''"
            @click="selectDevice(1)"
          >
            <i class="fas fa-mobile-alt"></i>
          </button>
          <button
            class="icon-wrapper"
            :class="selectedDevice === 2 ? 'selected' : ''"
            @click="selectDevice(2)"
          >
            <i class="fas fa-globe"></i>
          </button>
        </div>
      </div>
      <LinkList
        v-if="loggedIn && view.name === 'LIST'"
        :userData="userData"
        :selectedDevice="selectedDevice"
        @add-link="view.name = 'ADD'"
        @edit-link="startEditting"
      />
      <AddLink
        v-if="view.name === 'ADD'"
        @add-link="addLink"
        @cancel="view.name = 'LIST'"
      />
      <EditLink
        v-if="view.name === 'EDIT'"
        :originalAlias="view.data.alias"
        :originalData="view.data.initialData"
        @edit-link="editLink"
        @cancel="view.name = 'LIST'"
      />
      <Login v-if="!userData" />
    </div>
  </div>
</template>

<script>
import Profile from "./components/Profile.vue";
import Login from "./components/Login.vue";
import LinkList from "./components/LinkList.vue";
import AddLink from "./components/AddLink.vue";
import EditLink from "./components/EditLink.vue";
import "./assets/main.css";

import * as firebase from "./firebase.js";

export default {
  name: "App",
  components: {
    Profile,
    LinkList,
    Login,
    AddLink,
    EditLink
  },
  data() {
    return {
      userData: {},
      loggedIn: false,
      view: {
        name: "LIST",
        data: {}
      },
      selectedDevice: 0
    };
  },
  mounted: function() {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.userData = user;
        this.loggedIn = true;
      } else {
        this.userData = null;
        this.loggedIn = false;
      }
    });
  },
  methods: {
    addLink: function(payload) {
      firebase.addLink(payload, () => {
        this.view.name = "LIST";
      });
    },
    selectDevice: function(device) {
      this.selectedDevice = device;
    },
    editLink: function(payload) {
      payload.uid = this.view.data.uid;
      firebase.updateLink(payload, () => {
        this.view.name = "LIST";
      });
    },
    startEditting: function(payload) {
      this.view.name = "EDIT";
      this.view.data = payload;
    },
    updateLinks: function(payload) {
      this.links = payload;
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Roboto Slab", serif;
  padding: 40px;
}

.main-container {
  max-width: 500px;
  border-style: solid;
  border-radius: 20px;
  border-color: #b5b8fd;
  border-width: 2px;

  position: relative;

  padding: 0px 20px 30px 20px;

  min-height: 400px;
  margin: 0 auto;
  margin-top: 100px;
}

.container-title {
  color: #418bf9;
  display: inline;
  text-overflow: ellipsis;
}
.centered {
  text-align: center;
  display: block;
}

.device-selector {
  color: #418bf9;

  padding: 2px 5px 2px 5px;

  border-style: solid;
  border-color: #418bf9;
  border-width: 2px;
  border-radius: 30px;

  float: right;
}

@media only screen and (max-width: 558px) {
  .device-selector {
    float: none;
    display: inline-block;
    margin-top: 15px;
  }
}

.icon-wrapper {
  width: 30px;
  height: 30px;

  line-height: 50%;
  text-align: center;

  cursor: pointer;
  border-radius: 50%;
  margin: 2px;
  font-size: 18px;

  border: none;
  padding: 0;

  background-color: white;
  color: #418bf9;
}

.icon-wrapper:hover {
  background-color: #76aaf8;
}

.icon-wrapper.selected {
  background-color: #89b7fc;
  color: white;
}

.icon-wrapper:focus {
  outline: 0;
  background-color: #76aaf8;
}

.heading {
  margin: 0 auto;
  width: 85%;
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>
