<template>
  <div class="sign-up">
    <NavBar />
    <BackBar :last="'Log In'"/>
    <div class="sign-up-title">
    <h1>Sign Up</h1>
    </div>
    <SignUpForm />
  </div>
</template>

<script>
import SignUpForm from "../components/SignUpForm";
import NavBar from "../components/Navbar";
import BackBar from "../components/BackBar";
export default {
  name: "signup",
  components: {
    SignUpForm,
    NavBar, 
    BackBar
  }
};
</script>

<style scoped>
h1 {
  color: #f5c19e;
}
</style>