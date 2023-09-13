<template>
  <div class="headerFrame">

    <div class="ui sakuijiFrame">
      <!--サービス名-->
      <router-link active-class="active" class="sakuiji" exact to="/">サクイジ</router-link>
    </div>

    <div class="ui" v-if="isMenuNeeded">
      <!--ポイントと通知-->
      <div class="headerBottomFrame">
        <!--保時ポイント-->
        <div class="pointFrame">
          <i class="plus icon pointIcon"></i>
          <p class="pointText">3000p</p>
        </div>

        <!--通知アイコン-->
        <div class="notificationPositon">
          <!--TODO-->
          <router-link active-class="active" class="item" to="/createDairy">
            <i class="big bell outline icon headerNotifition"></i>
          </router-link>
        </div>

      </div>
    </div>

  </div>


</template>
<script>
  export default {
    name: 'Header',

    components: {},

    data() {},

    computed: {
      // 計算した結果を変数として利用したいときはここに記述する
      isMenuNeeded() {
        return this.$route.name !== 'Login';
      },
    },

    methods: {},
  }
</script>

<style scoped>
  .headerFrame {
    display: flex;
    flex-direction: column;
    padding: 30px 20px 10px 20px;
    margin-bottom: 30px;
    background-color: #ffffff;
  }

  .sakuijiFrame {
    margin-bottom: 10px;
  }

  .sakuiji {
    font-size: 24px;
    font-weight: 600;
    color: #424242;
    text-align: center;
    margin: auto 0;
  }

  .headerBottomFrame {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }

  .pointFrame {
    background-color: #DFE9EC;
    padding: 10px 20px;
    border-color: #DFE9EC;
    border-radius: 10px;
    display: flex;
    flex-direction: row;

    justify-content: center;
    align-items: center;
  }

  .pointIcon {
    color: #424242;
    width: 24px;
    height: 24px;
    margin: auto 0;
    display: inherit !important;
    justify-content: center;
    align-items: center;
  }

  .pointText {
    font-size: 20px;
    font-weight: 600;
    color: #424242;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .notificationPositon {
    margin: auto 0;
    display: inherit !important;
    justify-content: center;
    align-items: center;
  }

  .headerNotifition {
    color: #424242;
    margin: auto 0;
  }
</style>
