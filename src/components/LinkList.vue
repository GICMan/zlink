<template>
  <div class="list-container">
    <draggable v-bind="dragOptions" v-model="orderedLinks" @move="moveLinks">
      <transition-group type="transition">
        <Link
          v-for="link in orderedLinks"
          :key="link.uid"
          :uid="link.uid"
          :initialData="link.initialData"
          :alias="link.alias"
          :id="link.id"
          :password="link.password"
          :selectedDevice="selectedDevice"
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
import { updateOrder } from "../firebase.js";

export default {
  components: {
    Link,
    draggable
  },

  props: ["links", "selectedDevice"],
  computed: {
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: "ghost",
        dragClass: "dragging"
      };
    },
    orderedLinks: {
      get: function() {
        return this.links;
      },
      set: function(val) {
        return val;
      }
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
