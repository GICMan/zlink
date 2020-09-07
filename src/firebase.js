import firebase from "firebase/app";
import "firebase/auth";
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
const loadLinks = (userData, updateLinks) => {
  userRef = db.collection("users").doc(userData.uid);
  userRef.get().then(userDoc => {
    if (!userDoc.exists) {
      userRef.set({ name: userData.displayName, linkOrder: [] });
    }

    userRef
      .collection("links")
      .get()
      .then(linkDocs => {
        var orderedLinks = [];
        linkDocs.forEach(link => {
          //Find the link inside the order array by using it's id
          //Then, set the corresponding orderLinks index to the value of the link
          orderedLinks[userDoc.data().linkOrder.indexOf(link.id)] = {
            id: link.data().id,
            alias: link.data().alias,
            uid: link.id,
            password: link.data().password,
            initialData: link.data().initialData
          };
        });

        updateLinks(orderedLinks);
      })
      .catch(error => console.error("Could not get document: " + error));
  });
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
    .then(linkRef => {
      userRef
        .get()
        .then(userDoc => {
          var newLinkOrder = userDoc.data().linkOrder;
          newLinkOrder.push(linkRef.id);
          return userRef.set({ linkOrder: newLinkOrder });
        })
        .then(() => {
          return linkRef.get();
        })
        .then(linkDoc => {
          callback(linkDoc);
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

const deleteLink = (uid, callback) => {
  userRef
    .collection("links")
    .doc(uid)
    .delete()
    .then(() => {
      return userRef.get();
    })
    .then(userDoc => {
      var newLinkOrder = userDoc.data().linkOrder;
      newLinkOrder.splice(newLinkOrder.indexOf(uid), 1);
      return userRef.set({ linkOrder: newLinkOrder });
    })
    .then(callback)
    .catch(console.error);
};

export {
  auth,
  db,
  provider,
  loadLinks,
  addLink,
  updateLink,
  deleteLink,
  updateOrder
};
