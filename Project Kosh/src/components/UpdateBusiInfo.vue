<template>
<div>
    <div style="text-align:center; color:#93b1ff; font-size:22px">

    Update the business information
    </div>
    

    <div class="big-box" >
        
        <div class="left">
        
        <div class="left-inside">
            <div style="color: #F5C19E; font-size:24px;text-align:left; line-height:1em;">
            Business information
        </div>
        <tr>Business: {{ businessName }}</tr>
        <tr>Street: <input type="text" id = "street" v-model="streetInfo"></tr>
        <tr>City:<input type="text" id = "city" v-model="cityInfo"></tr>
        <tr>State:<input type="text" id = "state" v-model="stateInfo"> </tr>
        <tr>Zip:<input type="text" id = "zip" v-model="zipInfo"></tr>
        </div>
     
        <div class="left-bottom">
         <div style="color: #F5C19E; font-size:24px;text-align:left; line-height:1em;">
            Operation Status
        </div>   
        <tr >Open: <input type="CheckBox" style="padding-left:0%" id = "open" name="open" :checked="openStatus"/> </tr>
        <tr >Edit Time</tr >
        <tr > From:<BusiInfoTimeDrop :initial_time="hourFrom" /> To <BusiInfoTimeDropTo :initial_time="hourTo"/></tr>
        <tr >Edit Day </tr >
        <tr >From:<BusiInfoDayDrop :initial_time="dayFrom"/> To <BusiInfoDayDropTo :initial_time="dayTo"/></tr >
        </div>
        
        </div>
        
        <div class="middel" >

            <div class="left-inside">
                    <div style="color: #F5C19E; font-size:24px;text-align:left; line-height:1em;">
        Restaurants Facility:</div>
        <tr>Takeout:     <input type="CheckBox" id = "takeout" name="takeout" :checked="takeout"/></tr>
        <tr>Delivery:    <input type="CheckBox" id = "delivery" name="delivery" :checked="delivery"/> </tr>
        <tr>Outdoor Sitting: <input type="CheckBox" id = "outdoor" name="outdoor" :checked="outdoor"/> </tr>
        <tr>Indoor Sitting: <input type="CheckBox" id = "indoor" name="indoor" :checked="indoor"/> </tr>
        <tr>Parking: <input type="CheckBox" id = "parking" name="parking" :checked="parking"/></tr>

        </div>
         <div class="left-bottom">
        <div style="color: #F5C19E; font-size:24px;text-align:left; line-height:1em;">
        Covid Prevention:</div>
        <tr>Safety Precaution: <input type="CheckBox" id = "safety" name="safety" :checked="safety"/></tr>

        <tr>Mask: <input type="CheckBox" id ="mask" name="mask" :checked="mask"/></tr>

        <tr>No Outdoor Shopping: <input type="CheckBox" id ="outdoorShopping" name="outdoorShopping" :checked="indoorShopping"/> </tr>
        <tr>Curbside Pick Up: <input type="CheckBox" id ="curbside" name="curbside" :checked="curbside"/> </tr>
                <tr>Capacity: <input type="text" id = "capacity" v-model="capacityInfo"></tr>

        </div> 
</div>
        
        <div class="right">
            <div class="left-inside">
              <div class="left-top">
          <div style="color: #F5C19E; font-size:24px;text-align:left; line-height:1em">
            Business Account:
          </div>
          <tr>First Name: <input type="text" id = "firstname" v-model="firstName"></tr>
          <tr>Last Name:<input type="text" id = "lastname" v-model="lastName"></tr>
          <tr>Username: <input type="text" id = "username" v-model="username"></tr>
          <tr>Password:<input type="text" id = "password" v-model="password"></tr>
          <tr>Email:<input type="text" id = "email" v-model="email"> </tr>
        </div>
                <div style="color: #F5C19E; font-size:24px;text-align:left; line-height:1em;padding-top:15px">
                  
        <tr>Description:</tr> </div>
        <input type="text" style="width:250px;height:200px" v-model="announceInfo">

        </div>
        <div class="left-bottom-update">
        <button class="cancel-update" v-on:click="del">Delete</button>
        <button class = "submit-update" v-on:click="submit">Submit</button>
        <div v-if='success' class="success-message">
        {{ success }}
        </div>
        <div v-if='error' class="error-message">
          {{ error }}
        </div>
        </div> 
</div> 



    </div>
    </div>


</template>


<script>
import axios from "axios";
import BusiInfoTimeDrop from "./BusiInfoTimeDrop.vue";
import BusiInfoTimeDropTo from "./BusiInfoTimeDropTo.vue";
import BusiInfoDayDrop from "./BusiInfoDayDrop.vue";
import BusiInfoDayDropTo from "./BusiInfoDayDropTo.vue";
import { eventBus } from "../main";


export default {
  name: "BusiInfoList",

    components: {  BusiInfoTimeDrop,BusiInfoTimeDropTo,  BusiInfoDayDrop,BusiInfoDayDropTo },

  props: {

  },
  data() {
      
      return {
          businessInfo: "",
          error: "",
          success: "",
          oldUsername: "",
          oldPassword: "",
          oldEmail: "",
          oldFirstName: "",
          oldLastName: "",
          username: "",
          password: "",
          email: "",
          firstName: "",
          lastName: "",
          businessName: "",
          streetInfo: "",
          cityInfo: "",
          stateInfo: "",
          zipInfo: "",
          openStatus: 0,
          takeout: 0,
          delivery: 0,
          outdoor: 0,
          indoor: 0,
          indoorShopping: 0,
          curbside: 0,
          safety: 0,
          parking: 0,
          mask: 0,
          capacityInfo: 0,
          hourFrom:"10:00:00 AM",
          hourTo:"12:30:00 PM",
          dayFrom:"Sunday",
          dayTo:"Saturday",
          announceInfo:"",
          date: "11/09/2020",
          route: false,
          lat:42.3737213, // defult coordinate, need manual modify after the new business enter in
          lng:-71.09936191, // defult coordinate, need manual modify after the new business enter in
      }
  },
  created: function() {
      eventBus.$on("business-time-selected", (res) => {
    
        this.hourFrom = res.selected;
        

      });
      eventBus.$on("business-time-selected-to", (res) => {
    
        this.hourTo = res.selected;
       

      });
      eventBus.$on("busi-day-selected", (res) => {
    
        this.dayFrom = res.selected;
       

      });
      eventBus.$on("busi-day-selected-to", (res) => {
    
        this.dayTo= res.selected;
       

      });
      eventBus.$on("update-success", () => {
      this.success = `Successfully update the information!`;
      this.clearMessages();
    });
  },
  mounted: function() {
      this.loadBusiInfo();
      this.loadBusAccountInfo();
  },
  methods: {
      loadBusiInfo: function() {
          axios.get(`/api/business/single`).then((response) => {
                /* eslint-disable no-console */
              var singleBusinessInfo = response.data;
              var authenticated = true; // need update
              
              if (authenticated === true) {
                  this.username= singleBusinessInfo[0].username;
                  this.businessName= singleBusinessInfo[0].businessName;
                  this.streetInfo= singleBusinessInfo[0].street;
                  this.cityInfo= singleBusinessInfo[0].city;
                  this.stateInfo= singleBusinessInfo[0].state;
                  this.zipInfo= singleBusinessInfo[0].zip;
                  this.openStatus= singleBusinessInfo[0].openStatus;
                  this.takeout= singleBusinessInfo[0].takeout;
                  this.delivery= singleBusinessInfo[0].delivery;
                  this.outdoor= singleBusinessInfo[0].outdoor;
                  this.indoor= singleBusinessInfo[0].indoor;
                  this.indoorShopping= singleBusinessInfo[0].indoorShopping;
                  this.curbside= singleBusinessInfo[0].curbside;
                  this.safety= singleBusinessInfo[0].safety;
                  this.parking= singleBusinessInfo[0].parking;
                  this.mask= singleBusinessInfo[0].mask;
                  this.capacityInfo= singleBusinessInfo[0].capacity;
                  this.hourFrom= singleBusinessInfo[0].hourFrom;
                  this.hourTo= singleBusinessInfo[0].hourTo;
                  this.dayFrom= singleBusinessInfo[0].dayFrom;
                  this.dayTo= singleBusinessInfo[0].dayTo;
                  this.announceInfo= singleBusinessInfo[0].description;
              }

          })
      },
      loadBusAccountInfo: function() {
          axios.get(`/api/clients/${this.$cookie.get("kosh-auth")}`).then((response) => {
              var accountInfo = response.data;
              this.username = accountInfo.username;
              this.oldUsername = accountInfo.username;
              this.password = accountInfo.password;
              this.oldPassword = accountInfo.password;
              this.email = accountInfo.email;
              this.oldEmail = accountInfo.email;
              this.firstName = accountInfo.firstName;
              this.oldFirstName = accountInfo.firstName;
              this.lastName = accountInfo.lastName;
              this.oldLastName = accountInfo.lastName;
          })
      },
      submit: function() {
        if(this.username === "") {
          this.error = "Username could not be empty";
          this.clearMessages();
        }else if (this.password === ""){
          this.error = "Password could not be empty";
          this.clearMessages();
        }else if (this.firstName === ""){
          this.error = "First name could not be empty";
          this.clearMessages();
        }else if (this.lastName === ""){
          this.error = "Last name could not be empty";
          this.clearMessages();
        }else if (this.email === ""){
          this.error = "Email could not be empty";
          this.clearMessages();
        }
          else{
          const businessBodyContent = { os: document.getElementById("open").checked, to: document.getElementById("takeout").checked,
                                od:document.getElementById("outdoor").checked,ind:document.getElementById("indoor").checked,
                                inshop:document.getElementById("outdoorShopping").checked,dl:document.getElementById("delivery").checked,
                                cs:document.getElementById("curbside").checked,st:document.getElementById("safety").checked,
                                pk:document.getElementById("parking").checked,mask:document.getElementById("mask").checked,
                                lat:this.lat, lng:this.lng, fb:null, ins:null, twitter:null, capacity:this.capacityInfo,
                                hourFrom:this.hourFrom, hourTo:this.hourTo, dayFrom:this.dayFrom, dayTo:this.dayTo,
                                des:this.announceInfo, city:this.cityInfo, state:this.stateInfo, zip:this.zipInfo, street:this.streetInfo};


          axios.put(`/api/clients/firstname/${this.firstName}`)
              .then(() => {
                return axios.put(`/api/clients/lastname/${this.lastName}`)
              })
              .then(() => {
                return axios.put(`/api/clients/password/`, { password: this.password });
              })
              .then(() => {
                // When updating username, need to update both User and Business tables,
                // and update the "kosh-business" cookie
                if (this.oldUsername !== this.username) {
                  return axios.put(`/api/clients/username/${this.username}`)
                }
              })
              .then(() => {
                if (this.oldUsername !== this.username) {
                  return axios.put(`/api/business/user`, { username: this.username, businame: this.businessName })
                }
              })
              .then(() => {
                this.$cookie.set("kosh-business", this.username);
                if (this.oldEmail !== this.email) {
                  return axios.put(`/api/clients/email/`, { email: this.email })
                }
              })
              .then(() => {
                this.businessInfo = "Got here";
                return axios.put(`/api/business/`, businessBodyContent) 
              })
              .then(() => {
                eventBus.$emit("update-success", true); 
              })
              .catch((err) => {
                this.error = err.response.data.error;
              }); 
          
          this.clearMessages();
        }
      },
      del: function() {
      axios.delete(`/api/clients/`, {})
        .then((res)=>{
          this.success = res.data.message;
          this.route = true;
          return axios.put(`/api/business/claim`, {username: this.$cookie.get("kosh-auth")});
        })
        .then(() => {})
        .catch((err) => {
          this.error = err;
        })
        .then(()=>{
          this.clearMessages();
        })
      },
      clearMessages: function() {
      setInterval(() => {
        this.success = "";
        this.error = "";
        if (this.route) {
          this.$cookie.set("kosh-auth", "");
          this.$cookie.set("kosh-client", "");
          this.$cookie.set("kosh-business", "");
          this.$router.push("/login");
        }
        this.route = false;
      }, 5000);
    }
      
  },
  computed:{
  }


};
</script>

<style scoped>
    tr{
        display: flex; 
        justify-content: left;
        margin-bottom: 3px;
        padding-left: 0%;
        text-justify :distribute-all-lines;
    }
 

    input{
              padding-left: 0%;

    }
  

</style>