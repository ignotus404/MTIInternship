<template>
  <div>
    <div class="ui main container">
      
      <!-- 野菜の画像 -->
      <div class="ui segment">
        <p>テキスト: {{ dairy.text }}</p>
          <TabComponent @tab-selected="handleTabSelection"/>
        
      </div>

      <!-- レシピをここに表示 -->
  

    </div>
    <Footer/>
  </div>
</template>

<script>
 import { baseUrl } from "@/assets/config.js";
import TabComponent from '../UnderTab.vue';



  export default {
    name: 'Home',

    components: {},

    data() {
      // Vue.jsで使う変数はここに記述する
      return {
        dairy: {
          userId: window.localStorage.getItem("userId"),
          dairyFoodName: null,
          text: null,
        },
      };
    },

    computed: {
      // 計算した結果を変数として利用したいときはここに記述する
    },

    created:
    // ユーザー情報取得
    async function() {
      // headerを指定する
      const headers = { Authorization: "mtiToken" };

      // APIをGETする
      // データを送受信する処理
      try {
        /* global fetch */
        const res = await fetch(baseUrl + "/user?userId=" + this.user.userId, {
          method: "GET",
          headers,
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};

        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        this.dairy.dairyFoodName = jsonData.dairyFoodName;
        this.dairy.text = jsonData.text;
      }
      catch (e) {
        console.error(e);
      }
    },


    
  }
</script>

<style scoped>
  /* このコンポーネントだけに適用するCSSはここに記述する */
</style>

