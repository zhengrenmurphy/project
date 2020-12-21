<template>
    <div class = "reserve-overall">
        <!-- Date Range -->
        <div class="date-range" >
            See who is coming: 
            <input type="date" v-model="date" value="2020-12-07" @input="onChange">
            <router-link to="/business/edit-reservations">
                <button class="edit-timeslot" style="margin-left: 10px; height: 30px">Edit reservations table</button>
            </router-link>
        </div>
        <div class="res-business-container">
            <ResBusinessTimepicker
                v-bind:key="date"
                v-bind:date="date"
                v-bind:start="start"
                v-bind:end="end"
            />
        </div>
    </div>
</template>

<script>
import ResBusinessTimepicker from "./ResBusinessTimepicker.vue";

export default{
    name: "res-timerange",
    components: { ResBusinessTimepicker },
    data(){
        return{
            date: "2020-12-07",
            start: "10:00:00 AM",
            end: "12:30:00 PM"
        }
    },
    methods: {
        onChange: function(){
            console.log(this.date)
        }
    }
}
</script>

<style scoped>
input{
    margin-left: 10px;
    margin-right: 10px;
}

</style>
