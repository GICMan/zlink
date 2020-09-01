<template>
  <div class="link-container drop-shadow">
    <a v-bind:href="link">
      <span class="link-name">
        <i class="fas fa-video"></i>
        {{ alias }}
      </span>

      <span class="link-text">
        <i class="fas fa-link"></i>
        {{ id }}
      </span>
    </a>

    <button
      @click="$emit('edit-link', { alias, initialData, uid })"
      class="edit-link"
    >
      <i class="fas fa-pen"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: ["alias", "id", "password", "selectedDevice", "uid", "initialData"],
  computed: {
    link: function() {
      if (this.selectedDevice === 2) {
        if (!this.password) {
          return `https://zoom.us/j/${this.id}`;
        } else {
          return `https://zoom.us/j/${this.id}?pwd=${this.password}`;
        }
      }

      const suffix = this.selectedDevice === 0 ? "mtg" : "us";
      if (!this.password) {
        return `zoom${suffix}://zoom.us/join?confno=${this.id}`;
      } else {
        return `zoom${suffix}://zoom.us/join?confno=${this.id}&pwd=${this.password}`;
      }
    }
  }
};
</script>

<style>
.link-container {
  min-height: 40px;
  background-color: #418bf9;
  border-radius: 20px;
  padding-left: 15px;
  padding-right: 15px;

  margin-top: 8px;
  margin-bottom: 8px;

  display: flex;
  align-items: center;
}

.link-container:hover {
  background-color: #296aca;
}

a {
  color: white;
  text-decoration: none;
  width: 70%;
  display: inline-block;
  flex-grow: 1;
  line-height: 40px;
}

.fas {
  margin: 0px 5px 0px 5px;
}

.link-name {
  margin-right: 20px;
}

.edit-link {
  color: white;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.edit-link:hover {
  color: #90bcff;
}

.edit-link:focus {
  color: #90bcff;
  outline: 0;
}

.link-text {
  float: right;
}
</style>
