<template>
  <div class="tab-container">
    <div
      v-for="item in tabs"
      :key="item"
      class="tab"
      @click="selectTab(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { name: "ホーム", path: "/" },
        { name: "投稿", path: "/post" },
        { name: "日記", path: "/diary" },
        { name: "設定", path: "/settings" }
      ]
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
.tab-container {
  display: flex;
  justify-content: space-between;
  height: 30px;
  
}

.tab {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  text-align: center;
  cursor: pointer;
}

.tab:hover {
  background-color: #ddd;
}
</style>