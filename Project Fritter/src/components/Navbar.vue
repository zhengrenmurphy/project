 <template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../../imgs/logo_fritter.png"
                    alt="Fritter, the best app ever" 
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item class = "aaa" tag="router-link" :to="{ path: '/freets' }">
                See all Freets
            </b-navbar-item>
            <b-navbar-item class = "aaa" v-if = "this.$cookie.get('fritter-auth')"  tag="router-link" :to="{ path: '/myfreets' }">
                See my freets
            </b-navbar-item>
            <b-navbar-item class = "aaa" v-if = "this.$cookie.get('fritter-auth')" tag="router-link" :to="{ path: '/createnew' }">
                Create a freet
            </b-navbar-item>
          
            <SearchBar/>


        </template>


        <template slot="end">
          <div v-if="isSignedIn">
           <b-navbar-item tag="router-link" :to="{ path: '/' }">
              <SignOut/>
           </b-navbar-item>
         </div>
          
            <b-navbar-item tag="router-link" :to="{ path: '/profile' }">
               <font-awesome-icon 
                icon="user" 
                size="2x" >
          </font-awesome-icon>

          </b-navbar-item>
        </template>


    </b-navbar>
</template>


<script>

import SearchBar from "./SearchBar.vue";
import SignOut from "../components/SignOut.vue";
import { eventBus } from "../main";


export default {
  name: "main",
  data() {
    return {
      isSignedIn: false,
      messages: [],
      signedUsername : null
    }
  
  },
  components: {
    SearchBar,
    SignOut
  },

  created: function() {
    let authenticated = this.$cookie.get('fritter-auth');
    if (authenticated) {
      this.isSignedIn = true;
    }

    eventBus.$on('signin-success', () => {this.isSignedIn=true});
    eventBus.$on('signout-success', () => {this.isSignedIn=false});
    eventBus.$on('deleteuser-success', () => {this.isSignedIn=false});

  }
}
</script>