<template>
    <div class='main3'>
    <OtherUserProfile/>
    <div class="freets-container">  
        <div v-if="freets.length">
          <Freet
          v-for="freet in freets"
          v-bind:key="freet.freetID"
          v-bind:freet="freet"
          v-bind:isAuth1="true"
        />
        </div>
        <div v-else>
          <p style="text-align: center;">There are no freets to display.</p>
        </div>
      </div>
  </div>
</template>

<script>

import OtherUserProfile from "../components/OtherUser/OtherUserProfile.vue";
import FreetList from "../components/FreetList.vue";
import Freet from "../components/Freet";
import axios from "axios";
import { eventBus } from "../main";


export default {
  name: "OtherProfile",
  components: {
    OtherUserProfile,
    FreetList,
    Freet,
  },
  data() {
    return {
      freets: [],
      authName: this.$route.params.username,
    };
  },

  created: function(){
    eventBus.$on("reload-author-freets",() => {
      
      this.loadAuthorFreets();

      });
  },

  mounted: function() {
    this.loadAuthorFreets();
  },

  methods: {
    loadAuthorFreets: function() {
      const body = { author : this.$route.params.username};
      axios
      .get(`/api/freets?author=${body.author}`).then(response => {
        this.freets = response.data;
      })
    },

    
  }

};
</script>
