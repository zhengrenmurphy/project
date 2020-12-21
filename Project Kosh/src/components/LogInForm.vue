<template>
  <div class="log-in-form-container">
    <h1>Log In</h1>
    <input v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button class="submit-login" v-on:click="logIn">Submit</button>
    <div class="sign-up-button-container">
      <p>Don't have an account?</p>
      <router-link to="/signup">
        <p>Sign up here</p>
      </router-link>
    </div>
    <div class="error-message">
      {{ error }}
    </div>
    <div class="success-message">
      {{ success }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LogInForm",
  data() {
    return {
      username: "",
      password: "",
      error: this.$cookie.get("error-log-in"),
      success: "",
    };
  },
  methods: {
    logIn: function () {
      if (this.username === "" || this.password === "") {
        this.error = "You must enter a password and username.";
        this.resetForm();
        this.clearMessages();
      } else {
        const bodyContent = { password: this.password };
        axios
        .post(`/api/clients/signin/${this.username}`, bodyContent)
        .then((res) => {
          // handle success
          this.$cookie.set("kosh-auth", this.username);
          if (res.data.isBusiness) {
            axios
            .get(`/api/business/name/${this.username}`)
            .then((res) => {
              const busiName = res.data.businessName;
              this.$cookie.set("kosh-business", busiName);
              this.$cookie.set("kosh-client", "");
              this.error = ""
              this.success = res.data.message;
            })
          } else {
            this.$cookie.set("kosh-client", this.username);
            this.$cookie.set("kosh-business", "");
            this.error = ""
            this.success = res.data.message;
          }
        })
        .catch((err) => {
          // handle error
          this.error = err.response.data.error;
        })
        .then(() => {
          // always executed
          this.resetForm();
          this.clearMessages();
        });
      }
    },
    resetForm: function () {
      this.$cookie.set("error-log-in", "")
      this.username = "";
      this.password = "";
    },
    clearMessages: function () {
      setTimeout(() => {
        this.error = "";
        if (this.success != "") {
          this.$router.push("/");
          this.success = "";
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
h1 {
  color: #f5c19e;
}
p {
  margin-right: 10px;
}
input {
  border: 1px solid black;
  width: 150px;
  height: 20px;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>