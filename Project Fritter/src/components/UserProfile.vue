<template>
  <div class = "main4" id="user-profile">
    <div v-if='error' class="error-message">
        {{ error }}
      </div>
      <div v-if='messages.length' class="success-message" style="text-align:center;">
      <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>

    <div v-if="isSignedIn" >
      <div class="small-headline-container">
        <!-- Signed in as <i>{{this.$cookie.get('fritter-auth')}} </i> -->
        <div style="text-align: center; margin:10px"> Signed in as <i>{{this.$cookie.get('fritter-auth')}} </i></div>
        <SignOut/>
        <b-navbar-item class = "aaa"  tag="router-link" :to="{ path: '/myfreets' }">
                <div class = "aaa2">Click here to see my freets </div>
        </b-navbar-item>
              
              
      </div>
      
      <div class="form-container">
      <div style="text-align: center; margin:20px; color: black; font-size:2em "> Account settings</div>

      <div class="four wide column">
        <img class="ui tiny avatar image" src="../../imgs/2.png" width=200px height=auto>
      </div>
      <ChangeUserCredentials/>
      <div class = "danger">
      Danger zone<br>Warning: This action is not recoverable
      <DeleteAccount/>
      </div>
      
      </div>
      
      

      <div class="follows-container" >

        <div v-if="following.length" >
          <UserList 
          v-bind:users="following"
          v-bind:title="'Following'"/>
        </div>

        <div v-if="followers.length" >
          <UserList 
          v-bind:users="followers"
          v-bind:title="'Followers'"/>
        </div>
      </div>

      <!-- <div class="form-container">
        <AuthorFreetList/>
      </div> -->

    </div>
    <div v-else class="form-container2">
          <template >
            <b-navbar-item tag="router-link" :to="{ path: '/account' }">
                    <a class="button is-light">
                        <strong>Please sign in or sign up</strong>
                    </a>

          </b-navbar-item>
                        <img class="ui tiny avatar image" src="https://cdn.shopify.com/s/files/1/0153/0623/products/Palm_Springs_Wallpaper_in_Green_and_Pink_from_the_Palm_Springs_Collection_by_Mind_the_Gap-1_1024x1024.jpg?v=1571712906" >

        </template>
      

    </div>
    

  </div>
</template>

<script>
import ChangeUserCredentials from "./ChangeUserCredentials.vue";
import AuthorFreetList from "../components/AuthorFreetList.vue";
import SignOut from "./SignOut.vue";
import DeleteAccount from "./DeleteAccount.vue";
import UserList from "./UserList";

import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "UserProfile",

  components: {
    ChangeUserCredentials,
    AuthorFreetList, 
    SignOut,
    DeleteAccount,
    UserList

  },

  data() {
    return {
      isSignedIn: false,
      messages: [],
      error : "",
      followers: [],
      following: []
    };
  },

  created: function() {
    let authenticated = this.$cookie.get('fritter-auth');
    if (authenticated) {
      this.isSignedIn = true;
      this.getFollowing();
      this.getFollowers();
    }



    eventBus.$on("change-username-success", () => {
      this.$cookie.set('fritter-auth', '');
      this.isSignedIn = false;
      this.messages.push(`Your username was successfully changed! Please sign in again.`);
      this.clearMessages();

    });

    eventBus.$on("change-password-success", () => {
      this.$cookie.set('fritter-auth', '');
      this.isSignedIn = false;
      this.messages.push(`Your password was successfully changed! Please sign in again.`);
      this.clearMessages();

    });

    eventBus.$on("signout-success", () => {
      this.$cookie.set('fritter-auth', '');
      this.isSignedIn = false;
      // this.messages.push("You have been signed out!");
      // this.clearMessages();
    });

    eventBus.$on("reload_followers", () => {
        this.getFollowers();

    });

    eventBus.$on("reload_following", () => {
        this.getFollowing();

    });
  },

  methods: {

    getFollowing: function() {
        const bodyContent = {};
        axios
          .get("/api/follows/following", bodyContent)
          .then((res) => {
            this.following = res.data.following.map(u => u);//.followedID);
        }).catch(() => {
          
        })},

    getFollowers: function() {
      const bodyContent = {};
      axios
        .get("/api/follows/followers", bodyContent)
        .then((res) => {
          this.followers = res.data.followers.map(u => u);//.followerID);
        }).catch(() => {
          this.error = "An unexpected error occured. Please sign in again.";
          this.clearMessages();
          eventBus.$emit("trigger-signout", true);
        })
      },

    clearMessages: function() {
      setInterval(() => {
        this.messages = [];
      }, 5000);
    },

  },

  beforeDestroy() {
    eventBus.$off('reload_following');
    eventBus.$off('reload_followers');
   },
};
</script>