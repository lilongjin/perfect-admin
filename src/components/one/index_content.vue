<template>
    <div class="admin_index">
      <div class="welcome">
        <img src="../../../static/img/logo2.png" alt="">
        <p>欢迎来到至臻珠宝小程序后台管理系统！</p>
      </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        created: function () {

        },
        methods: {

        },
    }
</script>
<style lang="less" scoped>
  @import "../../../static/less/main.less";
  .admin_index{
    width: 100%;
    float: left;
    .welcome{
      width: 100%;
      float: left;
      img{
        width: 10%;
        float: left;
        margin-left: 45%;
        margin-top: 8rem;
      }
      p{
        width: 100%;
        float: left;
        margin-top: 6rem;
				margin-bottom: 6rem;
        font-size: 26px;
        text-align: center;
      }
    }
  }
</style>
