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
        <p>操作</p>
      </div>
      <div class="blog_box">
        <div class="blog" v-for="item in content_list_data.goods_list" v-if="item.hot_status">
          <p>{{item.title}}</p>
          <p>
            <img v-if="item.img_list.length != 0" :src="item.img_list[0].url" alt="" style="width: 100px;height: 100px;margin-top: 10px">
            <span v-if="item.img_list.length == 0">暂无</span>
          </p>
          <p>￥{{item.price}}元</p>
          <p>{{item.addtime | formatDate('yyyy-MM-dd hh:mm:ss')}}</p>
          <p>
            <span @click="edit(item._id)">编辑</span>
            <span @click="deletes(item._id)">删除</span>
          </p>
        </div>
      </div>
      <div v-if="content_list_data.goods_list.length == 0" style="line-height: 3rem;text-align: center;">暂无数据！</div>
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
        v-if="content_list_data.goods_list.length != 0"
      >
      </el-pagination>
    </div>
    <div class="goods_edit" v-if="dialogVisible">
      <div class="edit_box">
        <div class="edit_title">{{edit_title}}</div>
        <div class="edit_content">
          <el-form label-position="top" label-width="150px" :model="form_data">
            <el-form-item label="请选择商品分类">
              <el-select v-model="form_data.category_id" placeholder="请选择商品分类">
                <el-option
                  v-for="item in form_category_list"
                  :key="item.category_id"
                  :label="item.category_name"
                  :value="item.category_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
              <el-input v-model="form_data.title"></el-input>
            </el-form-item>
            <el-form-item label="商品副标题">
              <el-input v-model="form_data.subtitle"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input-number v-model="form_data.price" controls-position="right" :min="0"></el-input-number>&nbsp;&nbsp;
              <span>元</span>
            </el-form-item>
            <el-form-item label="商品轮播图">
              <div class="goods_banner">
                <img v-for="item in form_data.img_list" :key="item.id" :src="item.url" alt="">
              </div>
              <el-upload
                class="upload-demo"
                :action="upload_url"
                accept=".png,.jpg"
                :on-success="uploads"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">仅支持上传jpg/png格式图片</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品上架状态">
              <el-switch
                v-model="form_data.show_status"
                active-text="上架"
                inactive-text="不上架">
              </el-switch>
            </el-form-item>
            <el-form-item label="是否设为首页轮播图商品">
              <el-switch
                v-model="form_data.banner_status"
                active-text="是"
                inactive-text="否">
              </el-switch>
            </el-form-item>
            <el-form-item label="是否展示为首页推荐商品">
              <el-switch
                v-model="form_data.hot_status"
                active-text="展示"
                inactive-text="不展示">
              </el-switch>
            </el-form-item>
            <el-form-item label="商品详情">
              <el-input v-model="form_data.content"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="edit_btn">
          <el-button type="primary" style="float: right;margin-left: 1rem" @click="submit()">确认</el-button>
          <el-button type="primary" style="float: right" @click="close()">取消</el-button>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        content_list_data: {
          goods_list: [],
        },
        header_title: "",
        category_id: '',
        page: 1,
        form_category_list:[],
        edit_goods_id:'',
        form_data: {
          category_id: '',
          title: '',
          subtitle: '',
          price: '',
          img_list: [],
          show_status: true,
          banner_status: false,
          hot_status: false,
          content:'',
        }
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
      //获取全部分类
      this.$axios({
        method: 'post',
        url: 'https://perfect.lilongjin.cn/admin/category/list',
        data: {}
      }).then((res) => {
        this.form_category_list = res.data;
        var category_data = res.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    methods: {
      open(id) {
        if(id && id != ""){
          this.edit_title = "编辑商品";
          this.upload_url = `https://perfect.lilongjin.cn/admin/goods_banner_add?goods_id=${id}`;
          this.detail(id);
          this.dialogVisible = true;
        }else{
//          this.dialogVisible = true;
        }
      },
      detail(id){
        this.edit_goods_id = id;
        //获取商品详情
        this.$axios({
          method: 'post',
          url: 'https://perfect.lilongjin.cn/main/goods_detail',
          data: this.qs.stringify({
            goods_id: id
          })
        }).then((res) => {
//          console.log(res)
          if(res){
            this.form_data.category_id = res.data.category_id;
            this.form_data.title = res.data.title;
            this.form_data.subtitle = res.data.subtitle;
            this.form_data.price = res.data.price;
            this.form_data.img_list = res.data.img_list;
            this.form_data.show_status = res.data.show_status;
            this.form_data.banner_status = res.data.banner_status;
            this.form_data.hot_status = res.data.hot_status;
            this.form_data.content = res.data.content;
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      close() {
        this.$confirm('关闭后将不会保存当前编辑内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.dialogVisible = false;
          this.form_data = {
            category_id: '',
            title: '',
            subtitle: '',
            price: '',
            img_list: [],
            show_status: true,
            banner_status: false,
            hot_status: false,
            content:'',
          }
        }).catch(() => {});
      },
      submit() {
        this.$confirm('是否编辑完毕确认提交', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          center: true
        }).then(() => {
          this.dialogVisible = false;
          this.$axios({
            method: 'post',
            url: 'https://perfect.lilongjin.cn/admin/goods/edit',
            data: this.qs.stringify({
              goods_id: this.edit_goods_id,
              category_id: this.form_data.category_id, //商品分类
              img_list: this.form_data.img_list, //轮播图列表
              title: this.form_data.title, //商品标题
              subtitle: this.form_data.subtitle, //商品副标题
              price: this.form_data.price, //商品价格
              content: this.form_data.content, //商品详情
              show_status: this.form_data.show_status, //是否上架
              banner_status: this.form_data.banner_status, //是否展示在轮播图位置
              hot_status: this.form_data.hot_status, //是否展示在首页热销列表
            })
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
                duration: 2000,
                message: res.data.message,
                type: 'success'
              });
              this.ubdate()
            } else {
              this.$message({
                showClose: true,
                duration: 2000,
                message: res.data.message,
                type: 'error'
              });
            };
          }).catch((error) => {
            console.log(error);
          });
        }).catch(() => {});
      },
      uploads(res){
        if(res && res.url != ""){
          this.$message({
            duration: 2000,
            showClose: true,
            message: "上传成功",
            type: 'success'
          });
          this.form_data.img_list.push(res);
        }else{
          this.$message({
            duration: 2000,
            showClose: true,
            message: "上传失败",
            type: 'error'
          });
        }
      },
      content_list() {
        //获取商品列表
        this.$axios({
          method: 'post',
          url: 'https://perfect.lilongjin.cn/admin/goods/list',
          data: this.qs.stringify({
            page: this.page,
            category_id: this.category_id
          })
        }).then((res) => {
          this.content_list_data = res.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      ubdate() {
        this.page = 1;
        this.content_list();
      },
      edit(id) {
        this.open(id);
      },
      deletes(id) {
        this.$confirm('此操作将永久删除该商品并且不可恢复, 是否继续?', '危险操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'post',
            url: 'https://perfect.lilongjin.cn/admin/goods/delete',
            data: this.qs.stringify({
//              goods_id: id,
              goods_id: "5fe9a0b46f4a42177a5b0f777",
            })
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
                duration: 2000,
                message: res.data.message,
                type: 'success'
              });
              this.ubdate()
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

      prev_page() {
        this.page--;
        this.content_list();
      },
      next_page() {
        this.page++;
        this.content_list();
      },
      jump_page(ac_page) {
        this.page = ac_page;
        this.content_list();
      }
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
        width: 20%;
      }

      p:nth-child(4) {
        width: 20%;
      }

      p:nth-child(5) {
        width: 20%;
        float: right;
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
          width: 20%;
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
          float: right;
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

  .goods_edit {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    .edit_box {
      position: fixed;
      left: 25%;
      top: 10%;
      right: 10%;
      bottom: 10%;
      width: 50%;
      background-color: #FFF;
      border-radius: 4px;
      border: 1px solid #EBEEF5;
      font-size: 18px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      overflow-x: hidden;
      overflow-y: auto;
      .edit_title {
        width: 96%;
        float: left;
        margin-top: 15px;
        margin-left: 2%;
      }
      .edit_content {
        width: 96%;
        float: left;
        margin-top: 20px;
        margin-left: 2%;
        color: #606266;
        font-size: 14px;
        .goods_banner{
          width: 100%;
          float: left;
          img{
            width: 10%;
            float: left;
            margin-left: 2%;
            &:nth-child(1){
              margin: 0;
            }
          }
        }
        .upload-demo{
          width: 100%;
          float: left;
          margin-top: 1rem;
        }
      }
      .edit_btn {
        width: 96%;
        float: left;
        margin-top: 15px;
        margin-left: 2%;
        margin-bottom: 30px;
      }
    }
  }
</style>
