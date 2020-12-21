<template>
    <div class="edit-client-account">
        <NavBar/>
        <h1> Edit Account </h1>
        <EditClientForm/>
    </div>
</template>

<script>
import NavBar from "../components/Navbar";
import EditClientForm from "../components/EditClientForm";
export default {
    name:"edit-client-account",
    components:{
        NavBar,
        EditClientForm
    }
}
</script>

<style scoped>
h1{
  color: #f5c19e;
}
</style>