<template>
  <div id="user-settings">
    <h1 class="headline">Start Freeting today!</h1>
    <div v-if="isSignedIn" class="form-container">
      <!-- <FritterTitle/> -->
      <SignOut/>

    </div>
    <div v-else class="form-container">
      <SignIn/>
      <SignUp/>
    </div>
    <div v-if='messages.length' class="success-message" style="text-align:center;">
      <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>
  </div>
</template>

<script>
import SignIn from "./SignIn.vue";
import SignOut from "./SignOut.vue";
import SignUp from "./SignUp.vue";
import FritterTitle from "../components/FritterTitle.vue";

import { eventBus } from "../main";

export default {
  name: "UserSettings",

  components: {
    SignIn,
    SignOut,  
    SignUp,
    FritterTitle

  },

  data() {
    return {
      isSignedIn: false,
      messages: []
    };
  },

  created: function() {
    let authenticated = this.$cookie.get('fritter-auth');
    if (authenticated) {
      this.isSignedIn = true;
    }

    eventBus.$on("signin-success", (userName) => {
      this.$cookie.set('fritter-auth', userName);
      this.isSignedIn = true;
      this.messages.push("You have been signed in!");
      this.goToProfile();
      this.clearMessages();
    });
    
    eventBus.$on("signout-success", () => {
      this.$cookie.set('fritter-auth', '');
      this.isSignedIn = false;

      this.messages.push("You have been signed out!");
      this.clearMessages();
      this.goToProfile();
    });

    eventBus.$on("deleteuser-success", () => {
      this.$cookie.set('fritter-auth', '');
      this.isSignedIn = false;
      this.messages.push("Your account has been deleted!");
      this.clearMessages();
      this.goToHomepage();
    });

    eventBus.$on("signup-success", () => {
      this.messages.push("You have been signed up! Sign in to continue.");
      this.clearMessages();
    });
  },

  methods : {

    clearMessages: function() {
          setInterval(() => {
            this.messages = [];
          }, 5000);
        },
      goToProfile: function () {
          this.$router.push(`/profile`);

        },
      goToHomepage: function () {
          this.$router.push(`/`);

        }

    },

};
</script>