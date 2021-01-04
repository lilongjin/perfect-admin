<template>
  <div>
    <div class="content_header">
      <span>{{header_title}}</span>
    </div>
    <div class="blog_list">
      <div class="blog_list_header">
        <p>商品名称</p>
        <p>预览图片</p>
        <p>商品价格</p>
        <p>发布时间</p>
		<p>上架状态</p>
        <p>操作</p>
      </div>
      <div class="blog_box">
        <div class="blog" v-for="item in goods_list">
          <p>{{item.title}}</p>
          <p>
            <img v-if="item.img_list.length != 0" :src="item.img_list[0].url" alt="" style="width: 100px;height: 100px;margin-top: 10px">
            <span v-if="item.img_list.length == 0">暂无</span>
          </p>
          <p>￥{{item.price}}元</p>
          <p>{{item.addtime | formatDate('yyyy-MM-dd hh:mm:ss')}}</p>
		  <p>
			  <span v-if="item.show_status">已上架</span>
			  <span v-if="!item.show_status">未上架</span>
		  </p>
          <p>
            <span @click="deletes(item._id)">取消推荐商品</span>
          </p>
        </div>
      </div>
      <div v-if="goods_list.length == 0" style="line-height: 3rem;text-align: center;">暂无数据！</div>
    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        goods_list: [],
        header_title: "",
        edit_goods_id:'',
        banner_status: false,
      }
    },
    created: function () {
      this.content_list();
      var ac_title = sessionStorage.getItem("ac_title");
      if (ac_title && ac_title != "") {
        this.header_title = ac_title;
      } else {
        this.header_title = "后台首页";
      };
    },
    methods: {
      content_list() {
        //获取商品列表
        this.$axios({
          method: 'post',
          url: 'https://perfect.lilongjin.cn/admin/goods/banner_goods',
          data: this.qs.stringify({})
        }).then((res) => {
          this.goods_list = res.data.goods_list;
        }).catch((error) => {
          console.log(error);
        });
      },
      deletes(id) {
        this.$confirm('确认取消当商品在首页轮播图位置展示?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'post',
            url: 'https://perfect.lilongjin.cn/admin/goods/banner_goods_del',
            data: this.qs.stringify({
             goods_id: id,
            })
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
                duration: 2000,
                message: res.data.message,
                type: 'success'
              });
              this.content_list()
            } else {
              this.$message({
                showClose: true,
                duration: 2000,
                message: res.data.message,
                type: 'error'
              });
            }
            ;
          }).catch((error) => {
            console.log(error);
          });
        }).catch(() => {
        });
      },
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../static/less/main.less";
  /deep/.el-upload-list{
    display: none;
  }
  .content_header {
    width: 100%;
    float: left;
    height: 3rem;
    line-height: 3rem;
    color: @color_lan;
    cursor: pointer;
    font-size: 1rem;
    text-indent: 1rem;
    background-color: white;
    font-weight: 600;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
  }

  .blog_list {
    width: 100%;
    float: left;
    margin-top: 1%;
		padding-bottom: 1rem;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);

    .blog_list_header {
      width: 100%;
      height: 3rem;
      float: left;
      border-bottom: 1px solid @color_bg;
      background-color: #F5F7FA;

      p {
        float: left;
        height: 3rem;
        line-height: 3rem;
        text-align: left;
        text-indent: 1rem;
        font-weight: 600;
      }

      p:nth-child(1) {
        width: 20%;
      }

      p:nth-child(2) {
        width: 20%;
      }

      p:nth-child(3) {
        width: 10%;
      }

      p:nth-child(4) {
        width: 20%;
      }

      p:nth-child(5) {
        width: 20%;
      }
			
			p:nth-child(6) {
			  width: 10%;
			}
    }

    .blog_box {
      width: 100%;
      float: left;

      .blog {
        width: 100%;
        float: left;
        border-bottom: 1px solid @color_bg;
        cursor: pointer;

        &:hover {
          color: @color_lan;
        }

        p {
          float: left;
          height: 120px;
          line-height: 120px;
          text-align: left;
          text-indent: 1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        p:nth-child(1) {
          width: 20%;
        }

        p:nth-child(2) {
          width: 20%;
          box-sizing: border-box;
          border-left: 1px solid #F5F7FA;
        }
        p:nth-child(3) {
          width: 10%;
          box-sizing: border-box;
          border-left: 1px solid #F5F7FA;
        }

        p:nth-child(4) {
          width: 20%;
          box-sizing: border-box;
          border-left: 1px solid #F5F7FA;
        }

        p:nth-child(5) {
          width: 20%;
          box-sizing: border-box;
          border-left: 1px solid #F5F7FA;
        }
		
		p:nth-child(6) {
		  width: 10%;
		  box-sizing: border-box;
		  border-left: 1px solid #F5F7FA;
		}		

        p:last-child {
          font-size: 12px;

          span:nth-child(1) {
            color: green;
            padding-right: .5rem;
          }

          span:nth-child(2) {
            color: red;
          }
        }
      }
    }

  }
</style>
