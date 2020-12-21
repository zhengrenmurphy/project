<template>
    <div class="timeslot-capacity-container">
        <div v-if="empty">
            {{ empty }}
        </div>
        <!-- Times Table -->
        <div v-else class="time-table-container">
            <table>
                <th><u>{{ date }}</u></th>
                <tr v-for='slot in timeslots' :key="slot" class="time-row">
                    <td><button class="time-button" v-if="selected===slot" style="background-color:#93B1FF" v-on:click="selected = slot">{{ slot.time }}</button>
                    <button class="time-button" v-else v-on:click="selected = slot">{{ slot.time }}</button></td>
                </tr>
            </table>
        </div>
        <ResByClientTable
            v-bind:key='selected'
            v-bind:reservations='selected.reservations'
        />
    </div>
</template>

<script>
import axios from "axios";
import ResByClientTable from "./ResByClientTable";

export default{
    name: "res-business-timeslots",
    components: { ResByClientTable },
    props: {
        date: String,
        start: String,
        end: String
    },
    data(){
        return{
            selected: {},
            timeslots: [],
            empty: ""
        }
    },
    watch: {
        date: function(val) {
            this.date = val;
        },
        timeslots: function(val) {
            this.timeslots = val
        }
    },
    mounted: async function(){
        let clientRes = await this.getTimeslots()
        if(clientRes.length !== 0){
            const timeArray = []

            clientRes = clientRes.filter(res => {
                let d = new Date(this.date)
                let newDate = d.getDate() + 1
                d.setDate(newDate)
                if(d.toLocaleDateString() === new Date(res.time).toLocaleDateString()){
                    return res
                }
            }).map(res => {
                return {
                    username: res.username.split(','),
                    time: new Date(res.time).toLocaleTimeString()
                }
            })

            clientRes.forEach(res => {
                timeArray.push({
                    time: res.time,
                    reservations: {
                        limit: 10,
                        names: res.username
                    }
                })
            })

            this.timeslots = timeArray;
            this.selected = (timeArray.length === 0)? {}: timeArray[0];
            this.empty = (timeArray.length === 0)? "No reservations on this day!": ""
        }else{
            this.empty = "No reservations on this day!"
        }
    },
    methods: {
        getTimeslots: function(){
            return axios.get(`/api/clientRes/business/${this.$cookie.get("kosh-business")}`)
            .then((res) => {
                return res.data
            })
        }
    }
}
</script>

