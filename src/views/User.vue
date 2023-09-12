<template>
  <div>
    <div class="ui main container">
      <!-- 検索ボックス -->
      <div class="ui segment">
        <form class="ui form">
          <div class="field">
            <label for="nickname">ユーザー名</label>
            <input v-model="nickname" type="text" id="nickname" name="nickname" placeholder="Nickname" />
          </div>

          <div class="field">
            <label for="aged">年齢</label>
            <div class="inline fields">
              <div class="field">
                <input v-model.number="start" type="text" id="agestart" name="ageStart" />
                <label for="ageStart">歳から</label>
              </div>
              <div class="field">
                <input v-model.number="end" type="text" id="ageend" name="ageEnd" />
                <label for="ageEnd">歳まで</label>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- ユーザー一覧 -->
      <ul class="ui three column grid">
        <template v-for="(item, index) in filteredUsers" :key="index">
          <li class="column">
            <div class="ui card fluid">
              <div class="content">
                <h2 class="header">
                  {{ item.nickname }}
                  <span class="ui green label">{{ item.age }}</span>
                </h2>
                <span class="meta">{{ item.userId }} </span>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
  // import something from '@/components/something.vue';
  import { baseUrl } from "@/assets/config.js";

  // ユーザー一覧画面
  export default {
    name: 'User',

    components: {},

    data() {
      return {
        users: [],
        nickname: "",
        start: 0,
        end: 100,
      };
    },

    computed: {
      // ユーザー情報フィルター
      filteredUsers() {
        return this.users.filter((e) => {
          // nicknameのマッチングチェック
          const matchNickname = this.nickname ? e.nickname?.match(this.nickname) :
            true;

          // ageの範囲チェック
          const withinAgeRange =
            (this.start ? e.age >= this.start : true) &&
            (this.end ? e.age <= this.end : true);

          return matchNickname && withinAgeRange;
        });
      },
    },

    // 画面生成のメソッド
    created: async function() {
      // header指定
      const headers = { Authorization: "mtiToken" };

      try {
        /* global fetch */
        const res = await fetch(baseUrl + "/users", {
          method: "GET",
          headers,
        });

        // レスポンス内容のテキスト
        const text = await res.text();
        // Jsonの形式に直す
        const jsonData = text ? JSON.parse(text) : {};

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        // データユーザーに代入
        this.users = jsonData ?? [];
        
        // 成功した場合コンソール出す
        console.log("success");
        console.log(jsonData);
      }
      // エラーの場合
      catch (e) {
        console.log("エラー");
        console.error(e);
      }
    },
  };
</script>

<style scoped>
  /* このコンポーネントだけに適用するCSSはここに記述する */
</style>
