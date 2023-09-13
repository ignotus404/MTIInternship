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
      </div>

      <div class="ui segment" @click="toggleCookingMethod0">
        <p>料理名: {{ recipeName0 }}</p>
        <p>カロリー : {{ calories0 }} kcal</p>
        <p>時間 : {{ time0 }} 分</p>
        <TabComponent @tab-selected="handleTabSelection"/>
        <p v-if="showCookingMethod0">調理方法: {{ cookingMethod0 }}</p>
      </div>

      <div class="ui segment" @click="toggleCookingMethod1">
        <p>料理名: {{ recipeName1 }}</p>
        <p>カロリー : {{ calories1 }} kcal</p>
        <p>時間 : {{ time1 }} 分</p>
        <TabComponent @tab-selected="handleTabSelection"/>
        <p v-if="showCookingMethod1">調理方法: {{ cookingMethod1 }}</p>
      </div>

      <div class="ui segment" @click="toggleCookingMethod2">
        <p>料理名: {{ recipeName2 }}</p>
        <p>カロリー : {{ calories2 }} kcal</p>
        <p>時間 : {{ time2 }} 分</p>
        <TabComponent @tab-selected="handleTabSelection"/>
        <p v-if="showCookingMethod2">調理方法: {{ cookingMethod2 }}</p>
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
            showCookingMethod0: false,
            recipeName0: '生野菜',
            calories0: 70,
            time0: 1,
            cookingMethod0: '水で洗うだけ',
            showCookingMethod1: false,
            recipeName1: '温野菜',
            calories1: 60,
            time1: 3,
            cookingMethod1: 'ハサミで食べれるサイズに切りとり、電子レンジで600wで１分、お好みで塩をかけて完成です',
            showCookingMethod2: false,
            recipeName2: 'サンプル',
            calories2: 1000,
            time2: 120,
            cookingMethod2: '卵とトマトを一緒にフライパンで炒める、真っ黒になるまで炒めます。トマトは切ってください'
        };
    },
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

