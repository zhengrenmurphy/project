<template>
  <div class="user-container">
    <div class="user-content">
      <div v-if = "user.name" >

        <router-link :to="`/${user.name}`">
          {{ user.name }} <br>
        </router-link>
      </div>
      <div v-else>
          <p style="text-align: center;">{{user}}</p>
        </div>
    </div>
  </div>
</template>


<script>

  export default {
    name: "userItem",
    components: {
    },
    props: {
      user: Object,

    },
    data () {
        return {
          isSignedIn: false,
          
        }
      },
    created: function() {
    let authenticated = this.$cookie.get('fritter-auth');
    if (authenticated) {
      this.isSignedIn = true;
    }
  },
    

    computed : {
      
      
    },

    methods : {


      goToProfile: function (selected) {
          // when the hash prop changes, this function will be fired.
          let signedUsername = this.$cookie.get('fritter-auth');
          if (selected === signedUsername && selected){
            this.$router.push(`/profile`);
            

          } else if (this.selected !== signedUsername && selected){
            this.$router.push(`/${selected}`);
          }
           
        }

    },




  }

</script>
