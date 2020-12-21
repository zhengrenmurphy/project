<template>
<div>
  <NavBar/>
  <div class="log-in-subcontainer">
  <LogInForm/>
  </div>
  </div>
</template>

<script>
    import NavBar from "../components/Navbar.vue";
    import LogInForm from "../components/LogInForm.vue";
    export default{
        name: "login",
        components:{
        NavBar, 
        LogInForm
        }
    }
</script>

