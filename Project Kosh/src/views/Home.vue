<template>
<div>
  <NavBar/>
  <div id="app" class="BusiInfo-container">
    <BusiInfoList msg="Welcome to Your Vue.js App"/>

  </div>
  </div>
</template>

<script>
import BusiInfoList from '../components/BusiInfoList.vue'
import NavBar from "../components/Navbar.vue"

export default {
  name: 'App',
  components: {
    BusiInfoList,
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
