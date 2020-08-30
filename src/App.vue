<template>
  <div id="app">
    <Profile v-bind:profileImage="user.data.photoURL" v-if="user.loggedIn" />
    <div class="main-container drop-shadow">
      <h1 class="container-title">My Zoom Links</h1>
      <LinkList
        v-if="user.loggedIn && !addingLink"
        v-bind:links="links"
        v-on:add-link="addingLink = true"
      />
      <Login v-if="!user.loggedIn" />
      <AddLink v-if="addingLink" />
    </div>
  </div>
</template>

<script>
import Profile from "./components/Profile.vue";
import LinkList from "./components/LinkList.vue";
import Login from "./components/Login.vue";
import AddLink from "./components/AddLink.vue";
import "./assets/main.css";
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "App",
  components: {
    Profile,
    LinkList,
    Login,
    AddLink
  },
  data() {
    return {
      user: {
        loggedIn: false,
        data: {}
      },
      linkDocs: [],
      docRef: {},
      addingLink: false
    };
  },
  mounted: function() {
    const firebaseConfig = {
      apiKey: "AIzaSyDls0ovLVZ0wVuu2nVj9qdCst8lV-LiGL0",
      authDomain: "zlink-33007.firebaseapp.com",
      databaseURL: "https://zlink-33007.firebaseio.com",
      projectId: "zlink-33007",
      storageBucket: "zlink-33007.appspot.com",
      messagingSenderId: "642825966723",
      appId: "1:642825966723:web:1fad6af361ed10398237b6",
      measurementId: "G-W09WJ349BY"
    };

    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
        const usersRef = firebase.firestore().collection("users");
        this.docRef = usersRef.doc(this.user.data.uid);
        this.docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              this.docRef.collection("links").onSnapshot(snapshot => {
                this.linkDocs = snapshot.docs;
              });
            } else {
              this.docRef.set({ name: this.user.data.displayName });
            }
          })
          .catch(error => {
            console.error("Could not get document: " + error);
          });
      } else {
        this.user.loggedIn = false;
        this.user.data = {};
      }
    });
  },
  methods: {
    addLink: function() {
      this.docRef
        .collection("links")
        .doc()
        .set({
          id: 420696969,
          name: "haha funny name"
        });
    }
  },
  computed: {
    links: function() {
      return this.linkDocs.map(link => {
        return {
          meetingId: link.data().id,
          name: link.data().name,
          uid: link.id
        };
      });
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
  text-align: center;
  color: #418bf9;
}
</style>
