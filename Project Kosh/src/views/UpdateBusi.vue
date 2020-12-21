<template>
<div >
    <NavBar/>
    <UpdateBusiInfoList/>
  
  </div>
</template>

<script>
import UpdateBusiInfoList from '../components/UpdateBusiInfo.vue'   
import NavBar from "../components/Navbar.vue"


export default {
  name: 'App',
  components: {
    UpdateBusiInfoList,
    NavBar,
  }
}
</script>


