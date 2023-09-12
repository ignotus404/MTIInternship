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
      // isMyArticle(id) {}, // 自分の記事かどうかを判定する
      // async getArticles() {}, // 記事一覧を取得する
      // async postArticle() {}, // 記事を作成する
      // async getSearchedArticles() {}, // 記事を検索する
      // async deleteArticle(article) {}, // 記事を削除する
      // convertToLocaleString(timestamp) {} // timestampをLocaleDateStringに変換する
    }
  }
</script>

<style scoped>
</style>
