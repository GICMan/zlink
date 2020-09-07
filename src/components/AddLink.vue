<template>
  <form>
    <h1 class="add-text">Add Zoom Link</h1>
    <div class="error" v-if="this.error">{{ error }}</div>

    <label for="alias">Meeting Alias</label>
    <input class="text-field" v-model="alias" type="text" name="alias" />

    <label for="link">Meeting Link or ID</label>
    <input class="text-field" v-model="link" type="text" name="link" />
    <Loader v-if="addingLink" />
    <div v-else>
      <input
        class="add drop-shadow primary-button"
        @click.prevent="submit"
        value="Add"
        type="submit"
      />
      <button
        class="cancel drop-shadow secondary-button"
        @click.prevent="$emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
import validate from "../linkValidation.js";
import Loader from "./Loader.vue";
import { addLink } from "../firebase";

export default {
  data: function() {
    return {
      alias: "",
      link: "",
      error: null,
      addingLink: false
    };
  },
  components: { Loader },
  methods: {
    submit: function() {
      this.error = null;

      validate(this.alias, this.link)
        .then(results => {
          this.addingLink = true;
          addLink(
            {
              alias: this.alias,
              password: results.password,
              id: results.id,
              initialData: this.link
            },
            link => {
              this.addingLink = false;
              this.$emit("add-success", link);
            }
          );
        })
        .catch(error => (this.error = error));
    }
  }
};
</script>

<style scoped>
form {
  margin: 50px auto;
}

label {
  margin-bottom: 10px;
  display: block;
  color: #6d72f2;
}

.add {
  float: right;
}

.add,
.cancel {
  width: 100px;
}

.add-text {
  color: #a82981;
  text-align: center;
}
</style>
