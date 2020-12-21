<template>
  <div class="edit-client-form-container">
    <div class="edit-client-form-subcontainer">
      <input class="name" v-model="firstName" placeholder="First Name" />
      <button class="submit-edit" v-on:click="editFirstName">Submit</button>
    </div>
    <div class="edit-client-form-subcontainer">
      <input class="name" v-model="lastName" placeholder="Last Name" />
      <button class="submit-edit" v-on:click="editLastName">Submit</button>
    </div>
    <div class="edit-client-form-subcontainer">
      <input v-model="username" placeholder="Username" />
      <button class="submit-edit" v-on:click="editUsername">Submit</button>
    </div>
    <div class="edit-client-form-subcontainer">
      <input v-model="password" placeholder="Password" />
      <button class="submit-edit" v-on:click="editPassword">Submit</button>
    </div>
    <div class="edit-client-form-subcontainer">
      <input v-model="email" placeholder="Email" />
      <button class="submit-edit" v-on:click="editEmail">Submit</button>
    </div>
    <button class="cancel" v-on:click="deleteAccount">Delete Account</button>
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
  name: "edit-client-form",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      error: "",
      success: "",
      route: false
    };
  },
  methods: {

    editFirstName: function () {
      if (this.firstName === "") {
        this.error = "Please enter a name";
        this.resetForm();
        this.clearMessages();
      } else {
        axios
          .put(`/api/clients/firstname/${this.firstName}`, {})
          .then((res) => {
            // handle success
            this.success = res.data.message;
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
    editLastName: function () {
      if (this.lastName === "") {
        this.error = "Please enter a last name";
        this.resetForm();
        this.clearMessages();
      } else {
        axios
          .put(`/api/clients/lastname/${this.lastName}`, {})
          .then((res) => {
            // handle success
            this.success = res.data.message;
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
    editUsername: function () {
      if (this.username === "") {
        this.error = "Please enter a username";
        this.resetForm();
        this.clearMessages();
      } else {
        axios
          .put(`/api/clients/username/${this.username}`, {})
          .then((res) => {
            // handle success
            this.success = res.data.message;
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
    editPassword: function () {
      if (this.password === "") {
        this.error = "Please enter a password";
        this.resetForm();
        this.clearMessages();
      } else {
        axios
          .put(`/api/clients/password/`, { password: this.password })
          .then((res) => {
            // handle success
            this.success = res.data.message;
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
    editEmail: function () {
      if (this.email === "") {
        this.error = "Please enter an email";
        this.resetForm();
        this.clearMessages();
      } else {
        axios
          .put(`/api/clients/email/`, { email: this.email })
          .then((res) => {
            // handle success
            this.success = res.data.message;
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
    deleteAccount: function(){
      axios
      .delete(`/api/clients/`, {})
      .then((res)=>{
        this.sucess = res.data.message;
        this.route = true;
      })
      .catch((err) => {
        this.error = err.response.data.error;
      })
      .then(()=>{
        this.resetForm();
        this.clearMessages();
      })
    },
    resetForm: function () {
      this.username = "";
      this.password = "";
      this.firstName = "";
      this.email = "";
      this.lastName = "";
    },
    clearMessages: function () {
      setTimeout(() => {
        this.error = "";
        this.success = "";
        if(this.route){
          this.$cookie.set("kosh-auth", "");
          this.$cookie.set("kosh-client", "");
          this.$cookie.set("kosh-business", "");
          this.$router.push("/login");
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>

input {
  border: 1px solid black;
  width: 200px;
  height: 30px;
  border-radius: 4px;
  margin-bottom: 20px;
  margin-right: 20px;
}


</style>