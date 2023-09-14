<template>
  <div id="app">
    <div class="content">
      <Header />
      <div class="main-content">
        <router-view />
      </div>
    </div>
    <Footer />
    <UnderTab />
  </div>
</template>

<script>
  import { RouterView } from 'vue-router';
  import Header from '@/components/Header.vue';
  import UnderTab from '@/components/UnderTab.vue';
  import Footer from '@/components/Footer.vue';

  export default {
    name: 'App',
    components: {
      Header,
      UnderTab,
      Footer
    },
  }
</script>

<style>
  .main-content {
    padding-bottom: 60px;
    /* Adjust this value based on the height of your tab */
  }
  
  .content {
    min-height: 90.5vh;
  }
</style>