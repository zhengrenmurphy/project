<template>
  <div>

   <OtherUserProfileHeader
      :user="user"
    />

    <div class="left-col-container">

      <div class="eight wide column">
        <div class="ui segment">

      </div>

      </div>

    </div>
    <div v-if='messages.length' class="success-message" style="text-align:center;">
      <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

import OtherUserProfileHeader from './OtherUserProfileHeader'


  export default {
    name: 'OtherUserProfile',
    components: {
      OtherUserProfileHeader,

    },
    data () {
      return {
        user: {},
        messages: []

      }
    },

    computed: {

    },
    created () {
      this.fetchUser();

      eventBus.$on("follow-success", (username) => {
      this.messages.push(`You have successfuly followed user ${username}!`);
      this.clearMessages();
    });

      eventBus.$on("unfollow-success", (username) => {
      this.messages.push(`You have successfuly unfollowed user ${username}!`);
      this.clearMessages();
    });




    },

    watch: {
      // call again the method if the route changes
    '$route': 'fetchUser'
    },
    methods: {
      fetchUser () {
        let username = this.$route.params.username;
        axios.get(`/api/users/${username}`).then(response => {
          this.user = response.data.user;
        })
      },

      clearMessages: function() {
      setInterval(() => {
        this.messages = [];
      }, 5000);
      
      },
      
    }
  }
</script>