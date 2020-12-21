<template>
  <div class="main4">
    <div v-if='success' class="success-message">
        {{ success }}
      </div>
      <div v-if='error' class="error-message">
        {{ error }}
      </div>

  <div class="subcontainer-large">
    <div class="header secondary-header">
      Freets
    </div>
    <div>
      
      <div class="freets-container">  
        <div v-if="freets.length">
          <Freet
          v-for="freet in freets"
          v-bind:key="freet.id"
          v-bind:freet="freet"
        />
       
        </div>

        
        <div v-else>
          <p style="text-align: center;">There are no freets to display.</p><br>
          <router-link :to="`/createnew`">
          <div class="single-center">Create one today</div>
          </router-link>
          
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import Freet from "./Freet";


import { eventBus } from "../main";

export default {
  name: "FreetList",

  components: { Freet },

  props: {
      user : Object,
      isSignedIn:Boolean,
    },

  data() {
    return {
      error: "",
      success: "",
      freets: [],
    };
  },

  created: function() {
    // PROBLEM HERE!
    eventBus.$on("create-freet-success", res => {
      this.freets.push(res.data);
      this.loadFreets();
    });

    eventBus.$on("create-refreet-success", res => {
      this.freets.push(res.data);
      this.loadFreets();
    });

    eventBus.$on("update-freet-success", res => {
      this.success = `Freet ${res.data.freetName} updated!`;
      this.clearMessages();
      this.loadFreets();
    });

    eventBus.$on("delete-freet-success", res => {
      this.success = `Freet name ${res.freetName} has been deleted`;
      this.clearMessages();
      this.loadFreets();
    });

    eventBus.$on("update-freet-error", res => {
      this.error = `Error updating freet ${res.data.freetName}`;
      this.clearMessages();
      this.loadFreets();
    });

    eventBus.$on("delete-freet-error", res => {
      this.error = `Error deleting freet ${res.freetName}`;
      this.clearMessages();
      this.loadFreets();
    });
  },

  mounted: function() {
    this.loadFreets();
  },

  methods: {
    loadFreets: function() {
      const body = { fid : this.$cookie.get('fritter-auth')};

      axios
      .get(`/api/freets?author=${body.fid}`, body).then(response => {
        this.freets = response.data;
        this.freets.reverse();
      }).catch(() => {
        this.error = "An unexpected error occured. Please sign in again.";
        this.clearMessages();
        eventBus.$emit("trigger-signout", true);
      })
    },

    clearMessages: function() {
      setInterval(() => {
        this.success = "";
        this.error = "";
      }, 5000);
    }
  }
};
</script>

