<template>
  <div class="freet-container2">
    <div class="ui grid container">
      <div class="four wide column">
        <img class="ui tiny avatar image" src="../../../imgs/2.png" width=200px height=auto>
        <div class="user-info">
          <p> <b>Username:</b> {{user.name}}</p>
          <p> <b>User Id: </b>{{user.id}} </p>
        </div>
      </div>
        <div v-if="isSignedIn" class="ui right floated horizontal list" >
          <button class="ui tiny primary button" v-if="isFollowing(user.id)" @click="unFollow(user.id)">Unfollow</button>
          <button class="ui tiny primary button" v-else @click="follow(user.id)">Follow</button>
        </div>
</div>
  <div v-if='errors.length' class="error-message" style="width: 250px;">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

  export default {
    name: 'OtherUserProfileHeader',
    data() {
        return {
          errors: [],
          following : [],
          isSignedIn : false,
        }
    },

    props: {
      user: {
        type: Object,
        required: true
      }
    },
    created: function() {
      this.getFollowing();
      let authenticated = this.$cookie.get('fritter-auth');
      if (authenticated) {
        this.isSignedIn = true;
      }

    },
    methods: {
      getUserId (username) {
        axios.get(`/api/users/${username}`).then(response => {
          this.user_id = response.data.user.id;
        })

      },


      follow (userId){
        const bodyContent = { name: userId};
        axios
          .post("/api/follows/", bodyContent)
          .then(() => {
            // handle success
            this.following.push(userId);
            eventBus.$emit('follow-success', userId);
            eventBus.$emit('reload_followers', true);
            eventBus.$emit('reload_following', true);

          })
      },

      isFollowing (userId) {
        
        for (const followId of this.following) {

          if (userId === followId) {
            return true
          }
        }

        return false
      },

      getFollowing () {
        const bodyContent = {};
        axios
          .get("/api/follows/following", bodyContent)
          .then((res) => {
            this.following = res.data.following.map(u => u.id);
          });
          
      },
      unFollow (userId){
        const bodyContent = { name: userId};
        axios
          .put("/api/follows/", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('unfollow-success', userId);
            var index = this.following.indexOf(userId);
            if (index !== -1) {
              this.following.splice(index, 1);
            }
            eventBus.$emit('reload_followers', true);
            eventBus.$emit('reload_following', true);

          })
      },


    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    }
    }
  }

</script>