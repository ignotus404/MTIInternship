<template>
  <div>
    <div class="ui main container">
      
      <!-- 野菜データ -->
      <div class="ui segment">
        <div class="ui grid" @click="toggleCookingMethod">
            <div class="eight wide column" style="text-align: left;">ユーザーID{{ userId }}</div>
            <div class="eight wide column" style="text-align: right;">{{ dairy.text }}トマト</div>
        </div>
        <TabComponent @tab-selected="handleTabSelection"/>
        <p v-if="showCookingMethod">調理方法: {{ cookingMethod }}</p>
      </div>

      <div class="ui segment" @click="toggleCookingMethod">
        <p>料理名: {{ recipeName }}</p>
        <p>カロリー : {{ calories }} kcal</p>
        <p>時間 : {{ time }} 分</p>
        <TabComponent @tab-selected="handleTabSelection"/>
        <p v-if="showCookingMethod">調理方法: {{ cookingMethod }}</p>
      </div>

      <div class="ui segment" @click="toggleCookingMethod">
        <p>料理名: {{ recipeName }}</p>
        <p>カロリー : {{ calories }} kcal</p>
        <p>時間 : {{ time }} 分</p>
        <TabComponent @tab-selected="handleTabSelection"/>
        <p v-if="showCookingMethod">調理方法: {{ cookingMethod }}</p>
      </div>

      <div class="ui segment" @click="toggleCookingMethod">
        <p>調理方法: {{ cookingMethod }}</p>
        <p>カロリー : {{ calories }} kcal</p>
        <p>時間 : {{ time }} 分</p>
        <TabComponent @tab-selected="handleTabSelection"/>
      </div>
      
    </div>
    <Footer/>
  </div>
</template>

<script>
import { baseUrl } from "@/assets/config.js";

export default {
    name: 'Home',
    components: {},
    data() {
        return {
            dairy: {
                userId: window.localStorage.getItem("userId"),
                dairyFoodName: null,
                text: null,
            },
            showCookingMethod: false,
            recipeName: 'サンプル料理名',
            calories: 500,
            time: 30,
            cookingMethod: 'ここに調理方法のテキストを追加します。'
        };
    },
    methods: {
        toggleCookingMethod() {
            this.showCookingMethod = !this.showCookingMethod;
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
        const jsonData = text ? JSON.parse(text) : {};

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
  /* このコンポーネントだけに適用するCSSはここに記述する */
</style>

