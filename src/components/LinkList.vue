<template>
  <div class="list-container">
    <Link
      v-for="link in links"
      v-bind:key="link.uid"
      v-bind:linkName="link.name"
      v-bind:linkId="link.meetingId"
    />
    <button @click="$emit('add-link')" class="add-link-button">Add link</button>
  </div>
</template>

<script>
import Link from "./Link.vue";

export default {
  components: {
    Link
  },
  props: ["links"]
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

  border-style: dashed;
  border-color: #418bf9;
  border-width: 4px;
  border-radius: 40px;

  color: #418bf9;

  text-decoration: none;

  cursor: pointer;
}

.add-link-button:focus {
  outline: 0;
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
</style>
