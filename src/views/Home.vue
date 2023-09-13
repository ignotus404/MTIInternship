<template>
  <div>
    <div class="ui main container">
      <ul class="one ui column row">
        <template v-for="(item, index) in dairies" :key="index">
          <div class="ui card fluid">
            <div class="content">
              <h2 class="header">
                {{ item.Title }}
                <span class="ui right floated">{{ item.Food }}</span>
              </h2>
              <span class="meta">{{ item.Text }}</span>
              <button @click="ChangeFavIcon(item.isLike)" class="ui labeled button right floated" tabindex="0" v-if="!item.isLike">
                <div class="ui button" id="generated-id-1694596057258-19vo88pbi">
                  <i class="heart icon"></i> いいね
                </div>
              </button>
              <button @click="ChangeFavIcon(item.isLike)" class="ui labeled button right floated" tabindex="0" v-if="item.isLike">
                <div class="ui red button" id="generated-id-1694596057258-pfvbr7cca">
                  <i class="heart icon"></i> いいね
                </div>
              </button>
            </div>
            <div class="content">
              <span class="meta right floated">{{ item.UpdateTime }}</span>
            </div>
          </div>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
// APIのbaseUrlをインポートする
import { baseUrl } from "@/assets/config.js";

export default {
  name: "Template",

  data() {
    return {
      dairies: [
        {
          Title: "hogehoge",
          Food: "トマト",
          Text:"トマトおいしい",
          isLike:false,
          UpdateTime: "2023/09/13"
        },  
        {
          Title: "foo",
          Food: "ほうれん草",
          Text:"ほうれん草おいしい",
          isLike:true,
          UpdateTime: "2023/09/12"
        },
      ],  
    };
  },

  computed: {},

  methods: {
    async getRequestTemplate() {
      // headerを指定する
      const headers = { Authorization: "mtiToken" };

      // APIをGETする
      // データを送受信する処理
      try {
        /* global fetch */
        const res = await fetch(baseUrl + "/dairies", {
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

        // 成功時の処理
        console.log(jsonData);
      } catch (e) {
        console.error(e);
        // エラー時の処理
      }
    },
    
    ChangeFavIcon(i)
    {
      this.i = !this.i;
      console.log(i);
    }
  },
};
</script>

<style scoped></style>
