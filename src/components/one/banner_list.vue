<template>
  <div class="banner_list">
    <div class="banner_list_header">
      <p>预览</p>
      <p>ID</p>
      <p>添加时间</p>
      <p>操作</p>
    </div>
    <div class="banner" v-for="item in banner_data">
      <p>
        <img v-bind:src="item.url" alt="">
      </p>
      <p>{{item._id}}</p>
      <p>{{item.addTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</p>
      <p>
        <span @click="deletes(item._id)">删除</span>
      </p>
    </div>
    <div class="new_banner">
      <el-upload
        class="upload-demo"
        action="http://zhiyun_server.lilongjin.cn/admin/banner_add"
        accept=".png,.jpg"
        :limit="3"
        :file-list="fileList"
        :on-success="uploads"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        banner_data:[],
        centerDialogVisible: false,
        fileList: []
      }
    },
    created: function () {
      this.banner_list();
    },
    methods: {
      banner_list(){
        //获取全部轮播图
        this.$axios({
          method: 'post',
          url: 'http://zhiyun_server.lilongjin.cn/admin/banner_list',
        }).then((res) => {
          this.banner_data = res.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      deletes(id){
        this.$confirm('此操作将永久删除该轮播图并且不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method:'post',
            url:'http://zhiyun_server.lilongjin.cn/admin/banner_delete',
            data:this.qs.stringify({
              bannerid:id,
            })
          }).then((res) => {
            if(res){
              this.$message({
                showClose: true,
                message: res.data,
                type: 'success'
              });
              this.banner_list();
            }else{
              this.$message({
                showClose: true,
                message: "删除失败，该内容不存在",
                type: 'error'
              });
            }
          }).catch((error) => {
            console.log(error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      uploads(res){
        if(res == 0){
          this.$message({
            showClose: true,
            message: "上传服务器成功",
            type: 'success'
          });
          this.banner_list();
        }else{
          this.$message({
            showClose: true,
            message: "上传服务器失败，超出轮播图数量上限",
            type: 'error'
          });
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../static/less/main.less";
  .banner_list {
    width: 100%;
    float: left;
    position: relative;
    .banner_list_header{
      width: 100%;
      float: left;
      border-bottom: 1px solid @color_bg;
      p{
        width: 25%;
        float: left;
        height: 3rem;
        line-height: 3rem;
        text-align: left;
        text-indent:1rem;
      }
    }
    .banner{
      width: 100%;
      float: left;
      border-bottom: 1px solid @color_bg;
      cursor: pointer;
      &:hover{
        color: @color_lan;
      }
      p{
        width: 25%;
        float: left;
        height: 10rem;
        line-height: 10rem;
        text-align: left;
        text-indent: 1rem;
        img{
          width: 80%;
          height: 9rem;
          float: left;
          margin-left: 1rem;
          margin-top: .5rem;
        }
      }
      p:last-child{
        font-size: 12px;
        span{
          color: red;
        }
      }
    }
    .new_banner{
      width: 50%;
      float: left;
      margin-left: 1rem;
      margin-top: 2rem;
      margin-bottom: 5rem;
    }
  }
</style>
