<template>
  <form>
    <div class="error" v-if="this.error">{{ error }}</div>

    <label for="alias">Meeting Alias</label>
    <input v-model="alias" type="text" name="alias" />

    <label for="link">Meeting Link or ID</label>
    <input v-model="link" type="text" name="link" />

    <input class="add drop-shadow" @click.prevent="addLink" value="Add" type="submit" />
    <button class="cancel drop-shadow" @click.prevent="$emit('cancel-add')">Cancel</button>
  </form>
</template>
<script>
import { string } from "yup";

export default {
  data: function() {
    return {
      alias: "",
      link: "",
      error: null
    };
  },
  methods: {
    addLink: function() {
      this.error = null;

      const aliasSchema = string().required("Please enter a meeting alias");
      const linkSchema = string()
        .required("Please enter a link or id")
        .url("Please enter a valid url or meeting id")
        .matches(/.zoom.us\/j\//g, "Please enter a valid zoom link or id");
      const idSchema = string()
        .required("Please enter a meeting link or id")
        .min(9, "ID must be between 9 and 11 digits")
        .max(11, "ID must be between 9 and 11 digits");

      aliasSchema
        .validate(this.alias)
        .then(() => {
          if (isNaN(this.link)) {
            linkSchema
              .validate(this.link)
              .then(() => {
                const splitLink = this.link.split(/\?pwd=|j\//);
                const id = splitLink[1];
                const password = splitLink[2];
                idSchema
                  .validate(id)
                  .then(() => {
                    this.$emit("add-link", {
                      alias: this.alias,
                      password,
                      id
                    });
                  })
                  .catch(() => {
                    this.error = "Link is not a valid zoom link";
                  });
              })
              .catch(error => {
                this.error = error.message;
              });
          } else {
            idSchema
              .validate(this.link)
              .then(() => {
                this.$emit("add-link", {
                  alias: this.alias,
                  id: this.link,
                  link: ""
                });
              })
              .catch(error => {
                this.error = error.message;
              });
          }
        })
        .catch(error => {
          this.error = error.message;
        });
    }
  }
};
</script>

<style scoped>
input[type="text"] {
  display: block;
  margin-bottom: 20px;
  width: 100%;
  height: 40px;
  font-size: 18px;
  font-family: "Roboto Slab", serif;
  padding-left: 15px;
  padding-right: 15px;

  border: none;
  border-bottom: #418bf9 4px solid;
  border-radius: 8px 8px 0 0;
  box-sizing: border-box;

  background-color: #ececec;

  color: #418bf9;
}

input:focus {
  outline: 0;
  border-style: solid;
  border-color: #839ec7;
  border-width: 2px;
  border-bottom: #418bf9 4px solid;
}

label {
  display: block;
  margin-bottom: 4px;
  color: #9093f3;
}
form {
  padding: 0px 60px 0px 60px;
}

button,
.add {
  height: 40px;
  width: 80px;
  border-radius: 20px;
  font-family: "Roboto Slab", serif;
  font-size: 16px;
  cursor: pointer;
}

.add {
  float: right;
  border: none;
  background-color: #418bf9;
  color: white;
}

.cancel {
  border: #418bf9 3px solid;
  background-color: white;
  color: #418bf9;
}

.error {
  width: 100%;
  background-color: #ececec;
  color: #418bf9;
  height: 40px;
  border-radius: 20px;
  line-height: 40px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  margin-bottom: 15px;
}
</style>