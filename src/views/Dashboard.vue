<template>
  <div class="dashboard-container" v-if="loggedIn">
    <div v-if="view == 'LIST'">
      <div class="dashboard-header">
        <h1 class="header-text">My Zoom Links</h1>
        <DeviceSelector @select-device="selectDevice" class="device-selector" />
      </div>
      <Loader v-if="loadingLinks" />
      <LinkList
        v-else
        v-model="links"
        :selectedDevice="selectedDevice"
        @edit-link="startEdit"
      />
      <button @click="view = 'ADD'" class="add-link secondary-button">
        Add link
      </button>
    </div>
    <AddLink
      v-else-if="view == 'ADD'"
      @add-success="addSuccess"
      @cancel="view = 'LIST'"
    />
    <EditLink
      v-else-if="view == 'EDIT'"
      :originalAlias="selectedLink.alias"
      :originalData="selectedLink.initialData"
      :uid="selectedLink.uid"
      @cancel="view = 'LIST'"
      @edit-success="editSuccess"
      @delete-success="deleteSuccess"
    />
  </div>
</template>

<script>
import LinkList from "../components/LinkList.vue";
import AddLink from "../components/AddLink.vue";
import EditLink from "../components/EditLink.vue";
import Loader from "../components/Loader.vue";
import DeviceSelector from "../components/DeviceSelector.vue";

import { loadLinks } from "../firebase.js";

export default {
  props: ["loggedIn", "userData"],
  components: { LinkList, DeviceSelector, AddLink, EditLink, Loader },
  mounted: function() {
    if (!this.loggedIn) {
      this.$router.push("/Login");
    } else {
      loadLinks(this.userData, links => {
        this.links = links;
        this.loadingLinks = false;
      });
    }
  },
  data() {
    return {
      selectedDevice: 0,
      view: "LIST",
      links: [],
      loadingLinks: true,
      selectedLink: {}
    };
  },
  methods: {
    selectDevice(payload) {
      this.selectedDevice = payload;
    },
    startEdit(payload) {
      this.view = "EDIT";
      this.selectedLink = payload;
    },
    editSuccess(link) {
      var index = this.links.findIndex(element => link.uid == element.uid);
      this.links[index] = link;
      this.view = "LIST";
    },
    deleteSuccess(uid) {
      this.links.splice(
        this.links.findIndex(element => uid == element.uid),
        1
      );
      this.view = "LIST";
    },
    addSuccess(link) {
      this.links.push({ ...link.data(), uid: link.id });
      this.view = "LIST";
    }
  }
};
</script>

<style>
.dashboard-container {
  width: 400px;
  margin: 0 auto;
}

.add-link {
  width: 100%;
}

.device-selector {
  float: right;
}

.dashboard-header {
  margin: 30px 0;
}

.header-text {
  display: inline-block;
  margin: 0;
  color: #a82981;
}
</style>
