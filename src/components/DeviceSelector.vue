<template>
  <div class="selector-container">
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
</template>

<script>
export default {
  data() {
    return {
      selectedDevice: 0
    };
  },
  mounted() {
    if (
      navigator.userAgent.indexOf("iPhone") != -1 ||
      navigator.userAgent.indexOf("Android") != -1
    ) {
      this.selectDevice(1);
    } else if (
      navigator.userAgent.indexOf("Win") != -1 ||
      navigator.userAgent.indexOf("Mac") != -1
    ) {
      this.selectDevice(0);
    } else {
      this.selectDevice(2);
    }
  },
  methods: {
    selectDevice(device) {
      this.$emit("select-device", device);
      this.selectedDevice = device;
    }
  }
};
</script>

<style>
.selector-container {
  color: #418bf9;
  padding: 2px 5px 2px 5px;
  border-style: solid;
  border-color: #418bf9;
  border-width: 3px;
  border-radius: 30px;
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
  background-color: #f2f2f2;
}

.icon-wrapper.selected {
  background-color: #418bf9;
  color: white;
}
</style>
