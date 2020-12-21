<template>
  <div class="main">

    <UserProfile/>
    
  </div>
</template>

<script>
import UserProfile from "../components/UserProfile.vue";
import AuthorFreetList from "../components/AuthorFreetList.vue";

export default {
  name: "profile",
  components: {
    UserProfile,
    AuthorFreetList
}
};
</script>
