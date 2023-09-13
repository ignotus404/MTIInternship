
<template>
  <div id="app">
    <Menu />
    <div class="main-content">
      <router-view/>
    </div>
    <UnderTab/>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Menu from '@/components/Menu.vue';
import UnderTab from '@/components/UnderTab.vue';

export default {
  name: 'App',
  components: {
    Menu,
    UnderTab
  },
}
</script>

<style>
.main-content {
  padding-bottom: 60px;  /* Adjust this value based on the height of your tab */
}
</style>
