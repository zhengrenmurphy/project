<template>
  <div class="res-item-container">
   <h3> {{res.businessName}}</h3>
   <div class= "res-date-container" v-for="(date, index) in res.time" :key="res.id[index]">
     {{ date }}
      <button class="cancel-res" v-on:click="cancelReservation(res.id[index])">Cancel</button>
   </div>
   <br>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "ResItem",
  props:{
    res: Object
  },
  data() {
    return {
      options :{
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
      },
      success: ''
    };
  },
  methods:{
    cancelReservation: function(id){
      const bodyContent = { id };
      axios
      .delete(`/api/clientRes/delete`, {data: bodyContent})
      .then((res)=>{
        this.success = res.data.message;
        // handle success
        eventBus.$emit("delete-res", res);
      })
    }
  }
};
</script>

<style scoped>
h3{
  text-align: left;
}


</style>