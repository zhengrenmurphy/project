<template>
  <div>
    <select  v-model="selected"  @change="newPick" style="margin-right: 10px; width: 100px">
        <option value="12:00:00 AM">12:00 AM</option>
        <option value="12:30:00 AM">12:30 AM</option>
        <option value="1:00:00 AM">1:00 AM</option>
        <option value="1:30:00 AM">1:30 AM</option>
        <option value="2:00:00 AM">2:00 AM</option>
        <option value="2:30:00 AM">2:30 AM</option>
        <option value="3:00:00 AM">3:00 AM</option>
        <option value="3:30:00 AM">3:30 AM</option>
        <option value="4:00:00 AM">4:00 AM</option>
        <option value="4:30:00 AM">4:30 AM</option>
        <option value="5:00:00 AM">5:00 AM</option>
        <option value="5:30:00 AM">5:30 AM</option>
        <option value="6:00:00 AM">6:00 AM</option>
        <option value="6:30:00 AM">6:30 AM</option>
        <option value="7:00:00 AM">7:00 AM</option>
        <option value="7:30:00 AM">7:30 AM</option>
        <option value="8:00:00 AM">8:00 AM</option>
        <option value="8:30:00 AM">8:30 AM</option>
        <option value="9:00:00 AM">9:00 AM</option>
        <option value="9:30:00 AM">9:30 AM</option>
        <option value="10:00:00 AM" >10:00 AM</option>
        <option value="10:30:00 AM">10:30 AM</option>
        <option value="11:00:00 AM">11:00 AM</option>
        <option value="11:30:00 AM">11:30 AM</option>
        <option value="12:00:00 PM">12:00 PM</option>
        <option value="12:30:00 PM">12:30 PM</option>
        <option value="1:00:00 PM">1:00 PM</option>
        <option value="1:30:00 PM">1:30 PM</option>
        <option value="2:00:00 PM">2:00 PM</option>
        <option value="2:30:00 PM">2:30 PM</option>
        <option value="3:00:00 PM">3:00 PM</option>
        <option value="3:30:00 PM">3:30 PM</option>
        <option value="4:00:00 PM">4:00 PM</option>
        <option value="4:30:00 PM">4:30 PM</option>
        <option value="5:00:00 PM">5:00 PM</option>
        <option value="5:30:00 PM">5:30 PM</option>
        <option value="6:00:00 PM">6:00 PM</option>
        <option value="6:30:00 PM">6:30 PM</option>
        <option value="7:00:00 PM">7:00 PM</option>
        <option value="7:30:00 PM">7:30 PM</option>
        <option value="8:00:00 PM">8:00 PM</option>
        <option value="8:30:00 PM">8:30 PM</option>
        <option value="9:00:00 PM">9:00 PM</option>
        <option value="9:30:00 PM">9:30 PM</option>
        <option value="10:00:00 PM">10:00 PM</option>
        <option value="10:30:00 PM">10:30 PM</option>
        <option value="11:00:00 PM">11:00 PM</option>
        <option value="11:30:00 PM">11:30 PM</option>
    </select>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "TimeDrop",
  props: {
      initial_time: String,
      time_type: String
  },
  data(){
      return {
        selected: this.initial_time
      }

  },
  watch: {
    initial_time: function(newTime) {
      this.selected = newTime;
    }
  },
  methods: {
      newPick(){
          eventBus.$emit("business-time-selected-to", {selected: this.selected, type: this.time_type});
      }
  }
};
</script>

<style scoped>
    select{
        border-radius: 0px;
        border: 1px solid #f5c19e;

    }
</style>
