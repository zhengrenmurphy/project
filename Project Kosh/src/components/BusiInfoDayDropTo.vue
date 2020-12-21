<template>
  <div>
    <select  v-model="selected"  @change="newPick" style="margin-right: 10px; width: 100px">
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
 
    </select>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "DayDrop",
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
          eventBus.$emit("busi-day-selected-to", {selected: this.selected, type: this.time_type});
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
