<template>
    <div class="bInfo-table-container">
        <div class = "bInfo-table">
        <h2 style="margin:10px" >
            Business Information List
        </h2>
        <div >
        <select class = "select" name="" id="" v-model="selectSorting" @change='getValue'>
            <option value="">Sorted By</option>
            <option v-for='item in optionList' 
            v-bind:key="item">{{ item }}</option>
        </select>
            <div class = "filter">
            <input class = "select"  v-model="search" @input="onChange" placeholder="Search For Businesses"> 
            </div>
        <div >  
            
            <div v-if="busiInfos.length">
            <BusiInfo 
            v-for="busiInfo in busiInfos"
            v-bind:key="busiInfo.freetID"
            v-bind:busiInfo="busiInfo"
            />
            </div>
        </div>
        </div>
        

        </div>

        
        <div class = "bInfo-table" v-if="showDetail" >
        <p class="error-message"> {{this.error}}</p>
                                <div><button class="smallcontact" v-on:click="cancelDetail">X</button></div>

        <h2 style="color:#93b1ff; ">

            {{showDetail.businessName}}
           
            <button class="bigcontact" v-on:click="reservation">Reservation</button>

        </h2>
        
        <div class="bInfo-data">  
            <div v-if="showDetail.safety === 1 " style="display:inline-block">
                Safety Precaution: 
            <span class="check" /></div>
            <div v-if="showDetail.safety === 2 " style="display:inline-block">
                Safety Precaution: 
            <b style="color: #F5C19E;padding-right: 10px">N/A </b>{{variable}}</div>
            <div v-if="showDetail.safety === 0 " style="display:inline-block">
                Safety Precaution: 
            <span class="status incorrect"></span></div>

            <div v-if="showDetail.parking === 1 " style="display:inline-block">
                Parking:
            <span class="check" /></div>
            <div v-if="showDetail.parking === 2 " style="display:inline-block">
                Parking:
            <b style="color: #F5C19E;padding-right: 10px">N/A </b>{{variable}}</div>
            <div v-if="showDetail.parking === 0 " style="display:inline-block">
                Parking:
            <span class="status incorrect"></span></div>

            <div v-if="showDetail.mask === 1 " style="display:inline-block">
                Mask: 
            <span class="check" /></div>
            <div v-if="showDetail.mask === 2 " style="display:inline-block">
                Mask: 
            <b style="color: #F5C19E;padding-right: 10px">N/A </b>{{variable}}</div>
            <div v-if="showDetail.mask === 0 " style="display:inline-block">
                Mask: 
            <span class="status incorrect"></span></div>

          
            <div v-if="showDetail.capacity === null " style="display:inline-block">
                Capacity:
            <b style="color: #F5C19E;padding-right: 10px">N/A </b>{{variable}}</div>
            <div v-else style="display:inline-block">
                Capacity: {{showDetail.capacity}}
           </div>
            
        </div>

        <div class="bInfo-data">  
            <h2 style="text-align:center">Government Announcement</h2>
            <p>All customers must be seated; eat-in service to standing customers (e.g., around bar areas) is prohibited. All other amenities and areas not employed for food and beverage service (e.g., dance floors, playgrounds, etc.) must be closed or removed to prevent gathering of customers.</p>
        </div>

        <div class="bInfo-data">  
            <h2 style="text-align:center">Restaurant Announcement</h2>
            <div v-if="showDetail.description === null">
            <p>The business has not made announcement yet. This is a example of default annoucement.</p>    
            <p>We welcome every customers to our shop! We’re going to do our best to stay open, just with the takeout and delivery. We’ll just have to adjust again. I believe it will be tougher...you’re just getting back on your feet and getting everything caught up. </p>
            <p>Please be aware to wear a mask! You could choose either indoor dining or outdoor dining. We offer special discount during the COVID-19 time. We really appreciate your patience!</p>
            </div>
            <div v-else>
                <p>{{showDetail.description}}</p>
            </div>
        </div>

        <div class = "for-map">
       
        </div>
        
        
        </div>
        <GmapMap 
             :center="mapCoordinates"
             :zoom="16"
             :options="options"
             style="width:900px;height:700px;margin:32px auto;position:relative;top:-50px"
             ref="mapRef"
        >
        <gmap-custom-marker :marker="marker">
        <img src="https://github.com/zhengrenmurphy/Around/blob/master/kisspng-google-maps-pin-google-map-maker-5afbd83ccbb2c8.2847421515264543328344.png?raw=true"
        height="40" width="40" />
        </gmap-custom-marker>

        <gmap-custom-marker
        :key="marker.id"
        v-for="marker in place"
        :marker="marker"
        :onClick="placeClick"
        class="">
            <img src="https://github.com/zhengrenmurphy/Around/blob/master/pin.png?raw=true"
             height="10" width="10" />
        </gmap-custom-marker>
  </GmapMap> 
    </div>
    
</template>

<script>

import BusiInfo from "./BusiInfo";
import GmapCustomMarker from 'vue2-gmap-custom-marker'; 
import { eventBus } from "../main";
import axios from 'axios';

export default {
  name: "BusiInfoList",

  components:{BusiInfo, 'gmap-custom-marker': GmapCustomMarker},

  props: {
  },

  data() {
      return {
            selectSorting: '',
            optionList: ['all', 'takeout', 'delivery', 'outdoor'],
            error: "",
            success: "",
            search: "",
            variable: '   ', 
            busiInfos: [],
            map:null,
            marker: {
                lat: 42.3737213,
                lng: -71.09936191
            },
            showDetail:null,
            place:null,
            coordinates: {
                lat: 0,
                lng: 0
            },
            auth: this.$cookie.get("kosh-auth"),
            options: {
                disableDefaultUI: true,
                scrollwheel: false,
                styles: [
                            {
                                "elementType": "geometry",
                                "stylers": [
                                {
                                    "color": "#f5f5f5"
                                }
                                ]
                            },
                            {
                                "elementType": "labels.icon",
                                "stylers": [
                                {
                                    "visibility": "off"
                                }
                                ]
                            },
                            {
                                "elementType": "labels.text.fill",
                                "stylers": [
                                {
                                    "color": "#616161"
                                }
                                ]
                            },
                            {
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                {
                                    "color": "#f5f5f5"
                                }
                                ]
                            },
                            {
                                "featureType": "administrative.land_parcel",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                {
                                    "color": "#bdbdbd"
                                }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "geometry",
                                "stylers": [
                                {
                                    "color": "#eeeeee"
                                }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                {
                                    "color": "#757575"
                                }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "geometry",
                                "stylers": [
                                {
                                    "color": "#e5e5e5"
                                }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "geometry.fill",
                                "stylers": [
                                {
                                    "color": "#d9ecda"
                                }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                {
                                    "color": "#9e9e9e"
                                }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "geometry",
                                "stylers": [
                                {
                                    "color": "#ffffff"
                                }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                {
                                    "color": "#757575"
                                }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry",
                                "stylers": [
                                {
                                    "color": "#dadada"
                                }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                {
                                    "color": "#616161"
                                }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                {
                                    "color": "#9e9e9e"
                                }
                                ]
                            },
                            {
                                "featureType": "transit.line",
                                "elementType": "geometry",
                                "stylers": [
                                {
                                    "color": "#e5e5e5"
                                }
                                ]
                            },
                            {
                                "featureType": "transit.station",
                                "elementType": "geometry",
                                "stylers": [
                                {
                                    "color": "#eeeeee"
                                }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "geometry",
                                "stylers": [
                                {
                                    "color": "#c9c9c9"
                                }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "geometry.fill",
                                "stylers": [
                                {
                                    "color": "#e9f0fb"
                                }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                {
                                    "color": "#9e9e9e"
                                }
                                ]
                            }
                            ]
            }

      }
    },

    created: function() {
        eventBus.$on("get-location", (res) => {
        
            this.map = {lat: res.lat,
                        lng: res.lng};
                        this.init();

        });
        eventBus.$on("show-detail", (res) => {
                    this.showDetail = res;
        });
        
        this.$getLocation({})
            .then(coordinates => {
                this.coordinates = coordinates;
            })
            .catch(error => alert(error));

    },

    mounted: function() {
        this.loadBusiInfo();
        this.places();
    },

    
        
  methods: {
      init() {
            this.marker.lat = this.map.lat;
            this.marker.lng = this.map.lng
            },
        placeClick (marker) {
                console.log('this marker was clicked', marker)
            } ,
      onChange: function() {
        if (this.search == "") {
            this.isOpen = false;
            this.loadBusiInfo();
        } else {
            this.isOpen = true;
            axios
                 .get(`/api/business/search/${this.search}`)
                 .then((res) => {
                     this.busiInfos = res.data
                     if (this.busiInfos === []) {
                         this.loadBusiInfo()
                     }
                 })
                 .catch(() => {});
        }
      },
      reservation: function(){
          if (this.$cookie.get("kosh-business")){
            this.error = "You cannot make a reservation with a business account!"
          } else{
            if(this.auth){
                this.$cookie.set("reservation-table", this.showDetail.businessName);
                this.$router.push("/client/make-reservations");
            }else{
                this.error = "You must log in to make a reservation!"
            }
          }
          this.clearMessages();
              
        
          
      },
        clearMessages: function () {
      setTimeout(() => {
        this.error = "";
        this.success = "";
        }
      , 1000);},
      loadBusiInfo: function() {
          axios.get(`/api/business`).then(response => {
               /* eslint-disable no-console */
            this.busiInfos =response.data;
          })
       

        },
        places: function() {
                axios.get(`/api/business/location`).then(response => {
                /* eslint-disable no-console */
                this.place = response.data;
            })
            
                // return this.place
            },
        cancelDetail: function() {
                this.showDetail = null;
            },
            getValue: function(){
                        if(this.selectSorting === 'all') {
                            axios.get(`/api/business`).then(response => {
                            this.busiInfos =response.data;
                            })
                        } else if(this.selectSorting === 'takeout') {
                            axios.get(`/api/business/takeout`).then(response => {
                            this.busiInfos =response.data;
                            })
                        } else if(this.selectSorting === 'delivery'){
                            axios.get(`/api/business/delivery`).then(response => {
                            this.busiInfos =response.data;
                            })
                        } else if(this.selectSorting === 'outdoor'){
                            axios.get(`/api/business/outdoor`).then(response => {
                            this.busiInfos =response.data;
                            })
                        } 
                    }
        

        },
    computed:{
        mapCoordinates(){
            if(!this.map) {
                return {
                    lat:42.36655289999999, 
                    lng:-71.1053043
                }
            }
            return{
                lat:this.map.lat,
                lng:this.map.lng
            }
        }
    }


};
</script>

<style scoped>
input{
    width: 250px;
    height: 20px;
    margin-bottom:15px;
    padding:0;
}
</style>