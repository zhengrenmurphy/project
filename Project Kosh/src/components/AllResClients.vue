<template>
    <div class="all-res-container">
        <h1> Your Reservations: </h1>
        <div class="res-item-list">
            <div v-if="reservations.length">
              Find a reservation: 
              <select class = "select" style="width: 200px; height: 20px;" v-model="resName" @change='getValue'>
                <option selected v-bind:key="allRes"> All Reservations</option>
                <option v-for='item in optionList' 
                v-bind:key="item">{{ item }}</option>
              </select>
              <ResItem
                  v-for="res in reservations"
                  v-bind:key="res.businessName"
                  v-bind:res="res"
              />
            </div>
            <div v-else>

              <p style="text-align: center;">You don't have any reservations. Make one below!</p>

            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios";
import ResItem from "./ResItem.vue";
import { eventBus } from "../main";

export default {
  name: "AllResClients",
  components: {ResItem},
  data() {
    return {
      reservations: [],
      allRes: [],
      optionList: [],
      success: '',
      resName: ''
    };
  },
  async created(){
    eventBus.$on("delete-res", async res => {
      this.reservations = await this.getReservations()
      this.allRes = this.reservations
      this.success = res.data.message
    });
  },

  async mounted(){
    this.reservations = await this.getReservations()
    this.allRes = this.reservations
    if(this.reservations.length){
      this.optionList = this.reservations.map(res => res.businessName)
    }
  },

  methods: {
    getReservations: function(){
      // TODO check authentication
      return axios.get(`/api/clientRes`)
      .then((res) => {
        return res.data
      })
    },
    getValue: function(){
      if(this.resName === 'All Reservations'){
        this.reservations = this.allRes
      }else{
        this.reservations = this.allRes.filter(res => res.businessName === this.resName)
      }

    }
  }
};
</script>

<style scoped>
h1{
    color: #f5c19e
}
</style>