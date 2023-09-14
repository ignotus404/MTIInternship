<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui inputArea">

        <!--画像-->
        <div class="column imgFrame">
          <div class="labelContaier">
            <p class="label">画像</p>
            <p class="requiredIcon"> *</p>
          </div>

          <input type="file" ref="preview" @change="uploadFile" v-if="!isImgUrl" />
          <p v-if="isError" style="color: #ff0000; margin-top: 5px;">画像を選択してください</p>

          <!--画像表示-->
          <div v-if="isImgUrl">
            <img v-bind:src="imgUrl" class="imgContent" />
          </div>

          <!--画像削除ボタン-->
          <div v-if="isImgUrl" class="imgDeleteButtonPosition">
            <div @click="switchIsImg()" class="imgDeleteButton" submit="type">
              <div class="row imgDeleteContnet">
                <p class="imgDeleteButtonText">削除</p>
              </div>
            </div>
          </div>
        </div>

        <!--テキスト-->
        <div class="column">
          <p class="label">
            テキスト
          </p>
          <textarea id="textAreaBox" class="textArea" v-model="diary.text" placeholder="投稿文を書いてください"></textarea>
        </div>


        <div class="createButtonPosition">
          <button @click="createDiary()" class="imgDeleteButton" submit="type">
            <div class="row imgDeleteContnet">
              <p class="imgDeleteButtonText">投稿</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 日記投稿画面
  import { baseUrl } from "@/assets/config.js";

  // headerを指定する
  const headers = { Authorization: "mtiToken" };

  export default {
    name: 'CreateDiary',

    components: {
    },

    data() {
      return {
        isImgUrl: false,
        imgUrl: null,
        isError: false,
        user: {
          userId: "",
          foodName: "",
        },
        diary: {
          userId: "RinaKato",
          dairyFoodName: "hogehoge",
          text: "",
        }
      }
    },
    computed: {},

    methods: {

      // 写真アップロード
      uploadFile() {
        const file = this.$refs.preview.files[0];
        this.imgUrl = URL.createObjectURL(file);
        console.log(this.imgUrl);
        this.isImgUrl = true;
      },

      switchIsImg() {
        this.isImgUrl = false;
        this.imgUrl = null;
        this.isError = false;
      },

      async createDiary() {
        if (this.isImgUrl == true) {
          // リクエストボディを指定する
          const requestBody = {
            userId: this.diary.userId,
            foodName: this.diary.dairyFoodName,
            text: this.diary.text,
          };

          try {
            const res = await fetch(baseUrl + "/dairy", {
              method: "POST",
              body: JSON.stringify(requestBody),
              headers,
            });

            console.log("レスポンス");
            console.log(res);

            // レスポンスを適当な型に変換
            const text = await res.text();
            const jsonData = text ? JSON.parse(text) : {};

            // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
            if (!res.ok) {
              const errorMessage =
                jsonData.message ?? "エラーメッセージがありません";
              throw new Error(errorMessage);
              console.log("エラーメッセージ");
            }

            // 成功時の処理
            console.log("レスポンス2");
            console.log(jsonData);

            // 日記一覧画面に遷移
            this.$router.push({ name: 'diaries' });
            console.log("最後");
          }
          catch (e) {
            console.log("エラー");
            console.error(e);
            // エラー時の処理
          }
        } else {
          this.isError = true;
        }
      },
    },
  }
</script>

<style scoped>
  .inputArea {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    max-width: 1200px;
    padding: 20px;
    /*margin:  0 15px;*/
  }

  .imgFrame {
    margin-bottom: 20px;
  }

  .labelContaier {
    display: flex;
  }

  .label {
    font-size: 15px;
    font-weight: 600;
    color: #424242;
  }

  .requiredIcon {
    color: red;
  }

  .imgContent {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
    margin-bottom: 10px;
  }

  .imgDeleteButtonPosition {
    display: flex;
    justify-content: right;
  }

  .imgDeleteButton {
    background-color: #619077;
    border-color: #619077;
    border-radius: 10px;
    width: 100px;
    height: 40px;
  }

  .imgDeleteContnet {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .imgDeleteIcon {
    color: #424242;
    width: 24px;
    height: 24px;
    margin: auto 0;
  }

  .imgDeleteButtonText {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    height: 40px;
    align-items: center;
    display: inline-flex;
  }

  .textArea {
    padding: 10px;
    width: 100%;
    height: 100px;
  }

  .createButtonPosition {
    margin-top: 10px;
    display: flex;
    justify-content: right;
  }
</style>
