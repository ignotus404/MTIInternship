<template>
  <div class="ui pointing massive menu centered inverted" style="background-color: #619077;">
    <div></div>
    <router-link active-class="active" class="item" exact to="/">Home</router-link>
    <router-link active-class="active" class="item" to="/createDairy">Post</router-link>
    <router-link active-class="active" class="item" to="/diaries">Dairy</router-link>
  </div>
</template>

<script>
  export default {
    name: 'UnderTab',
  }
</script>

<style scoped>
  .centered {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
  }
</style>
