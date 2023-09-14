<template>
  <div>
    <div class="ui main container">
      
      <!-- 野菜データ -->
      <div class="ui segment">
        <div class="ui grid" @click="toggleCookingMethod">
            <div class="eight wide column" style="text-align: left;">{{ userId }}</div>
            <div class="eight wide column" style="text-align: right;">{{ dairy.text }}</div>
        
        <img :src="vegetableImage" alt="Vegetable Image" class="vegetable-image" />
        </div>

      </div>

      <div class="ui segment" @click="toggleCookingMethod0">
        <p>料理名: {{ recipeName0 }}</p>
        <img :src="vegetableImage0" alt="Vegetable Image" class="vegetable-image0" v-if="showCookingMethod0"/>
        <p v-if="showCookingMethod0">カロリー : {{ calories0 }} kcal</p>
        <p v-if="showCookingMethod0">時間 : {{ time0 }} 分</p>
        <TabComponent @tab-selected="handleTabSelection"/>
        <p v-if="showCookingMethod0">調理方法: {{ cookingMethod0 }}</p>
      </div>

      <div class="ui segment" @click="toggleCookingMethod1">
        <p>料理名: {{ recipeName1 }}</p>
        <img :src="vegetableImage1" alt="Vegetable Image" class="vegetable-image1" v-if="showCookingMethod1"/>
        <p v-if="showCookingMethod1">カロリー : {{ calories1 }} kcal</p>
        <p v-if="showCookingMethod1">時間 : {{ time1 }} 分</p>
        <TabComponent @tab-selected="handleTabSelection"/>
        <p v-if="showCookingMethod1">調理方法: {{ cookingMethod1 }}</p>
      </div>

      <div class="ui segment" @click="toggleCookingMethod2">
        <p>料理名: {{ recipeName2 }}</p>
        <img :src="vegetableImage2" alt="Vegetable Image" class="vegetable-image2" v-if="showCookingMethod2"/>
        <p v-if="showCookingMethod1">カロリー : {{ calories2 }} kcal</p>
        <p v-if="showCookingMethod1">時間 : {{ time2 }} 分</p>
        <TabComponent @tab-selected="handleTabSelection"/>
        <p v-if="showCookingMethod2">調理方法: {{ cookingMethod2 }}</p>
      </div>
      

    </div>
    <Footer/>
  </div>
</template>

<script>

import { baseUrl } from "../assets/config.js";
import vegetableImage from '@/views/image/broccoli.png';
import vegetableImage0 from '@/views/image/broccoli0.png';
import vegetableImage1 from '@/views/image/broccoli1.png';
import vegetableImage2 from '@/views/image/broccoli2.png';

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
            vegetableImage,
            vegetableImage0,
            vegetableImage1,
            vegetableImage2,
            showCookingMethod0: false,
            recipeName0: '無限ブロッコリー',
            calories0: 67,
            time0: 5,
            cookingMethod0: 'ブロッコリーはよく洗い、食べやすい大きさに切る。耐熱容器に入れてふんわりとラップをして、600wのレンジで2分加熱する。水分切ってA ブロッコリー1株、塩昆布大さじ3、マヨネーズ大さじ2、ごま大さじ1、すりごま大さじ1、めんつゆ(2倍濃縮)小さじ1とよく和える。',
            showCookingMethod1: false,
            recipeName1: 'ブロッコリーのおかかマヨサラダ',
            calories1: 89,
            time1: 10,
            cookingMethod1: 'ブロッコリーは小房に切り分けます。茎は厚めに皮をむき、食べやすい大きさに切ります。【作り方】ブロッコリーのおかかマヨサラダ耐熱ボウルにブロッコリーを入れ、濡らしたクッキングペーパーをかぶせてラップをかけ、レンジ600Wで2分加熱します。マヨネーズ、しょうゆを混ぜ合わせ、ブロッコリーを加えて全体を和えます。ブロッコリーのおかかマヨサラダかつおぶし、ごまを加え、混ぜ合わせて完成です。',
            showCookingMethod2: false,
            recipeName2: 'ブロッコリーのペペロンチーノ風',
            calories2: 70,
            time2: 10,
            cookingMethod2: 'ブロッコリーは小房に分け、ブロッコリーの茎の部分は乱切りにし、別々のの耐熱容器に入れる。ふんわりとラップをかけ、レンジ（６００W）で約２分ずつ加熱し、水気を切る。フライパンにＡを合わせて弱火にかけ、にんにくと赤唐辛子がきつね色になったら一度取り出す。フライパンを中火にかけ、①を入れて炒め、ドレッシングを加えてからめ合わせる.器に③を盛りつけ、②を散らす。'
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
  /* このコンポーネントだけに適用するCSSはここに記述する */
.vegetable-image {
    width: 60%;  /* 画像の幅を親要素の幅に合わせて設定 */
    height: auto; /* 高さは自動的にアスペクト比を保持 */
    display: block; /* 画像をブロック要素として表示 */
    margin: 0 auto; /* 画像を中央に配置 */
}
.vegetable-image0 {
    width: 30%;  /* 画像の幅を親要素の幅に合わせて設定 */
    height: auto; /* 高さは自動的にアスペクト比を保持 */
    display: block; /* 画像をブロック要素として表示 */
    margin-right: auto; /* 画像を中央に配置 */
}
.vegetable-image1 {
    width: 30%;  /* 画像の幅を親要素の幅に合わせて設定 */
    height: auto; /* 高さは自動的にアスペクト比を保持 */
    display: block; /* 画像をブロック要素として表示 */
    margin-right: auto; /* 画像を中央に配置 */
}
.vegetable-image2 {
    width: 30%;  /* 画像の幅を親要素の幅に合わせて設定 */
    height: auto; /* 高さは自動的にアスペクト比を保持 */
    display: block; /* 画像をブロック要素として表示 */
    margin-right: auto; /* 画像を中央に配置 */
}

</style>


