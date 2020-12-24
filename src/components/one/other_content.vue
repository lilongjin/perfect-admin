<template>
    <div class="other_content">
      <div class="notice">
        <div class="notice_header">
          广告位设置：
        </div>
        <div class="notice_content">
          <p>展示图片预览：</p>
          <img v-bind:src="other_data.noticeImg" alt="">
          <div class="notice_edit">
            <el-upload
            class="upload-demo"
            action="http://zhiyun_server.lilongjin.cn/admin/notice_img"
            accept=".png,.jpg"
            :limit="3"
            :file-list="fileList"
            :on-success="uploads"
            list-type="picture">
            <el-button size="small" type="primary">点击上传更换</el-button>
            <div slot="tip" class="el-upload__tip">仅支持上传jpg/png格式图片</div>
            </el-upload>
          </div>
          <div class="notice_url">
            <p>跳转地址:</p>
            <div>{{other_data.noticeUrl}} <span @click="edit('noticeUrl')">点击更改</span></div>
          </div>
        </div>
      </div>
      <div class="ma">
        <div class="ma_header">
          二维码1设置：
        </div>
        <div class="ma_content">
          <p>预览：</p>
          <img v-bind:src="other_data.ma1Img" alt="">
          <div class="ma_edit">
            <el-upload
              class="upload-demo"
              action="http://zhiyun_server.lilongjin.cn/admin/ma1_img"
              accept=".png,.jpg"
              :limit="3"
              :file-list="fileList"
              :on-success="uploads"
              list-type="picture">
              <el-button size="small" type="primary">点击上传更换</el-button>
              <div slot="tip" class="el-upload__tip">仅支持上传jpg/png格式图片</div>
            </el-upload>
          </div>
          <div class="ma_title">
            <p>标题:</p>
            <div>{{other_data.ma1Title}} <span @click="edit('ma1Title')">点击更改</span></div>
          </div>
        </div>
      </div>
      <div class="ma">
        <div class="ma_header">
          二维码2设置：
        </div>
        <div class="ma_content">
          <p>预览：</p>
          <img v-bind:src="other_data.ma2Img" alt="">
          <div class="ma_edit">
            <el-upload
              class="upload-demo"
              action="http://zhiyun_server.lilongjin.cn/admin/ma2_img"
              accept=".png,.jpg"
              :limit="3"
              :file-list="fileList"
              :on-success="uploads"
              list-type="picture">
              <el-button size="small" type="primary">点击上传更换</el-button>
              <div slot="tip" class="el-upload__tip">仅支持上传jpg/png格式图片</div>
            </el-upload>
          </div>
          <div class="ma_title">
            <p>标题:</p>
            <div>{{other_data.ma2Title}} <span @click="edit('ma2Title')">点击更改</span></div>
          </div>
        </div>
      </div>
      <div class="about">
        <div class="about_header">
          关于我们信息设置：
        </div>
        <div class="about_msg">
          <p>QQ交流群:</p>
          <div>{{other_data.qq}} <span @click="edit('qq')">点击更改</span></div>
        </div>
        <div class="about_msg">
          <p>GitHub地址:</p>
          <div>{{other_data.git}} <span @click="edit('git')">点击更改</span></div>
        </div>
        <div class="about_msg">
          <p>技术支持:</p>
          <div>{{other_data.support}} <span @click="edit('support')">点击更改</span></div>
        </div>
      </div>
      <div class="footer">
        <div class="footer_header">
          底部信息设置：
        </div>
        <div class="footer_msg">
          <p>底部文字:</p>
          <div>{{other_data.footer_msg}} <span @click="edit('footer_msg')">点击更改</span></div>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              fileList: [],
              other_data:""
            }
        },
        created: function () {
          this.other_msg();
        },
        methods: {
          other_msg(){
            //获取全部轮播图
            this.$axios({
              method: 'post',
              url: 'http://zhiyun_server.lilongjin.cn/main/other_msg',
            }).then((res) => {
              this.other_data = res.data[0];
            }).catch((error) => {
              console.log(error);
            });
          },
          uploads(res){
            if(res == 0){
              this.$message({
                showClose: true,
                message: "上传服务器成功",
                type: 'success'
              });
              this.other_msg();
            }else{
              this.$message({
                showClose: true,
                message: "上传服务器失败，超出轮播图数量上限",
                type: 'error'
              });
            }
          },
          edit(type){
            this.$prompt('请输入新内容', '更改内容', {
              confirmButtonText: '更改',
              cancelButtonText: '取消',
            }).then(({ value }) => {
              if(value != null){
                this.$axios({
                  method:'post',
                  url:'http://zhiyun_server.lilongjin.cn/admin/other_edit',
                  data:this.qs.stringify({
                    edit_type:type,
                    edit_content:value
                  })
                }).then((res) => {
//                  console.log(res)
                  if(res){
                    this.$message({
                      type: 'success',
                      message: '更改成功'
                    });
                    this.other_msg();
                  }
                }).catch((error) => {
                  console.log(error);
                });
              }else{
                this.$message({
                  type: 'error',
                  message: '更改的新内容不能为空'
                });
              }
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消更改'
              });
            });
          }
        },
    }
</script>
<style lang="less" scoped>
  @import "../../../static/less/main.less";
  .other_content{
    width: 100%;
    float: left;
    .notice{
      width: 100%;
      float: left;
      padding-bottom: 2rem;
      border-bottom: 1px solid #f5f6f7;
      .notice_header{
        width: 100%;
        float: left;
        height: 3rem;
        margin-left: 1rem;
        line-height: 3rem;
        color: @color_lan;
      }
      .notice_content{
        width: 90%;
        float: left;
        margin-left: 1rem;
        p{
          font-size: 14px;
          margin-bottom: .5rem;
        }
        img{
          width: 10%;
          float: left;
          margin-bottom: 1rem;
        }
        .notice_edit{
          width: 100%;
          float: left;
        }
        .notice_url{
          width: 100%;
          float: left;
          font-size: 14px;
          margin-top: 1rem;
          span{
            color:green;
            cursor: pointer;
            font-size: 12px;
          }
        }
      }
    }
    .ma{
      width: 30%;
      float: left;
      padding-bottom: 2rem;
      border-bottom: 1px solid #f5f6f7;
      .ma_header{
        width: 100%;
        float: left;
        height: 3rem;
        margin-left: 1rem;
        line-height: 3rem;
        color: @color_lan;
      }
      .ma_content{
        float: left;
        margin-top: 1rem;
        margin-left: 1rem;
        margin-bottom: 1rem;
        p{
          font-size: 14px;
          margin-bottom: .5rem;
        }
        img{
          width: 50%;
          float: left;
          margin-bottom: 1rem;
        }
        .ma_edit{
          width: 100%;
          float: left;
        }
        .ma_title{
          width: 100%;
          float: left;
          margin-top: 1rem;
          font-size: 14px;
          span{
            color:green;
            cursor: pointer;
            font-size: 12px;
          }
        }
      }
    }
    .about {
      width: 100%;
      float: left;
      padding-bottom: 2rem;
      border-bottom: 1px solid #f5f6f7;
      .about_header{
        width: 100%;
        float: left;
        height: 3rem;
        margin-left: 1rem;
        line-height: 3rem;
        color: @color_lan;
      }
      .about_msg{
        float: left;
        margin-top: 1rem;
        margin-left: 1rem;
        margin-right: 2rem;
        margin-bottom: 1rem;
        &:nth-child(1){
          margin-left: 1rem;
        }
        p{
          margin-bottom: 1rem;
        }
        span{
          color:green;
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
    .footer {
      width: 100%;
      float: left;
      padding-bottom: 2rem;
      .footer_header{
        width: 100%;
        float: left;
        height: 3rem;
        margin-left: 1rem;
        line-height: 3rem;
        color: @color_lan;
      }
      .footer_msg{
        float: left;
        margin-top: 1rem;
        margin-left: 1rem;
        margin-right: 2rem;
        margin-bottom: 1rem;
        &:nth-child(1){
          margin-left: 1rem;
        }
        p{
          margin-bottom: 1rem;
        }
        span{
          color:green;
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
  }
</style>
