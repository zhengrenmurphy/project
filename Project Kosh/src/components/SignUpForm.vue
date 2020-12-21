<template>
  <div class="signup-form">
    <div class="signup-form-top">
      <input
        class="name"
        style="margin-right: 20px; width: 90px;"
        v-model="firstName"
        placeholder="First Name"
      />
      <input class="name" style="width: 90px;" v-model="lastName" placeholder="Last Name" />
    </div>

    <input v-model="username" placeholder="Username" />
    <input v-model="password" placeholder="Password" />
    <input v-model="email" placeholder="Email" />

    <div class="business-input">
      <label for="checkbox"> Signing up as a business? </label>
      <input type="checkbox" id="checkbox" v-model="isBusiness" />
    </div>
    <div v-if="isBusiness">
      <input
        v-model="businessName"
        placeholder="Business Name"
        @input="onChange"
        style="margin-bottom:0px;"
      />
      <ul v-show="isOpen" class="autocomplete-results">
        <li v-for="(result, i) in busResults" 
          :key="i"
          @click="setResult(result)"
          class="autocomplete-result">
            {{ result }}
        </li>
      </ul>
    </div>
    <form enctype="multipart/form-data">
      <label v-if="isBusiness" for="files">
        Please upload a proof of ownership (PDF)</label
      >
    <input v-if="isBusiness" type="file" id="file" ref="file" @change="onSelect" accept="image/.pdf" />
    </form>
    <div class="signup-form-buttons">
      <button class="submit-signup" style= "margin-right: 10px;" v-on:click="signUp">Submit</button>
      <router-link to="/login">
        <button class="cancel">Cancel</button>
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
  name: "business-signup-form",
  data() {
    return {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      businessName: "",
      error: "",
      success: "",
      isBusiness: false,
      businessExists: false,
      file: "",
      isOpen: false,
      busResults: []
    };
  },

  methods: {
    signUp: function () {
      if (
        this.username === "" ||
        this.password === "" ||
        this.firstName === "" ||
        this.lastName === "" ||
        this.email === "" ||
        (this.isBusiness && this.businessName === "") ||
        (this.isBusiness && !this.file)
      ) {
        this.error = "You need to fill up all the entries to sign up!";
        this.clearMessages();
      } else {
        if (this.isBusiness) {
          this.signUpBusiness();
        } else {
          this.signUpClient();
        }
      }
    },
    signUpBusiness: function () {
      axios
        .get(`/api/business/exist/${this.businessName}`, {})
        .then((res) => {
          this.businessExists = res.data;
          this.alertClaim();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    alertClaim: function () {
      if (this.businessExists) {
        axios
          .get(`/api/business/claim/${this.businessName}`, {})
          .then((res) => {
            if (res.data) {
              this.error = "This business has already been claimed";
              this.resetForm();
              this.clearMessages();
            } else {
              if (
                confirm(
                  `Are you sure you want to claim '${this.businessName}'?`
                )
              ) {
                this.updateBusiness();
              } else {
                this.error = `You have not claimed '${this.businessName}'`;
                this.clearMessages();
              }
            }
          });
      } else {
        if (
          confirm(
            `Are you sure you want to create an account for '${this.businessName}'?`
          )
        ) {
          this.updateBusiness();
        } else {
          this.error = `You have not created an account for '${this.businessName}'`;
          this.clearMessages();
        }
      }
    },
    updateBusiness: function () {
      const bodyContent = {
        username: this.username,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        businessType: 1,
      };
      axios
        .post("/api/clients", bodyContent)
        .then((res) => {
          // handle success
          this.success = res.data.message;
          if (this.businessExists) {
        axios.put("/api/business/claim", { businessName: this.businessName });
        axios
          .put("/api/business/user", {
            businame: this.businessName,
            username: this.username,
          })
          .then(() => {
            const empty = JSON.stringify([]);

            axios.post("/api/businessRes/add", {
              username: this.username,
              businessName: this.businessName,
              capacity: 0,
              length: 30,
              timeFrom: new Date(
                `${new Date().toLocaleDateString()} 10:00:00 AM`
              ).toLocaleString(),
              timeTo: new Date(
                `${new Date().toLocaleDateString()} 10:00:00 AM`
              ).toLocaleString(),
              monday: empty,
              tuesday: empty,
              wednesday: empty,
              thursday: empty,
              friday: empty,
              saturday: empty,
              sunday: empty,
            }).then(()=> this.uploadFile());
          });
      } else {
        axios
          .post(`/api/business/`, {
            username: this.username,
            businame: this.businessName,
          })
          .then((res) => {
            this.success = res.data.message;
            const empty = JSON.stringify([]);

            axios.post("/api/businessRes/add", {
              username: this.username,
              businessName: this.businessName,
              capacity: 0,
              length: 30,
              timeFrom: new Date(
                `${new Date().toLocaleDateString()} 10:00:00 AM`
              ).toLocaleString(),
              timeTo: new Date(
                `${new Date().toLocaleDateString()} 10:00:00 AM`
              ).toLocaleString(),
              monday: empty,
              tuesday: empty,
              wednesday: empty,
              thursday: empty,
              friday: empty,
              saturday: empty,
              sunday: empty,
            }).then(()=> this.uploadFile());
          })
          .catch((err) => {
            this.error = err.response.data.error;
          })
      }
      

        })
        .catch((err) => {
          // handle error
          this.error = err.response.data.error;
        });
      
    },
    uploadFile: function () {
      const formData = new FormData();
      formData.append('file', this.file);
      axios.post(`/api/business/file/${this.businessName}`, formData)
      this.resetForm();
      this.clearMessages();

    },
    onSelect: function(){
      const selectedFile = this.$refs.file.files[0];
      this.file = selectedFile;
    },
    signUpClient: function () {
      const bodyContent = {
        username: this.username,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        businessType: 0,
      };
      axios
        .post("/api/clients", bodyContent)
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
    },
    setResult: function(result){
        this.businessName = result;
        this.isOpen = false;
    },
    onChange: function(){
        if (this.businessName == "") {
            this.isOpen = false;
        } else {
            this.isOpen = true;
            axios
                .get(`/api/business/search/${this.businessName}`)
                .then((res) => {
                    this.busResults = res.data.map(business => business.businessName);
                })
                .catch(() => {})
        }
    },

    resetForm: function () {
      this.username = "";
      (this.password = ""),
        (this.firstName = ""),
        (this.lastName = ""),
        (this.email = ""),
        (this.businessName = "");
    },
    clearMessages: function () {
      setTimeout(() => {
        this.error = "";
        if (this.success != "") {
          if (!this.businessExists) {
            this.$router.push("/login");
          } else {
            this.$router.push("/login");
          }
          this.success = "";
          this.businessExists = false;
        }
      }, 2000);
    },
  },
};
</script>

<style scoped>

button {
  margin: 0;
}


input {
  border: 1px solid black;
  width: 200px;
  height: 30px;
  border-radius: 4px;
  margin-bottom: 20px;
}

label {
  font-weight: 100;
  margin-top: 5px;
  margin-right: 10px;
}
input[type="checkbox"] {
  width: 20px;
  height: 20px;
}
input[type="file"] {
  border: none;
  margin-top: 20px;
}



</style>