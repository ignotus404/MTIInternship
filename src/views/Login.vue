<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <form class="ui large form" @submit.prevent="submit">
          
          <!--ID 入力欄-->
          <div rounded class="ui formField">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" placeholder="ID" v-model="user.userId">
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
          <div rounded class="ui formField" v-if="!isLogin">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input type="text" placeholder="Nickname" v-model="user.nickname">
            </div>
          </div>
          <!--Age 入力欄-->
          <div rounded class="ui formField" v-if="!isLogin">
            <div class="ui left icon input">
              <i class="calendar icon"></i>
              <input type="text" placeholder="Age" v-model.number="user.age">
            </div>
          </div>
          <!--新規登録ボタン-->
          <button class="ui huge green button" type="submit">
            {{ submitText }}
          </button>
          
        </form>
      </div>
      <!--ログインボタン-->
      <button @click="taggleMode()" class="ui fluid grey button" type="submit">
        {{ taggleText }}
      </button>
    </div>
  </div>
</template>

<script>
  // @は/srcの同じ意味です
  // import something from '@/components/something.vue';
  import { baseUrl } from "@/assets/config.js";
  
  // headerを指定する
  const headers = { Authorization: "mtiToken" };

  export default {
    name: 'Login',

    components: {
      // 読み込んだコンポーネント名をここに記述する
    },

    data() {
      // Vue.jsで使う変数はここに記述する
      return {
        isLogin: true,

        user: {
          userId: null,
          password: null,
          nickname: null,
          age: null,
        },
      };
    },

    computed: {
      // 計算した結果を変数として利用したいときはここに記述する
      submitText() {
        // 上側のボタンを返す
        return this.isLogin ? 'ログイン' : '新規登録';
      },

      taggleText() {
        // 下側のボタン
        return this.isLogin ? '新規登録' : 'ログイン';
      },
    },

    methods: {
      // Vue.jsで使う関数はここで記述する
      taggleMode() {
        this.isLogin = !this.isLogin
      },

      async submit() {
        // ログイン処理
        if (this.isLogin) {
          // リクエストボディを指定する
          const requestBody = {
            userId: this.user.userId,
            password: this.user.password,
          };

          try {
            /* global fetch */
            const res = await fetch(baseUrl + "/user/login", {
              method: "POST",
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

            // ブラウザに保存
            window.localStorage.setItem('token', jsonData.token);
            window.localStorage.setItem('userId', this.user.userId);

            // ブラウザに保存した内容を表示
            window.localStorage.getItem('token');
            window.localStorage.getItem('userId');

            // リクエスト内容表示
            console.log(jsonData);

            // ホームに遷移
            this.$router.push({ name: 'Home' });
          }
          catch (e) {
            console.error(e);
            // エラー時の処理
            console.log(requestBody);
          }
          console.log("login")
          return
        }
        // 新規登録処理
        // リクエストボディを指定する
        const requestBody = {
          userId: this.user.userId,
          password: this.user.password,
          nickname: this.user.nickname,
          age: this.user.age,
        };

        try {
          /* global fetch */
          const res = await fetch(baseUrl + "/user/signup", {
            method: "POST",
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

          // ブラウザに保存
          window.localStorage.setItem('token', jsonData.token);
          window.localStorage.setItem('userId', this.user.userId);

          // ブラウザに保存した内容を表示
          window.localStorage.getItem('token');
          window.localStorage.getItem('userId');

          // リクエスト内容表示
          console.log(jsonData);

          // ホームに遷移
          this.$router.push({ name: 'Home' });
        }
        // エラー時の処理
        catch (e) {
          console.error(e);
          // リクエスト内容表示
          console.log(requestBody);
        }
        console.log("signup")
      }
    },
  }
</script>

<style scoped>
  /* このコンポーネントだけに適用するCSSはここに記述する */
</style>
