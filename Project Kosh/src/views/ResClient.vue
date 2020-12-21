<template>
    <div >
        <NavBar/>
        <AllResClients/>
        <NewResSearch/>
    </div>
</template>

<script>
    import AllResClients from "../components/AllResClients.vue"
    import NewResSearch from "../components/NewResSearch.vue"
    import NavBar from "../components/Navbar.vue"
    export default{
        name: "res-client",
        components:{
            AllResClients,
            NewResSearch,
            NavBar
        }
    }
</script>