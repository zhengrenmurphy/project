<!-- color scheme: https://colorhunt.co/palette/220192
 --><template>
  <div id="app">
    <Navbar/>

    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "app",
  beforeCreate: function() {
    let authenticated = this.$cookie.get('fritter-auth');
    if (!authenticated) {
      this.$router.push("account");
    }
  },
  components: {
    Navbar,
  }
};


</script>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #dbf6e9;
}

.success-message {
  color: green;
  margin: auto;
}

.error-message {
  color: red;
  margin: auto;
}
</style>