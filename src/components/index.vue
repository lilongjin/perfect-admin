<template>
  <div>
    <div class="header" v-if="admin_msg !=''">
      <div class="user_msg" @click="jump('home','后台首页','0')">至臻珠宝小程序后台管理系统</div>
      <div class="admin_login">
        <p @click="admin_quit()"><span class="el-icon-switch-button"></span>退出</p>
      </div>
    </div>
    <div class="contents" v-if="admin_msg !=''">
      <div class="left">
        <div class="admin_msg">
          <img src="../../static/img/logo.png" alt="">
          <p>{{admin_msg.username}}<span>超级管理员</span></p>
        </div>
        <ul>
          <li v-bind:class="{'ac':ac_index==0}" @click="jump('home','后台首页','0')"><span class="el-icon-s-home"></span>后台首页</li>
          <li v-bind:class="{'ac':ac_index==1}" @click="jump('category','商品分类管理','1')"><span class="el-icon-notebook-2"></span>商品分类管理</li>
          <li v-bind:class="{'ac':ac_index==2}" @click="jump('goods','全部商品列表','2')"><span class="el-icon-s-goods"></span>全部商品列表</li>
		   <li v-bind:class="{'ac':ac_index==3}" @click="jump('goods','轮播商品管理','3')"><span class="el-icon-picture"></span>轮播商品管理</li>
		   <li v-bind:class="{'ac':ac_index==4}" @click="jump('goods','推荐商品管理','4')"><span class="el-icon-magic-stick"></span>推荐商品管理</li>
        </ul>
      </div>
      <div class="right">
        <div class="admin_content">
          <div class="content_view">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <div class="login_page" v-if="admin_msg ==''">
      <div class="login_box animated zoomIn">
        <img src="../../static/img/logo.png" alt="">
        <h3>至臻珠宝小程序后台管理系统</h3>
        <div>
          <p><span class="el-icon-user"></span>账户</p>
          <input type="text" v-model="login_name" placeholder="账号">
        </div>
        <div>
          <p><span class="el-icon-lock"></span>密码</p>
          <input type="password" v-model="login_password" placeholder="密码">
        </div>
        <div class="login_btn" @click="admin_login()">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        login_name:"",
        login_password:"",
        header_title:'首页',
        ac_index:0,
        admin_msg:'admin'
      };
    },
    created: function () {
      //设置导航索引
      var ac_index = sessionStorage.getItem("ac_index");
      if(ac_index && ac_index !=""){
        this.ac_index = ac_index;
      }else{
        this.ac_index = 0;
      };
      //检查缓存中是否记录了登录状态
      const admin_id = localStorage.getItem("admin_id");
      //如果有已登录状态缓存记录，则在刷新页面时将用户信息提交至vuex
      if(admin_id && admin_id !=""){
        this.$axios({
          method:'post',
          url:'https://perfect.lilongjin.cn/admin/login_status',
          data:this.qs.stringify({
            id:admin_id,
          })
        }).then((res) => {
          if(res.data.code == 0){
            //将获取成功后的用户信息提交存储到vuex中
            this.$store.dispatch("change_admin_msg_f",res.data);
            this.admin_msg = this.$store.getters.adminMsg
          }else{
			this.admin_msg = "";
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
      }else{
		  this.admin_msg = "";
	  };
    },
    methods: {
      //登录
      admin_login() {
        if(this.login_name!=''&&this.login_password!=''){
          this.$axios({
            method: 'post',
            url: 'https://perfect.lilongjin.cn/admin/login',
            data: this.qs.stringify({
              login_name: this.login_name,
              login_password: this.login_password
            })
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
				duration: 2000,
                message: "登陆成功",
                type: 'success'
              });
              //将登陆成功后的用户信息提交存储到vuex中
              this.$store.dispatch("change_admin_msg_f",res.data.admin_msg);
              //缓存登录信息
              localStorage.setItem("admin_id",this.$store.getters.adminMsg._id);
              this.isLogin = true;
              this.admin_msg = this.$store.getters.adminMsg
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
        }else{
          this.$message({
            showClose: true,
            message: "请输入账号密码后登录",
            type: 'warn'
          });
        }
      },
      //退出登录
      admin_quit() {
        localStorage.removeItem('admin_id');
        sessionStorage.removeItem("ac_index");
        sessionStorage.removeItem("ac_title");
        this.$router.push({name: 'index_content'});
        location.reload();
      },
      //切换路由
      jump(to_url,title,ac_index){
        this.$router.push({ name: `${to_url}`});
        this.ac_index = ac_index;
        //缓存导航索引信息
        sessionStorage.setItem("ac_index",ac_index);
        sessionStorage.setItem("ac_title",title);
      },
    }
  }
</script>
<style lang="less" scoped>
  @import "../../static/less/main.less";

  .header {
    width: 100%;
	min-width: 1200px;
    float: left;
    background-color: @color_lan;
    height: 4rem;
    cursor: pointer;
    .user_msg {
      line-height: 4rem;
      color: white;
      font-size: 1.3rem;
      float: left;
      margin-left: 2%;
    }
    .admin_login {
      line-height: 4rem;
      color: white;
      font-size: .8rem;
      float: right;
      margin-right: 2%;
      p {
        float: right;
        margin-right: 1rem;
        span {
          padding-right: .5rem;
        }
        a{
          color: white;
        }
      }
    }
  }
  .contents{
    position: fixed;
    left: 0;
    top:4rem;
    bottom: 0;
    right: 0;
	min-width: 1200px;
    .left{
      width: 15%;
      height: 100%;
      float: left;
	  background-color: #353D44;
      .admin_msg{
        width: 100%;
        float: left;
        img{
          width: 30%;
          border-radius: 50%;
          float: left;
          margin-left: 35%;
          margin-top: 2rem;
        }
        p{
          width: 100%;
          text-align: center;
          color: #ffffff;
          line-height: 3rem;
          float: left;
          font-size: .8rem;
          span{
            font-size: 12px;
            background-color: @color_lan;
            color: white;
            padding: 2px 5px 2px 5px;
            border-radius: 3px;
            margin-left: 5px;
          }
        }
      }
      ul{
        width: 100%;
        float: left;
        margin-top: 1rem;
        li{
          width: 100%;
          height: 3rem;
          line-height: 3rem;
          text-align: left;
          float: left;
          font-size: 1rem;
          text-indent: 1rem;
          color: #ffffff;
          cursor: pointer;
		  box-sizing: border-box;
		  border-bottom: 1px solid #353D44;
          &:hover{
            background-color: #2C3138;
          }
          span{
            padding-right: .5rem;
          }
        }
        .ac{
          background-color: #2C3138;
        }
      }
    }
    .right{
      width: 85%;
      height: 100%;
      float: left;
	  overflow-y: auto;
      .admin_content{
        width: 98%;
        float: left;
		margin: 1%;
        .content_view{
          width: 100%;
          float: left;
		  background-color: white;
        }
      }
    }
  }
  .login_page {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: url("../../static/img/login_bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 999;
	overflow-y: auto;
    .login_box {
          width: 30%;
          background-color: rgba(255, 255, 255, 0.8);
          float: left;
          margin-left: 35%;
          margin-top: 5%;
          border-radius: 5px;
          padding-top: 2rem;
          padding-bottom: 3rem;
      img{
        width: 40%;
        float: left;
        margin-left: 30%;
		border-radius: 5px;
      }
      h3{
        width: 100%;
        float: left;
        color: @color_lan;
        text-align: center;
        line-height: 3rem;
      }
      div{
        width: 70%;
        float: left;
        margin-left: 15%;
        margin-top: 1.5rem;
        border-radius: 5px;
        p{
          width: 100%;
          float: left;
          span{
            padding-right: .5rem;
          }
        }
        input{
          width: 100%;
          float: left;
          border: none;
          outline: none;
          height: 2rem;
          line-height: 2rem;
          font-size: 14px;
          text-indent: .5rem;
          margin-top: .5rem;
        }
      }
      .login_btn{
        margin-top: 2rem;
        background-color: @color_lan;
        color: white;
        text-align: center;
        height: 2.5rem;
        line-height: 2.5rem;
        cursor: pointer;
      }
    }
  }
</style>
