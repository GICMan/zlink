import firebase from "firebase/app";
import "firebase/firestore";

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

let userRef = {};

const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

// Create a reference to the signed in user
// and sets up a live connection to the users links
const loadUserLinks = (userData, updateLinks) => {
  userRef = db.collection("users").doc(userData.uid);
  userRef
    .get()
    .then(userDoc => {
      if (!userDoc.exists) {
        // for a document to have a collection, it must have at
        // least 1 property, so a name field is set
        userRef.set({ name: userData.displayName, linkOrder: [] });
      }

      userRef
        .collection("links")
        .onSnapshot(snapshot =>
          updateLinks(snapshot, userDoc.data().linkOrder)
        );
    })
    .catch(error => console.error("Could not get document: " + error));
};

const addLink = ({ id, password, alias, initialData }, callback) => {
  userRef
    .collection("links")
    .add({
      id,
      password: password ? password : "",
      alias,
      initialData
    })
    .then(docRef => {
      userRef.get().then(userDoc => {
        var newLinkOrder = userDoc.data().linkOrder;
        newLinkOrder.push(docRef.id);
        userRef.set({ linkOrder: newLinkOrder }).then(callback);
      });
    })
    .catch(error => console.error("Could not get document: " + error));
};

const updateLink = ({ uid, id, password, alias, initialData }, callback) => {
  userRef
    .collection("links")
    .doc(uid)
    .update({ id, password: password ? password : "", alias, initialData })
    .then(callback)
    .catch(error => console.error("Could not get document: " + error));
};

const updateOrder = links => {
  userRef.set({ linkOrder: links.map(link => link.uid) }).catch(console.log);
};

export { auth, db, provider, loadUserLinks, addLink, updateLink, updateOrder };
