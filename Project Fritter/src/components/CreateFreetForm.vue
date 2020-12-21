<template>
  <div class="subcontainer">
    <div class="header primary-header">
      Create Freet
    </div>
    <div class="freet-form-container">
      <!-- the submit event will no longer reload the page -->
      <form id='create-freet' v-on:submit.prevent='createFreet' method='post'>

        <input id='name' v-model.trim='freetName' type='text' name='freetName'  placeholder="Enter Freet Content">

        <input  type='submit' value="Create Freet" id="createFreet" class="newbutton">

        <div v-if='success' class="success-message">
          {{ success }}
        </div>

        <div v-if='errors.length' class="error-message">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "CreateFreetForm",

  data() {
    return {
      errors: [],
      success: "",
      freetName: "",
    };
  },

  methods: {
    createFreet: function() {
      this.errors = [];

      if (this.freetName === "") {
        this.errors.push("Freet name is required");
        this.clearMessages();

      } else {
        if (this.freetName.length > 140) {
            this.errors.push("Freet should be no longer than 140 words!");
            this.clearMessages();
        }
        const bodyContent = { freetName: this.freetName};
        axios
          .post(`/api/freets`, bodyContent)
          .then(freet => {
            // handle success
            this.success = "Freet created successfully!";
            eventBus.$emit("create-freet-success", freet);
          })
          .catch(err => {
            // handle error
            this.errors.push(err.response.data.error);
          })
          .then(() => {
            // always executed
            this.resetForm();
            this.clearMessages();
          });
      }
    },

    resetForm: function() {
      this.freetName = "";
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
        this.success = "";
      }, 5000);
    }
  }
};
</script>
