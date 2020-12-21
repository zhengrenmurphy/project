<template>
  <div class="navbar-container">
    <div class="navbar-subcontainer-left">
      <router-link to="/">
        <img class= "nav-icon" src="../../public/logo.png" />
        <button class="button3">KOSH</button>
      </router-link>
      <div class="navbar-subcontainer-right">
        <!-- make the section colorful if it is on this router -->

        <div v-if="business">
          <router-link to="/business/reservations">
            <button
              class="button1"
              v-if="currentRoute === 'ResBusiness'"
              style="color: #93b1ff"
            >
              Reservations
            </button>
            <button class="button1" v-else>Reservations</button>
          </router-link>
        </div>
        <div v-if="client">
          <router-link to="/client/reservations">
            <button
              class="button1"
              v-if="currentRoute === 'ResClient'"
              style="color: #93b1ff"
            >
              Reservations
            </button>
            <button class="button1" v-else>Reservations</button>
          </router-link>
        </div>
        <div v-if="business">
          <router-link to="/business/account">
            <button
              class="button1"
              v-if="currentRoute === 'business-account'"
              style="color: #93b1ff"
            >
              My Account
            </button>
            <button class="button1" v-else>My Account</button>
          </router-link>
        </div>

        <div v-if="client">
          <router-link to="/client/account">
            <button
              class="button1"
              v-if="currentRoute === 'client-account'"
              style="color: #93b1ff"
            >
              My Account
            </button>
            <button class="button1" v-else>My Account</button>
          </router-link>
        </div>
        <div v-if="client">
          <button class="button-signout" v-on:click="signOutClient">
            Sign Out
          </button>
        </div>
        <div v-else-if="business">
          <button class="button-signout" v-on:click="signOutBusiness">
            Sign Out
          </button>
        </div>
        <div v-else>
          <router-link to="/login">
            <button class="button2">Log In/Sign Up</button>
          </router-link>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NavBar",
  data() {
    return {
      currentRoute: this.$route.name.toString(),
      userName: this.$cookie.get("kosh-auth"),
      client: this.$cookie.get("kosh-client"),
      business: this.$cookie.get("kosh-business"),
    };
  },
  methods: {
    signOutClient: function () {
      axios.post("/api/clients/signout", {}).then(() => {
        // handle success
        this.$cookie.set("kosh-auth", "");
        this.$cookie.set("kosh-client", "");
        this.$cookie.set("kosh-business", "");
        this.$router.push("/login");
      });
    },
    signOutBusiness: function () {
      axios.post("/api/business/signout", {}).then(() => {
        // handle success
        this.$cookie.set("kosh-auth", "");
        this.$cookie.set("kosh-client", "");
        this.$cookie.set("kosh-business", "");
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
h1 {
  color: #93b1ff;
  margin-top: 0px;
  margin-bottom: 0px;
}

hr {
  border: 1px solid #93b1ff;
}
</style>