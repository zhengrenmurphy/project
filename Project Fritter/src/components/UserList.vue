<template>
  <div class="subsubcontainer">
    <div class="header ternary-header">
      {{title}}
    </div>
    <div>
    
      <div class="users-container">  
        <div v-if="users.length">
          <UserItem
          v-for="user in users"
          v-bind:key="user.id"
          v-bind:user="user"
        />
        </div>
        <div v-else>
          <p style="text-align: center;">There are no users to display. </p>
        </div>
      </div>

      <div v-if='success' class="success-message">
        {{ success }}
      </div>
      <div v-if='error' class="error-message">
        {{ error }}
      </div>
    </div>
     
  </div>
</template>

<script>
import UserItem from "./UserItem";


export default {
  name: "UserList",

  components: { UserItem },

  props: {
      users : Array,
      title : String
    },

  data() {
    return {
      error: "",
      success: "",
    };
  },

  created: function() {
    
  },


  methods: {

    clearMessages: function() {
      setInterval(() => {
        this.success = "";
        this.error = "";
      }, 5000);
    }
  }
};
</script>

