<template>
  <div class="system_msg">
    <p>主机名称：{{system_msg.hn}}</p>
    <p>系统类型：{{system_msg.os_type}}</p>
    <p>CPU架构：{{system_msg.os_arch}}</p>
    <p>CPU型号：{{system_msg.cpu_model}}</p>
    <p>内存信息：{{system_msg.os_total}}</p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        system_msg:''
      }
    },
    created: function () {
      //获取系统信息
      this.$axios({
        method: 'post',
        url: 'http://zhiyun_server.lilongjin.cn/admin/system',
      }).then((res) => {
        this.system_msg = res.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    methods: {},
  }
</script>
<style lang="less" scoped>
  @import "../../../static/less/main.less";

  .system_msg {
    width: 100%;
    float: left;
    p{
      width: 100%;
      line-height: 3rem;
      font-size: .9rem;
      float: left;
      text-indent: 1rem;
      color:@color_lan;
      &:nth-child(1){
        margin-top: 1rem;
      }
    }
  }
</style>
