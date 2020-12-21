<template>
    <div class="res-search-container">

        <h2> New reservation </h2>
        <div class="search-box">
            <input v-model='search' @input="onChange" placeholder="Store">
            <ul v-show="isOpen" class="autocomplete-results">
                <li v-for="(result, i) in results" 
                :key="i"
                @click="setResult(result)"
                class="autocomplete-result">
                    {{ result }}
                </li>
            </ul>
        </div>
        <div class = "search-button">
            <button v-on:click="searchStore"><img src="../assets/search.png" /></button>
        </div>
        <div class="error-message">
            {{ error }}
        </div>

    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: "NewResSearch",
    data(){
        return{
            search: "",
            isOpen: false,
            results: [],
            error: ""
        }
    },
    methods:{
    setResult: function(result){
        this.search = result;
        this.isOpen = false;
    },
    onChange: function(){
        if (this.search == "") {
            this.isOpen = false;
        } else {
            this.isOpen = true;
            axios
                .get(`/api/business/search/${this.search}`)
                .then((res) => {
                    this.results = res.data.map(business => business.businessName);
                })
                .catch(() => {})
        }
    },
    searchStore: function(){
      //find store
      axios
          .post(`/api/business/exist`, { businessname: this.search })
          .then((res) => {
              if(res.data){
                this.$cookie.set("reservation-table", this.search);
                this.$router.push("/client/make-reservations");
              }else{
                this.error = "This business does not exist."
                this.clearMessages();
              }
                
          })
          .catch(() => {
             this.error = "There was an error, try again."
          })
      
    },
    clearMessages: function () {
      setTimeout(() => {
        this.error = "";
        
      }, 1000);
    }
}
}
</script>

<style scoped>
h2{
    color: #f5c19e
}

input{
    width: 200px;
    height: 20px;
}
button{
    border: 1px solid;
    background-color: #f5c19e;
    height: 28px;
    width:30px;
    border-radius: 4px;
}
img{
    height: 20px;
    width:19px; 
}



</style>