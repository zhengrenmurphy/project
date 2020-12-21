<template>
    <b-navbar-item>
<!--         <b-field label="Find a JS framework">
 -->            <b-autocomplete
                rounded
                v-model="name"
                :data="filteredDataArray"
                placeholder="Search users..."
                icon="magnify"
                clearable
                @select="option => selected = option">
                <template slot="empty">No results found</template>
            </b-autocomplete>

<!--         </b-field>
 -->    </b-navbar-item>

</template>

<script>

import axios from "axios";
import { eventBus } from "../main";

    export default {
    data() {
        return {
            options: [],
            name: '',
            selected: null,
        }
    },

    created: function(){

        eventBus.$on("reload_users", () => {
        this.loadUsers();

        });

    },


    mounted: function() {
        this.loadUsers();
    },

    computed : {
    filteredDataArray() {
        return this.options.filter((option) => {
            return option
                .toString()
                .toLowerCase()
                .indexOf(this.name.toLowerCase()) >= 0
        })
        }
    },
      
    methods: {
        
        loadUsers: function() {
              axios.get("/api/users").then(response => {
                this.options = response.data.all.map(user => user.name);
            });
        }
    },

    watch: {
        selected: function () {
          // when the hash prop changes, this function will be fired.
          let signedUsername = this.$cookie.get('fritter-auth');
          if (this.selected === signedUsername && this.selected){
            this.$router.push(`/profile`);
            

          } else if (this.selected !== signedUsername && this.selected){
            this.$router.push(`/${this.selected}`);
            eventBus.$emit("reload-author-freets", this.selected);
            
          }
           
        } 
  }
}
</script>