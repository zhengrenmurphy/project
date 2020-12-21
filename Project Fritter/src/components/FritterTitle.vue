<template>
  <div>
    
    <div v-if="isSignedIn" class="main">
      <CreateFreetForm/>
      <FreetList/>
    </div>
    <div v-else class="main">
      <FreetList/>
    </div>  
  </div>
</template>

<script>

import CreateFreetForm from "../components/CreateFreetForm.vue";
import FreetList from "../components/FreetList.vue";

export default {
  name: "main",
  components: {
    CreateFreetForm,
    FreetList,
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
  },
};
</script>