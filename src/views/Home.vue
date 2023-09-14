<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
      </div>
    </div>
  </div>
</template>

<script>
  // import { baseUrl } from '@/assets/config.js';

  // ホーム画面
  export default {
    name: 'Home',

    components: {},

    data() {
      // Vue.jsで使う変数はここに記述する
      return {
        post: {
          text: null,
          category: null,
        },
        search: {
          userId: null,
          category: null,
          start: null,
          end: null,
        },
        articles: [],
        iam: null,
      };
    },
    computed: {},

    methods: {
        toggleCookingMethod0() {
            this.showCookingMethod0 = !this.showCookingMethod0;
        },
   
        toggleCookingMethod1() {
            this.showCookingMethod1 = !this.showCookingMethod1;
        },
   
        toggleCookingMethod2() {
            this.showCookingMethod2 = !this.showCookingMethod2;
        }
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
        console.log(text)
        const jsonData = text ? JSON.parse(text) : {};
        console.log(jsonData)

        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        this.dairy.dairyFoodName = jsonData.dairyFoodName;
        this.dairy.text = jsonData.text;
        //this.Cook=jsonData.cookみたいなのがいろいろ入ってくる
        
      }
      catch (e) {
        console.error(e);
      }
    },


    
  }
</script>

<style scoped>
</style>
