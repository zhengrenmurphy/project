<template>
  <div class="reservation-table">
      <label>{{this.error}}</label>
      <table>
          <col>
          <col>
          <col>
          <col>
          <col>
          <col>
          <col>
          <col>

          <thead>
              <th></th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
          </thead>
          <tbody>
              <tr v-for="(i, index) in monday.length" v-bind:key=index>
                <td>{{timeslots[index]}}</td>
				<td class="timeCheckbox">
                    <div v-if="client && monday[index] === -1">
                        <label class="form-checkbox">
                            <input type="checkbox" :value="monday[index]" v-model="monday[index]" v-on:click="checkMaxSlots('MON', index)" disabled>
                            <i class="form-icon"></i>
                        </label>
                    </div>
                    <div v-else>
                        <label class="form-checkbox">
                            <input type="checkbox" :value="monday[index]" v-model="monday[index]" v-on:click="checkMaxSlots('MON', index)">
                            <i class="form-icon"></i>
                        </label>
                    </div>
				</td>
                <td class="timeCheckbox">
                    <div v-if="client && tuesday[index] === -1">
                        <label class="form-checkbox">
                            <input type="checkbox" :value="tuesday[index]" v-model="tuesday[index]" v-on:click="checkMaxSlots('TUE', index)" disabled>
                            <i class="form-icon"></i>
                        </label>
                    </div>
                    <div v-else>
                        <label class="form-checkbox">
                            <input type="checkbox" :value="tuesday[index]" v-model="tuesday[index]" v-on:click="checkMaxSlots('TUE', index)">
                            <i class="form-icon"></i>
                        </label>
                    </div>
				</td>
                <td class="timeCheckbox">
                    <div v-if="client && wednesday[index] === -1">
                        <label class="form-checkbox">
                            <input type="checkbox" :value="wednesday[index]" v-model="wednesday[index]" v-on:click="checkMaxSlots('WED', index)" disabled>
                            <i class="form-icon"></i>
                        </label>
                    </div>
                    <div v-else>
                        <label class="form-checkbox">
                            <input type="checkbox" :value="wednesday[index]" v-model="wednesday[index]" v-on:click="checkMaxSlots('WED', index)">
                            <i class="form-icon"></i>
                        </label>
                    </div>
				</td>
                <td class="timeCheckbox">
                    <div v-if="client && thursday[index] === -1">
                        <label class="form-checkbox">
                            <input type="checkbox" :value="thursday[index]" v-model="thursday[index]" v-on:click="checkMaxSlots('THUR', index)" disabled>
                            <i class="form-icon"></i>
                        </label>
                    </div>
                    <div v-else>
                        <label class="form-checkbox">
                            <input type="checkbox" :value="thursday[index]" v-model="thursday[index]" v-on:click="checkMaxSlots('THUR', index)">
                            <i class="form-icon"></i>
                        </label>
                    </div>
				</td>
                <td class="timeCheckbox">
                    <div v-if="client && friday[index] === -1">
                        <label class="form-checkbox">
                            <input type="checkbox" :value="friday[index]" v-model="friday[index]" v-on:click="checkMaxSlots('FRI', index)" disabled>
                            <i class="form-icon"></i>
                        </label>
                    </div>
                    <div v-else>
                        <label class="form-checkbox">
                            <input type="checkbox" :value="friday[index]" v-model="friday[index]" v-on:click="checkMaxSlots('FRI', index)">
                            <i class="form-icon"></i>
                        </label>
                    </div>
				</td>
                <td class="timeCheckbox">
                    <div v-if="client && saturday[index] === -1">
                        <label class="form-checkbox">
                            <input type="checkbox" :value="saturday[index]" v-model="saturday[index]" v-on:click="checkMaxSlots('SAT', index)" disabled>
                            <i class="form-icon"></i>
                        </label>
                    </div>
                    <div v-else>
                        <label class="form-checkbox">
                            <input type="checkbox" :value="saturday[index]" v-model="saturday[index]" v-on:click="checkMaxSlots('SAT', index)">
                            <i class="form-icon"></i>
                        </label>
                    </div>
				</td>
                <td class="timeCheckbox">
                    <div v-if="client && sunday[index] === -1">
                        <label class="form-checkbox">
                            <input type="checkbox" :value="sunday[index]" v-model="sunday[index]" v-on:click="checkMaxSlots('SUN', index)" disabled>
                            <i class="form-icon"></i>
                        </label>
                    </div>
                    <div v-else>
                        <label class="form-checkbox">
                            <input type="checkbox" :value="sunday[index]" v-model="sunday[index]" v-on:click="checkMaxSlots('SUN', index)">
                            <i class="form-icon"></i>
                        </label>
                    </div>
				</td>
			</tr>
          </tbody>
      </table>
  </div>
</template>

<script>

export default {
  name: "ReservationTable",

  components:{},

  props: {
    time_from: Date,
    timeslot_length: Number,
    time_to: Date,
    monday: Array,
    tuesday: Array,
    wednesday: Array,
    thursday: Array,
    friday: Array,
    saturday: Array,
    sunday: Array,
    maxRes: {
        default: -1,
        type: Number
    },
    client: {
        default: false,
        type: Boolean
    }
  },

  watch: {
      time_from: function(val){
          this.time_from = val
          this.timeslots = this.getTimeSlots()
      },
      time_to: function(val){
          this.time_to = val
          this.timeslots = this.getTimeSlots()
      },
      timeslot_length: function(val){
          this.timeslot_length = val
          this.timeslots = this.getTimeSlots()
      },
      monday: function(val){
          this.monday = val
      },
      tuesday: function(val){
          this.tuesday = val 
      },
      wednesday: function(val){
          this.wednesday = val 
      },
      thursday: function(val){
          this.thursday = val 
      },
      friday: function(val){
          this.friday = val 
      },
      saturday: function(val){
          this.saturday = val 
      },
      sunday: function(val){
          this.sunday = val 
      }

  },

  data() {    
    return {
      error: "",
      timeslots: []
    };
  },

  mounted: function(){
    this.monday = JSON.parse(this.$cookie.get("monday-checked"))
    this.tuesday = JSON.parse(this.$cookie.get("tuesday-checked"))
    this.wednesday = JSON.parse(this.$cookie.get("wednesday-checked"))
    this.thursday = JSON.parse(this.$cookie.get("thursday-checked"))
    this.friday = JSON.parse(this.$cookie.get("friday-checked"))
    this.saturday = JSON.parse(this.$cookie.get("saturday-checked"))
    this.sunday = JSON.parse(this.$cookie.get("sunday-checked"))
    this.timeslots = this.getTimeSlots()
  },

  methods: {
    getTimeSlots(){
        let times = [];
        let empty = [];

        let i = 0;
        let numOfTimes = Math.floor((this.time_to.getTime()-this.time_from.getTime())/(60000*this.timeslot_length))
        while(i< numOfTimes){
            let current = new Date(this.time_from.getTime() + this.timeslot_length*i*60000)
            times.push(current.toLocaleTimeString())
            empty.push(0);
            i++;
        }

        if((times.length !== this.monday.length) && times.length !== 0){
            this.$emit('update-checked', {m: JSON.parse(JSON.stringify(empty)), t: JSON.parse(JSON.stringify(empty)), w: JSON.parse(JSON.stringify(empty)), r: JSON.parse(JSON.stringify(empty)), f: JSON.parse(JSON.stringify(empty)), sa: JSON.parse(JSON.stringify(empty)), su: JSON.parse(JSON.stringify(empty))})
        }
        return times
    },
    checkMaxSlots(weekDay, index){
        const weekMap = {
            'MON': this.monday,
            'TUE': this.tuesday,
            'WED': this.wednesday,
            'THUR': this.thursday,
            'FRI': this.friday,
            'SAT': this.saturday,
            'SUN': this.sunday
        }
        if(this.maxRes !== -1){
            let allCheckBoxes =this.monday.concat(this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday)
            const mon = allCheckBoxes.filter(checked => (checked || checked === 1))
            if(mon.length === this.maxRes){
                weekMap[weekDay][index] = false
                this.error = 'You have selected the maximum amount of timeslots.'
            }
        } else {
            this.$emit('update-checked', {m: this.monday, t: this.tuesday, w: this.wednesday, r: this.thursday, f: this.friday, sa: this.saturday, su: this.sunday})
        }
    }
  }
};
</script>

<style scoped>
    

    tr td{
        border-bottom: 1px solid #93b1ff;
    }

    tr {
        line-height: 40px;
    }

    .form-checkbox {
        justify-content: center;
    }

    thead{
        border-bottom: 1px solid #93b1ff;
    }

    table{
        border-collapse: collapse;
    }

    col{
        width: 10%
    }

    label{
        display: flex; 
        justify-content: left;
        color: red;
    }
    
</style>