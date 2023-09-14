<template>
  <div>
    <div class="ui main container">
      <ul class="one ui column row">
        <template v-for="(item, index) in diaries" :key="index">
          <div class="ui card fluid">
            <div class="content">
              <h2 class="header">
                {{ item.userId }}
                <span class="ui right floated">{{ item.foodName }}</span>
              </h2>
              <span class="meta">{{ item.text }}</span>
              <button @click="ChangeFavIcon(item.isLike, index)" class="ui labeled button right floated" tabindex="0" v-if="!item.isLike">
                <div class="ui button" id="generated-id-1694596057258-19vo88pbi">
                  <i class="heart icon"></i> いいね
                </div>
              </button>
              <button @click="ChangeFavIcon(item.isLike, index)" class="ui labeled button right floated" tabindex="0" v-if="item.isLike">
                <div class="ui red button" id="generated-id-1694596057258-pfvbr7cca">
                  <i class="heart icon"></i> いいね
                </div>
              </button>
            </div>
            <div class="content">
              <span class="meta right floated">{{ item.updateDate }}</span>
            </div>
          </div>
        </template>
      </ul>
    </div>
  </div>
</template>
https://ap-northeast-1.console.aws.amazon.com/cloud9/ide/61554f598ac64e769d979ad69bb5c3db
<script>
  // APIのbaseUrlをインポートする
  import { baseUrl } from "@/assets/config.js";

  export default {
    name: "DailyViewer",

    data() {
      return {
        diaries: [

        ],
      };
    },

    computed: {},

    mounted() {
      window.onload = this.getRequestTemplate();
    },

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
          this.diaries = jsonData ?? [];


          this.diaries.forEach((diaries) => {
            const Time = new Date(diaries.updateDate / 1000);
            diaries.updateDate = Time.toLocaleDateString();
            diaries.isLike = false;
          });
        }
        catch (e) {
          console.error(e);
          // エラー時の処理
        }
        
        console.log(`diaries:${JSON.stringify(this.diaries)}`);
      },

      ChangeFavIcon(bool, index) {
        console.log("トグル起動");
        console.log(`${index}${JSON.stringify(this.diaries)}`);
        this.diaries[index].isLike = !this.diaries[index].isLike;
        if (this.diaries[index].isLike != bool) {
          console.log("error");
        }
        console.log(bool);
        console.log(this.diaries[index].isLike);
      }
    },
  };
</script>

<style scoped></style>
