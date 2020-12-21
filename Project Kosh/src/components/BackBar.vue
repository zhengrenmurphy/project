<template>
  <div class="backbar-container">
    <div v-if="last === 'Log In'">
      <router-link to="/login">
        <button class="back-button"> &lt; {{last}}</button>
      </router-link>
    </div>
    <div v-if="last === 'My Reservations'">
      <router-link to="reservations">
        <button class="back-button"> &lt; {{ last }}</button>
      </router-link>
    </div>
    <div v-if="last === 'Home'">
      <router-link to="/">
        <button class="back-button"> &lt; {{ last }}</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "BackBar",
  props: {
    last: String,
  },
  data() {
    return {};
  },
};
</script>

