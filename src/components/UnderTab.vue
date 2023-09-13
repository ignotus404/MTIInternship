
<template>
  <div class="ui secondary pointing green inverted massive menu centered-tab">
    <router-link active-class="active" class="item" exact to="/">Home</router-link>
    <router-link active-class="active" class="item" to="/user">User</router-link>
    <router-link active-class="active" class="item" to="/profile">Profile</router-link>
  </div>
</template>

<script>
export default {
  name: 'UnderTab',
}
</script>

<style scoped>
.centered-tab {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-around;  /* Distribute items evenly */
}

.centered-tab .item {
  color: black;  /* Set text color to black */
}
</style>