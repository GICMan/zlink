<template>
  <div class="list-container">
    <Loader v-if="loadingLinks" />
    <draggable v-bind="dragOptions" v-model="links" @update="moveLinks">
      <transition-group type="transition">
        <Link
          v-for="link in links"
          :key="link.uid"
          :selectedDevice="selectedDevice"
          :linkData="link"
          v-on="$listeners"
        />
      </transition-group>
    </draggable>
    <button @click="$emit('add-link')" class="add-link-button">Add link</button>
  </div>
</template>

<script>
import Link from "./Link.vue";
import draggable from "vuedraggable";
import Loader from "./Loader";
import { loadUserLinks, updateOrder } from "../firebase.js";

export default {
  components: {
    Link,
    Loader,
    draggable
  },

  props: ["selectedDevice", "userData"],
  data: function() {
    return {
      links: [],
      loadingLinks: true
    };
  },
  mounted: function() {
    loadUserLinks(this.userData, (snapshot, linkOrder) => {
      var orderedLinks = [];
      snapshot.docs.forEach(link => {
        orderedLinks[linkOrder.indexOf(link.id)] = {
          id: link.data().id,
          alias: link.data().alias,
          uid: link.id,
          password: link.data().password,
          initialData: link.data().initialData
        };
      });
      this.links = orderedLinks;
      this.loadingLinks = false;
    });
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    moveLinks: function() {
      updateOrder(this.links);
    }
  }
};
</script>

<style>
.list-container {
  margin: 0 auto;
  width: 85%;
}

.add-link-button {
  display: block;
  background-color: white;

  height: 40px;
  padding: 0px 20px 0px 20px;
  margin: 10px 0 10px 0;
  width: 100%;

  border-style: solid;
  border-color: #418bf9;
  border-width: 2px;
  border-radius: 40px;

  color: #418bf9;

  text-decoration: none;

  cursor: pointer;
}

.add-link-button:hover {
  border-style: solid;
  background-color: #418bf9;
  color: white;
}

.new-link {
  height: 40px;
  padding: 0px 20px 0px 20px;
  margin: 10px 0 10px 0;

  background-color: #418bf9;

  border-radius: 20px;

  color: white;

  line-height: 40px;
}

.ghost {
  opacity: 0.2;
}
</style>
