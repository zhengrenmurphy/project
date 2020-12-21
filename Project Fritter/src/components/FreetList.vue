<template>
  <div class="subcontainer">
    <div v-if='success' class="success-message">
        {{ success }}
      </div>
      <div v-if='error' class="error-message">
        {{ error }}
      </div>
    <div class="header secondary-header">
      Freets
    </div>
    <div>
      

      <div class="freetainer">  
        <div v-if="freets.length">
          <Freet
          v-for="freet in freets"
          v-bind:key="freet.freetID"
          v-bind:freet="freet"
          v-bind:isAuth1="true"
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
</template>

<script>
import axios from "axios";
// import FreetListItem from "./FreetListItem";
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
      following: []
    };
  },

  created: function() {
    eventBus.$on("create-freet-success", res => {
      this.freets.push(res.data);
      this.loadFreets();
    });

    eventBus.$on("create-refreet-success", res => {
      this.success = `Refreet with ID ${res.data.freetID} has been created`;
      this.freets.push(res.data);
      this.loadFreets();
    });

    eventBus.$on("update-freet-success", res => {
      this.success = `Freet with ID ${res.data.freetID} now updated to ${
        res.data.content
      }`;
      this.clearMessages();
      this.loadFreets();
    });

    eventBus.$on("delete-freet-success", res => {
      this.success = `Freet with ID ${res.freetID} has been deleted`;
      this.clearMessages();
      this.loadFreets();
    });
    eventBus.$on("upvote-success", () => {
      this.success = `Freet has successfully been upvoted`;
      this.clearMessages();
      this.loadFreets();
    });
    eventBus.$on("upvote-error", ()=> {
      this.error = `Error when Freet is upvoted`;
      this.clearMessages();
      this.loadFreets();
    });
    eventBus.$on("onupvote-success", () => {
      this.success = `Freet has been unupvoted`;
      this.clearMessages();
      this.loadFreets();
    });
    eventBus.$on("onupvote-error", () => {
      this.error = `Error when Freet is unupvoted`;
      this.clearMessages();
      this.loadFreets();
    });

    eventBus.$on("update-freet-error", res => {
      this.error = `Error updating freet ${res.data.freetID}`;
      this.clearMessages();
      this.loadFreets();
    });

    eventBus.$on("delete-freet-error", res => {
      this.error = `Error deleting freet ${res.freetName}`;
      this.clearMessages();
      this.loadFreets();
    });

    eventBus.$on("reload_following", () => {
        this.getFollowing();

    });
  },

  mounted: function() {
    this.getFollowing();
    this.loadFreets();
  },

  methods: {
    loadFreets: function() {
      axios
      .get(`/api/freets`).then(response => {
        var unsorted_freets = response.data;
        unsorted_freets.reverse();
        var authenticated = this.$cookie.get('fritter-auth');
        if (authenticated){
         var mapped_following = this.following.map(u => u.id);
          var final = [];
          unsorted_freets.forEach(freet => {
                    if (mapped_following.includes(freet.creatorUserID)){
                        final.unshift(freet); // if following user, push freet to front
                    } else {
                        final.push(freet);
                    }
                })
        this.freets = final;

        }
        else {
          this.freets = unsorted_freets;
        }
        
      })
    },

    getFollowing: function() {
        const bodyContent = {};
        axios
          .get("/api/follows/following", bodyContent)
          .then((res) => {
            this.following = res.data.following.map(u => u);//.followedID);
        }).catch(() => {
          // this.error = "An unexpected error occured. Please sign in again.";
          // this.clearMessages();
          eventBus.$emit("trigger-signout", true);
          
        })},

    clearMessages: function() {
      setInterval(() => {
        this.success = "";
        this.error = "";
      }, 5000);
    }
  }
};
</script>

