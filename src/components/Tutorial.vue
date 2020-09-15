<template>
  <div class="tutorial-container">
    <h1 class="header-text">Zlink Tutorial</h1>
    <div class="image-wrapper  drop-shadow">
      <button class="cancel" @click="$emit('done')">
        <i class="fas fa-times"></i>
      </button>
      <img class="tutorial-image" :src="imageSource" @click="next" />
    </div>

    <div class="button-container" v-if="this.slide == 5">
      <button class="secondary-button back" @click="slide = 0">
        Hmm show me again
      </button>
      <button class="primary-button done" @click="$emit('done')">
        Ok, I got it!
      </button>
    </div>

    <div class="controls">
      <button class="arrow" @click="prevous">
        <i class="fas fa-angle-left"></i>
      </button>
      <span
        class="dot"
        :class="{ selected: slide == 0 }"
        @click="slide = 0"
      ></span>
      <span
        class="dot"
        :class="{ selected: slide == 1 }"
        @click="slide = 1"
      ></span>
      <span
        class="dot"
        :class="{ selected: slide == 2 }"
        @click="slide = 2"
      ></span>
      <span
        class="dot"
        :class="{ selected: slide == 3 }"
        @click="slide = 3"
      ></span>
      <span
        class="dot"
        :class="{ selected: slide == 4 }"
        @click="slide = 4"
      ></span>
      <span
        class="dot"
        :class="{ selected: slide == 5 }"
        @click="slide = 5"
      ></span>
      <button class="arrow" @click="next">
        <i class="fas fa-angle-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0
    };
  },
  computed: {
    imageSource() {
      return require(`../assets/tutorials/Tips Graphcis-0${this.slide +
        1}.svg`);
    }
  },
  methods: {
    next() {
      if (this.slide < 5) {
        this.slide++;
      }
    },
    prevous() {
      if (this.slide > 0) {
        this.slide--;
      }
    }
  }
};
</script>

<style>
.tutorial-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-items: center;
  width: 100%;
  left: 0;
  position: absolute;
}

.image-wrapper {
  margin: 0 20px;
  max-width: 800px;
  border-radius: 15px;
  position: relative;
}

.tutorial-image {
  width: 100%;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dot {
  height: 10px;
  width: 10px;
  display: inline-block;
  margin: 0 6px;
  border-radius: 50%;
  background-color: #d6d3d3;
  top: 50%;
  cursor: pointer;
}

.dot:hover {
  background-color: #b5b8ff;
}

.arrow {
  background: none;
  border: none;
  color: #418bf9;
  font-size: 2em;
  cursor: pointer;
}

.arrow:hover {
  color: #b5b8ff;
}

.selected {
  background: #418bf9;
}

.cancel {
  background: none;
  border: none;
  font-size: 1.7em;
  color: #418bf9;
  cursor: pointer;
  left: 30px;
  top: 30px;
  position: absolute;
}

.cancel:hover {
  color: #b5b8ff;
}

.back,
.done {
  margin: 15px 5px;
}

.button-container {
  text-align: center;
}

.tutorial-container > .header-text {
  margin: 20px 0;
}
</style>
