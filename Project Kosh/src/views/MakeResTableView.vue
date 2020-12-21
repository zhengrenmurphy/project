<template>
  <div>
    <NavBar />
    <BackBar :last="'Home'"/>
    <div class='main-makeRes'> 
        <h1> {{ businessName }}</h1>
        <div v-if="!empty">
          <label>You can reserve up to {{maxRes}} slots a week.</label>
          <ReservationTable :client="true" :time_from="time_from" :timeslot_length="timeslot_length" :time_to="time_to" :monday="monday" :tuesday="tuesday" :wednesday="wednesday" :thursday="thursday" :friday="friday" :saturday="saturday" :sunday="sunday" :maxRes="maxRes"/>
        </div>
        <div v-else>
          <label>No reservations available.</label>
        </div>
    </div>
    <div class="error-message">
      {{ error }}
    </div>
    <div class='buttons' v-if="!empty">
        <button class="submit" v-on:click="submit">Submit</button>
      <router-link to="/">
        <button class="cancel" v-on:click="cancel">Cancel</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import ReservationTable from '../components/ReservationTable.vue'
import NavBar from "../components/Navbar.vue";
import BackBar from "../components/BackBar"
import axios from "axios";

export default {
  name: "MakeResTableView",
  components: {
    ReservationTable,
    NavBar, 
    BackBar
  },
  data(){
      return {
        businessName: this.$cookie.get("reservation-table"),
        time_from: new Date(),
        time_to: new Date(),
        timeslot_length: 30,
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
        maxRes: 10,
        timeslots: [],
        empty: false,
        error: ''
      }

  },

  mounted: async function(){
    const reservationTableInfo = await this.getReservationTable();
    if(!this.empty){
      this.time_from = new Date(reservationTableInfo.timeFrom);
      this.time_to = new Date(reservationTableInfo.timeTo);
      this.timeslots = this.getTimeSlots()
      this.maxRes = reservationTableInfo.capacity;
      this.timeslot_length = reservationTableInfo.length;

      const weekMap = [
        {
          array: reservationTableInfo.monday,
          string: "monday-checked"
        },
        {
          array: reservationTableInfo.tuesday,
          string: "tuesday-checked"
        },
        {
          array: reservationTableInfo.wednesday,
          string: "wednesday-checked"
        },
        {
          array: reservationTableInfo.thursday,
          string: "thursday-checked"
        },
        {
          array: reservationTableInfo.friday,
          string: "friday-checked"
        },
        {
          array: reservationTableInfo.saturday,
          string: "saturday-checked"
        },
        {
          array: reservationTableInfo.sunday,
          string: "sunday-checked"
        }
      ]

      for(let i = 0; i<weekMap.length; i++){
        let newDayArray = JSON.parse(weekMap[i].array).map(time => {
          if(time === 1 || time){
            return 0
          }else{
            return -1
          }
        })
        
        if( i === 0 ){ this.monday = newDayArray;}
        else if( i === 1 ){ this.tuesday = newDayArray;}
        else if( i === 2 ){ this.wednesday = newDayArray;}
        else if( i === 3 ){ this.thursday = newDayArray;}
        else if( i === 4 ){ this.friday = newDayArray;}
        else if( i === 5 ){ this.saturday = newDayArray;}
        else if( i === 6 ){ this.sunday = newDayArray;}
        
        this.$cookie.set(weekMap[i].string, JSON.stringify(newDayArray))
      }
    }
  },
  
  methods: {
      addDays: function(today, days) {
        const dayMap = {
          0: days + 1,
          1: days,
          2: days - 1,
          3: days - 2,
          4: days - 3,
          5: days - 4,
          6: days - 5,
        }
        let date = today;
        date.setDate(date.getDate() + dayMap[date.getDay()]);
        return date.toLocaleString();
      },
      getTimeSlots(){
        let times = [];
        let i = 0;
        let numOfTimes = Math.floor((this.time_to.getTime()-this.time_from.getTime())/(60000*this.timeslot_length))
        while(i< numOfTimes){
            let current = new Date(this.time_from.getTime() + this.timeslot_length*i*60000)
            times.push(current.toLocaleTimeString())
            i++;
        }
        return times

      },
      getReservationTable: function(){
        return axios.get(`/api/businessRes/client/${this.businessName}`)
        .then((res) => {
          if(typeof res.data === 'string'){
            this.empty = true
          }
          return res.data
        })
        .catch(()=>{
          this.empty = true
        })
      },
      submit:function(){
        // submit client's reservations
        const selected = []
        const today = new Date();
        const days = ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN']
        const weekMap = {
            'MON': this.monday,
            'TUE': this.tuesday,
            'WED': this.wednesday,
            'THUR': this.thursday,
            'FRI': this.friday,
            'SAT': this.saturday,
            'SUN': this.sunday
        }
        days.forEach((day, index) => {
          weekMap[day].forEach((checked, ind) => {
            if(checked === 1 | checked === true){
               selected.push(this.addDays(new Date(`${today.toLocaleDateString()} ${this.timeslots[ind]}`), index))
            }
          })
        })
        if (selected.length === 0) {
          this.error = "You must select a reservation time!";
        } else {
          const bodyContent = { time: selected, businessName: this.businessName };
          axios
            .post(`/api/clientRes/add`, bodyContent)
            .then(() => {
              this.$router.push("/client/reservations")
            })
        }
      },
      cancel: function(){
        this.$router.push("/")
      }
  }
};
</script>

<style scoped>
    label{
        display: flex; 
        justify-content: left;
        margin-bottom: 30px;
        padding-left: 20%;
    }

    h1{
        padding-left: 20%;

        color: #f5c19e;
        display: flex; 
        justify-content: left;
        margin-bottom: 0px;
        font-family: Helvetica, sans-serif;
    }
</style>
