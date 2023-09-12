<template>
  <div>
    <div class="ui main container d-flex">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <form class="ui large form" @submit.prevent="submit">
          <!--ID 入力欄-->
          <div rounded class="ui formField">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" placeholder="ID" v-model="user.userId" required disabled>
            </div>
          </div>
          <!--Password 入力欄-->
          <div rounded class="ui formField">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" placeholder="Password" v-model="user.password">
            </div>
          </div>
          <!--Nickname 入力欄-->
          <div rounded class="ui formField">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input type="text" placeholder="Nickname" v-model="user.nickname">
            </div>
          </div>
          <!--Age 入力欄-->
          <div rounded class="ui formField">
            <div class="ui left icon input">
              <i class="calendar icon"></i>
              <input type="text" placeholder="Age" v-model.number="user.age">
            </div>
          </div>
          <!--更新ボタン-->
          <button class="ui huge green button" type="submit">
            更新
          </button>
        </form>
      </div>
      <!--退会ボタン-->
      <button @click="deleteUser()" class="ui fluid grey button" type="submit">
        退会
      </button>
    </div>
  </div>
</template>

<script>
  // 必要なものはここでインポートする
  // @は/srcの同じ意味です
  // import something from '@/components/something.vue';
  import { baseUrl } from "@/assets/config.js";

  export default {
    name: 'Profile',

    components: {},

    data() {
      // Vue.jsで使う変数はここに記述する
      return {
        user: {
          userId: window.localStorage.getItem("userId"),
          password: null,
          nickname: null,
          age: null,
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

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        // レスポンスをそれぞれ返す
        this.user.nickname = jsonData.nickname;
        this.user.age = jsonData.age;
      }
      catch (e) {
        console.error(e);
      }
    },


    methods: {
      async submit() {
        // headerを指定する
        const headers = { Authorization: "mtiToken" };
        
        // リクエストボディを指定する
        const {userId, password, nickname, age} = this.user;
        const requestBody = {
          userId,
          password,
          nickname,
          age,
        };
  
        try {
          /* global fetch */
          const res = await fetch(baseUrl + "/user", {
            method: "PUT",
            body: JSON.stringify(requestBody),
            headers,
          });
  
          const text = await res.text();
          const jsonData = text ? JSON.parse(text) : {};
  
          // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
          if (!res.ok) {
            const errorMessage =
              jsonData.message ?? "エラーメッセージがありません";
            throw new Error(errorMessage);
          }
  
          // 成功時の処理
          console.log(jsonData);
          console.log("success");
        } catch (e) {
          console.error(e);
          // エラー時の処理
        } 
      },
      async deleteUser() {
        // headerを指定する
        const headers = { Authorization: "mtiToken" };
        
        // リクエストボディを指定する
        const {userId, password, nickname, age} = this.user;
        const requestBody = {
          userId,
          password,
          nickname,
          age,
        };
  
        try {
          /* global fetch */
          const res = await fetch(baseUrl + "/user?userId=" + this.user.userId, {
            method: "DELETE",
            body: JSON.stringify(requestBody),
            headers,
          });
  
          const text = await res.text();
          const jsonData = text ? JSON.parse(text) : {};
  
          // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
          if (!res.ok) {
            const errorMessage =
              jsonData.message ?? "エラーメッセージがありません";
            throw new Error(errorMessage);
          }
  
          // レスポンス内容を表示
          console.log(jsonData);
          console.log("success");
          
          // ログイン画面に遷移
          this.$router.push({ name: "Login" });
        } catch (e) {
          console.error(e);
          // エラー時の処理
        } 
      },
    },
  }
</script>

<style scoped>
  /* このコンポーネントだけに適用するCSSはここに記述する */
</style>
