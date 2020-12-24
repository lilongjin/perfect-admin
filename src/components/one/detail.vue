<template>
  <div class="content">
    <div class="article_title">{{content_detail.title}}</div>
    <div class="article_msg">
      <p>{{content_detail.author.username}}</p>
      <p>发布于{{content_detail.addtime | formatDate('yyyy-MM-dd hh:mm:ss')}}</p>
      <p>阅读数：{{content_detail.look}}</p>
      <p>点赞数：{{content_detail.zan}}</p>
      <p>评论数：{{content_detail.comments_num}}</p>
    </div>
    <div class="article_content" v-html="content_detail.content"></div>
    <div class="comments">
      <div class="comment_title">评论区</div>
      <div class="comment_list">
        <div class="comment" v-for="(item,index) in comment_list">
          <div class="comment_msg">
            <span>#{{index+1}}楼</span>
            <span>{{item.username}}</span>
            <span>{{item.commentTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
          </div>
          <div class="comment_detail">
            <div class="comment_left">
              {{item.commentContent}}
            </div>
          </div>
          <div class="comment_answer">
            <div class="answer_detail" v-for="answer in item.answerContent">
              <div class="answer_msg">
                <span>{{answer.answer_username}}</span>
                <span>回复</span>
                <span>{{answer.comment_username}}</span>
                <span>{{answer.answerTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
              </div>
              <div class="answer_detail_content">{{answer.content}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data (){
      return{
        contentid:"",
        content_detail:{
          author:{
            username:""
          },
        },
        comment_list:[],
      };
    },
    created:function () {
      this.contentid = this.$route.query.id;
      //获取文章详情
      this.$axios({
        method:'post',
        url:'http://zhiyun_server.lilongjin.cn/main/content_detail',
        data:this.qs.stringify({
          contentid: this.contentid
        })
      }).then((res) => {
        if(res.data.length != 0 ){
          this.content_detail = res.data.content_detail;
          this.comment_list = res.data.comment_list
        }else{
          this.$message({
            showClose: true,
            message: "获取文章详情失败",
            type: 'error'
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    methods:{

    }
  }
</script>
<style lang="less" scoped>
  @import "../../../static/less/main.less";
  .content{
    width: 94%;
    float: left;
    margin-left: 1rem;
    background-color: white;
    .article_title{
      width: 100%;
      float: left;
      min-height: 3rem;
      line-height: 3rem;
      font-size: 1.8rem;
      font-weight: bold;
      color: @color_txt;
    }
    .article_msg{
      width: 100%;
      float: left;
      height: 3rem;
      line-height: 3rem;
      font-size: .8rem;
      margin-bottom: 1rem;
      color: @color_content;
      border-bottom: 1px solid @color_bg;
      p{
        float: left;
        padding-right: 1rem;
        &:nth-child(1){
          color: @color_lan;
        }
      }
    }
    .article_content{
      width: 100%;
      float: left;
      line-height: 2rem;
      color: @color_title;
    }
    .comments{
      width: 100%;
      float: left;
      line-height: 2rem;
      color: @color_title;
      margin-top: 1rem;
      border-top: 1px solid @color_bg;
      .comment_title{
        width: 100%;
        float: left;
        min-height: 3rem;
        line-height: 3rem;
        font-size: 1rem;
        font-weight: bold;
        color: @color_txt;
        border-bottom: 1px solid @color_bg;
      }
      .comment_list{
        width: 100%;
        float: left;
        min-height: 3rem;
        line-height: 3rem;
        font-size: 1rem;
        color: @color_txt;
        .comment{
          width: 100%;
          float: left;
          border-bottom: 1px solid @color_bg;
          .comment_msg{
            span{
              margin: 0 .5rem 0 .5rem;
              font-size: .8rem;
              color: @color_fenlei;
              &:nth-child(1){
                font-size: .9rem;
                color: @color_txt;
                font-weight: bold;
              }
            }
          }
          .comment_detail{
            width: 100%;
            float: left;
            .comment_left{
              width: 95%;
              float: left;
              font-size: .8rem;
              color: @color_title;
              text-indent: 1rem;
            }
          }
          .comment_answer{
            width: 96%;
            float: left;
            margin-left: 2%;
            line-height: 2rem;
            padding: 0 1% 0 1%;
            margin-bottom: 1rem;
            background-color: @color_bg;
            .answer_detail{
              width: 100%;
              float: left;
              .answer_msg{
                width: 100%;
                float: left;
                span{
                  font-size: .8rem;
                  color:@color_fenlei;
                  &:nth-child(2){
                    color: @color_lan;
                    margin: 0 .5rem 0 .5rem;
                  }
                  &:nth-child(3){
                    margin: 0 .5rem 0 0;
                  }
                }
              };
              .answer_detail_content{
                font-size: .8rem;
                color:@color_fenlei;
              }
            }
          }
        }
      }
    }
  }
</style>
