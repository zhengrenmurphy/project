<template>
    <div>
        <NavBar/>
        <ResBusinessView/>
    </div>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import ResBusinessView from "../components/ResBusinessView.vue";

export default{
    name: "res-business",
    components:{
        NavBar,
        ResBusinessView,
    }
}
</script>

