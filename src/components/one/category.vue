<template>
    <div class="blog_list">
      <div class="blog_list_header">
        <p>文章标题</p>
        <p>作者</p>
        <p>发布时间</p>
        <p>操作</p>
      </div>
	  <div class="blog_box">
		  <div class="blog" v-for="item in content_list_data.content_list">
		    <p>{{item.title}}</p>
		    <p>{{item.author.username}}</p>
		    <p>{{item.addtime | formatDate('yyyy-MM-dd hh:mm:ss')}}</p>
		    <p>
		      <span @click="detail(item._id)">查看详情</span>
		      <span @click="deletes(item._id)">删除</span>
		    </p>
		  </div>
	  </div>
	  <div v-if="content_list_data.content_list.length == 0" style="line-height: 3rem;text-align: center;">暂无数据！</div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="content_list_data.count"
        :page-count="content_list_data.pages"
        :page-size="content_list_data.limit"
        :current-page="content_list_data.page"
        @current-change="jump_page"
        @prev-click="prev_page()"
        @next-click="next_page()"
        style="float: left;margin-left: 35%;margin-top: 1rem;"
		 v-if="content_list_data.content_list.length != 0">
      </el-pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              content_list_data:{
                content_list: [],
              },
              page:1
            }
        },
        created: function () {
          this.content_list();
        },
        methods: {
          content_list(){
            //获取全部文章
            this.$axios({
              method: 'post',
              url: 'http://zhiyun_server.lilongjin.cn/admin/content_list',
              data: this.qs.stringify({
                page:this.page,
                num:0
              })
            }).then((res) => {
              this.content_list_data = res.data;
            }).catch((error) => {
              console.log(error);
            });
          },
          detail(id){
            this.$router.push({name:'detail',query: {id:id}});
          },
          deletes(id){
            this.$confirm('此操作将永久删除该文章并且不可恢复, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios({
                method:'post',
                url:'http://zhiyun_server.lilongjin.cn/api/content/delete',
                data:this.qs.stringify({
                  contentid:id,
                })
              }).then((res) => {
                if(res){
                  this.$message({
                    showClose: true,
                    message: res.data,
                    type: 'success'
                  });
                  this.content_list();
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
          prev_page(){
            this.page--;
            this.content_list();
          },
          next_page(){
            this.page++;
            this.content_list();
          },
          jump_page(ac_page){
            this.page = ac_page;
            this.content_list();
          }
        }
    }
</script>
<style lang="less" scoped>
  @import "../../../static/less/main.less";
  .blog_list {
    width: 100%;
    float: left;
    .blog_list_header{
      width: 100%;
			height: 3rem;
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
	.blog_box{
		width: 100%;
		float: left;
		.blog{
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
		    height: 3rem;
		    line-height: 3rem;
		    text-align: left;
		    text-indent: 1rem;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    white-space: nowrap;
		  }
		  p:last-child{
		    font-size: 12px;
		    span:nth-child(1){
		      color: green;
		      padding-right: .5rem;
		    }
		    span:nth-child(2){
		      color: red;
		    }
		  }
		}
	}
    
  }
</style>
