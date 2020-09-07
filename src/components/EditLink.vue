<template>
  <form>
    <h1 class="edit-text">Edit Zoom Link</h1>
    <div class="error" v-if="this.error">{{ error }}</div>

    <label for="alias">Meeting Alias</label>
    <input class="text-field" v-model="alias" type="text" name="alias" />

    <label for="link">Meeting Link or ID</label>
    <input class="text-field" v-model="link" type="text" name="link" />
    <Loader v-if="edittingLink" />
    <div v-else>
      <input
        class="edit drop-shadow primary-button"
        @click.prevent="submit"
        value="Edit"
        type="submit"
      />

      <button
        class="cancel drop-shadow secondary-button"
        @click.prevent="$emit('cancel')"
      >
        Cancel
      </button>
      <button
        class="delete drop-shadow secondary-button"
        @click.prevent="removeLink"
      >
        Delete
      </button>
    </div>
  </form>
</template>

<script>
import validate from "../linkValidation.js";
import Loader from "./Loader.vue";
import { updateLink, deleteLink } from "../firebase";

export default {
  data: function() {
    return {
      alias: "",
      link: "",
      error: null,
      edittingLink: false
    };
  },
  components: { Loader },
  props: ["originalAlias", "originalData", "uid"],
  mounted: function() {
    this.alias = this.originalAlias;
    this.link = this.originalData;
  },
  methods: {
    submit() {
      this.error = null;

      validate(this.alias, this.link)
        .then(results => {
          this.edittingLink = true;
          var updatedLink = {
            alias: this.alias,
            password: results.password,
            id: results.id,
            initialData: this.link,
            uid: this.uid
          };
          updateLink(updatedLink, () => {
            this.edittingLink = false;
            this.$emit("edit-success", updatedLink);
          });
        })
        .catch(error => (this.error = error));
    },
    removeLink() {
      this.edittingLink = true;
      deleteLink(this.uid, () => {
        this.edittingLink = false;
        this.$emit("delete-success", this.uid);
      });
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

.edit {
  float: right;
}

.edit,
.cancel {
  width: 100px;
}

.edit-text {
  color: #a82981;
  text-align: center;
}

.delete {
  margin-left: 10px;
  color: red;
  border-color: red;
}
</style>
