<template>
  <div class="list-container">
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
  props: ["selectedDevice", "value"],

  data() {
    return {};
  },
  computed: {
    links: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    moveLinks() {
      updateOrder(this.links);
    }
  }
};
</script>

<style>
.ghost {
  opacity: 0.2;
}
</style>
