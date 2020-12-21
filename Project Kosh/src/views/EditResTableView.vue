<template>
  <div>
    <NavBar />
    <BackBar :last="'My Reservations'"/>
    <div class='main-editRes'> 
        <div class="table_selections" style="display: flex; flex-direction: row">
            <div class = 'labels' style="margin-right: 40px;">
                <label>Capacity</label>
                <label>Timeslot Length (min)</label>
                <label>Time</label>
            </div>
            <div class = 'selections' style="display: flex; flex-direction: column">
                <input v-model.trim='capacity' type='text'>
                <select  v-model="timeslot_length" @change="newPick" style="margin-right: 10px; width: 50px">
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                </select>
                <div class="time" style="display: flex; flex-direction: row">
                    <label style="margin-right: 10px">From: </label>
                    <TimeDropDown :initial_time="time_from_string" :time_type="'time_from'"/>
                    <label style="margin-right: 10px">To: </label>
                    <TimeDropDown :initial_time="time_to_string" :time_type="'time_to'"/>
                </div>
            </div>
        </div>
        <div v-if="this.error">
            <label class="error-message"> {{ error }} </label>
        </div>
        <ReservationTable :time_from="time_from" :timeslot_length="timeslot_length" :time_to="time_to" :monday="monday" :tuesday="tuesday" :wednesday="wednesday" :thursday="thursday" :friday="friday" :saturday="saturday" :sunday="sunday" @update-checked="updateChecked"/>
    </div>
    <div class='buttons' style='display: flex; justify-content: align'>
        <button class="select-editRes" :key="selectText" v-on:click="selectAll">{{ selectText }}</button>
        <div>
            <button class="submit-editRes" v-on:click="submit">Submit</button>
        </div>
        <router-link to="/business/reservations">
            <button class="cancel-editRes">Cancel</button>
        </router-link>
    </div>
  </div>
</template>

<script>
import ReservationTable from '../components/ReservationTable.vue';
import NavBar from "../components/Navbar.vue";
import TimeDropDown from "../components/TimeDropDown.vue";
import BackBar from "../components/BackBar"
import { eventBus } from "../main";
import axios from "axios";

export default {
  name: "MakeResTableView",
  components: {
    ReservationTable,
    NavBar,
    TimeDropDown,
    BackBar
  },
  data(){
      return {
        time_from: new Date(),
        time_from_string: '',
        time_to: new Date(),
        time_to_string: '',
        timeslot_length: 30,
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
        capacity: 0,
        business_name: 'Cambridge Bicycles',
        allSelected: false,
        selectText: 'Select All',
        empty: false,
        error: ""
      }

  },
  watch: {
      selectText: function(val){
          this.selectText = val
      },
      monday: function(val){
          this.monday = val
      }
  },
  created(){
      eventBus.$on("time-selected", newTime => {
          if(newTime.type === 'time_from'){
              let date = new Date(`${this.time_to.toLocaleDateString()} ${newTime.selected}`)
              if(date.getTime() < this.time_to.getTime()){
                this.time_from = date
                this.time_from_string = date.toLocaleTimeString()
                this.error = ""
              }else{
                this.$cookie.set("time-from-string", this.time_from_string);
                this.error = "Can't have the open time after the close time!"
              }
          } else if(newTime.type === 'time_to'){
              let date = new Date(`${this.time_from.toLocaleDateString()} ${newTime.selected}`)
              if(this.time_from.getTime() < date.getTime()){
                this.time_to = date
                this.time_to_string = date.toLocaleTimeString()
                this.error = ""
              }else{
                this.$cookie.set("time-to-string", this.time_to_string);
                this.error = "Can't have the closing time before the open time!"
              }
          }
    });
  },

  mounted: async function(){
    const reservationTableInfo = await this.getReservationTable();
    if(!this.empty){
        this.capacity = reservationTableInfo.capacity;
        this.timeslot_length = reservationTableInfo.length;
        this.time_from = new Date(reservationTableInfo.timeFrom);
        this.time_from_string = new Date(reservationTableInfo.timeFrom).toLocaleTimeString();
        this.$cookie.set("time-from-string", this.time_from_string);
        this.time_to = new Date(reservationTableInfo.timeTo);
        this.time_to_string = new Date(reservationTableInfo.timeTo).toLocaleTimeString();
        this.$cookie.set("time-to-string", this.time_to_string);
        this.monday = JSON.parse(reservationTableInfo.monday);
        this.$cookie.set("monday-checked", reservationTableInfo.monday)
        this.tuesday = JSON.parse(reservationTableInfo.tuesday);
        this.$cookie.set("tuesday-checked", reservationTableInfo.tuesday)
        this.wednesday = JSON.parse(reservationTableInfo.wednesday);
        this.$cookie.set("wednesday-checked", reservationTableInfo.wednesday)
        this.thursday = JSON.parse(reservationTableInfo.thursday);
        this.$cookie.set("thursday-checked", reservationTableInfo.thursday)
        this.friday = JSON.parse(reservationTableInfo.friday);
        this.$cookie.set("friday-checked", reservationTableInfo.friday)
        this.saturday = JSON.parse(reservationTableInfo.saturday);
        this.$cookie.set("saturday-checked", reservationTableInfo.saturday)
        this.sunday = JSON.parse(reservationTableInfo.sunday);
        this.$cookie.set("sunday-checked", reservationTableInfo.sunday)
    }
  },

  methods: {
      selectAll(){
        this.allSelected = !this.allSelected
        this.selectText = this.allSelected? 'Deselect All': 'Select All';
        const value = this.allSelected? 1: 0;
        const checkboxes = []
        for(let i = 0; i<this.monday.length; i++){
            checkboxes.push(value)
        }
        this.monday = JSON.parse(JSON.stringify(checkboxes))
        this.tuesday = JSON.parse(JSON.stringify(checkboxes))
        this.wednesday = JSON.parse(JSON.stringify(checkboxes))
        this.thursday = JSON.parse(JSON.stringify(checkboxes))
        this.friday = JSON.parse(JSON.stringify(checkboxes))
        this.saturday = JSON.parse(JSON.stringify(checkboxes))
        this.sunday = JSON.parse(JSON.stringify(checkboxes))
        return
      },
      getReservationTable: function(){
        return axios.get(`/api/businessRes`)
        .then((res) => {
            if(typeof res.data === 'string'){
                this.empty = true
            }
            return res.data
        })
      },
      newPick: function(){
          this.timeslot_length = parseInt(this.timeslot_length)

      },
      updateChecked: function(days){
        this.monday = days.m
        this.tuesday = days.t
        this.wednesday = days.w
        this.thursday = days.r
        this.friday = days.f
        this.saturday = days.sa
        this.sunday = days.su

        this.$cookie.set("monday-checked", JSON.stringify(days.m))
        this.$cookie.set("tuesday-checked", JSON.stringify(days.t))
        this.$cookie.set("wednesday-checked", JSON.stringify(days.w))
        this.$cookie.set("thursday-checked", JSON.stringify(days.r))
        this.$cookie.set("friday-checked", JSON.stringify(days.f))
        this.$cookie.set("saturday-checked", JSON.stringify(days.sa))
        this.$cookie.set("sunday-checked", JSON.stringify(days.su))
      },
      submit(){
          const bodyContent = {capacity: this.capacity, length: this.timeslot_length, timeFrom: this.time_from.toLocaleString(), timeTo: this.time_to.toLocaleString(), monday: JSON.stringify(this.monday), tuesday: JSON.stringify(this.tuesday), wednesday: JSON.stringify(this.wednesday), thursday: JSON.stringify(this.thursday), friday: JSON.stringify(this.friday), saturday: JSON.stringify(this.saturday), sunday: JSON.stringify(this.sunday)}
          axios.put(`/api/businessRes/edit`, bodyContent).then(() => {
              this.$router.push("/business/reservations")
          })
      }
  }
};
</script>

<style scoped>
   

    label{
        display: flex; 
        justify-content: left;
        margin-bottom: 30px;
    }

    input{
        border-radius: 0px;
        border: 1px solid #f5c19e;
        width: 50px;
        height: 20px;
        text-align: center;
        margin-bottom: 27px;
    }

    select{
        border-radius: 0px;
        border: 1px solid #f5c19e;
        width: 50px;
        height: 25px;
        text-align: center;
        margin-bottom: 24px;
    }
   
</style>
