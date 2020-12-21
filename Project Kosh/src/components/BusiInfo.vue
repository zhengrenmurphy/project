<template>
  <div class="bInfo-data">
    <div >
        <div style="color:#93b1ff; font-size:18px;  font-weight:bold"> 
            {{busiInfo.businessName}} 
            <button class="contact" v-on:click='showDetail'>details</button>
        
            {{variable}}
            <button class="contact" v-on:click='location'>location</button>

        </div>
        <div > 
            
            <div v-if="busiInfo.takeout === 2 " style="display:inline-block">
                Takeout: 
            <b style="color: #F5C19E;padding-right: 10px">N/A </b>{{variable}}</div>
            <div v-else-if="busiInfo.takeout === 1 " style="display:inline-block">
                Takeout: 
            <span class="check" /></div>
            <div v-else style="display:inline-block">
                Takeout: 
            <span class="status incorrect"></span></div>

            <div v-if="busiInfo.delivery ===2 " style="display:inline-block">
                 Delivery:
            <b style="color: #F5C19E;padding-right: 10px">N/A </b>{{variable}}</div>

            <div v-else-if="busiInfo.delivery===1  " style="display:inline-block">
                 Delivery:
            <span class="check" /></div>
            <div v-else style="display:inline-block">
                Delivery:
            <span class="status incorrect"></span></div>

            <div v-if="busiInfo.outdoor ===2" style="display:inline-block">
                 Outdoor: 
            <b style="color: #F5C19E;padding-right: 10px">N/A </b>{{variable}}</div>

            <div v-else-if="busiInfo.outdoor ===1" style="display:inline-block">
                 Outdoor: 
            <span class="check" /></div>
            <div v-else style="display:inline-block">
                Outdoor: 
            <span class="status incorrect"></span></div>
            


        </div>
        <div > 
            Address: {{busiInfo.street}} 
            <div v-if="busiInfo.hourFrom " style="display: inline-block;padding-right:10px ">
            {{busiInfo.hourFrom}} - {{busiInfo.hourTo}} 
            </div>
            <div v-if="busiInfo.dayFrom " style="display: inline-block;">

            {{busiInfo.dayFrom}} - {{busiInfo.dayTo}}
</div>
        </div>
    
    </div>
  </div>
</template>


<script>

import { eventBus } from "../main";

export default {
    name:"info",
    components:{

    },
    props: {
        busiInfo: Object,
    },
    data() {
        return {
            map:null,
            variable: '    ' 
            

        }
    },

    created: function() {

    },

    computed: {

    },
    methods: {
        location: function() {
            const res = this.busiInfo;
            eventBus.$emit("get-location", res);
        },

        showDetail: function() {
            const res = this.busiInfo;
            eventBus.$emit("show-detail", res);
        }
    }
}
</script>