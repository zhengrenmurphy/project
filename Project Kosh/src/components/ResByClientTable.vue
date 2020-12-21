<template>
    <div>
        <!-- Capacity Table-->
        <div class="res-by-client-table">
            <table class="reservations-table">
                <th colspan="2">Reservations: {{ reservations.names.length }}/{{ reservations.limit }}</th>
                <tr v-for='name in reservations.names' :key=name>
                    <td class="reservation-data">{{ name }}</td>
                    <td class="reservation-data"><button class="contact" v-on:click='Contact(name)'>contact</button></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
export default{
    name: "res-business-table",
    props: {
        reservations: Object
    },
    data(){
        return{
        }
    },
    methods: {
        Contact: function(name) {
            axios.post(`/api/business/contact/${name}`, {})
            .then((res) => {
                // handle success
                eventBus.$emit("contact-user-success", res);
            })
            .catch(err => {
                // handle error
                eventBus.$emit("contact-user-error", err);
            })
        }
    }
}
</script>

<style scoped>
    div{
        display: flex;
        width: 80%;
    }
    
</style>