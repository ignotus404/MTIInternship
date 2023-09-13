<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  },
}
</script>