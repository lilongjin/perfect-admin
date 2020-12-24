<template>
    <div class="user_list">
        <el-table
                :data="user_list_data.user_list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="用户ID"
                    prop="_id"
					align="center"
					min-width="25%">
            </el-table-column>
            <el-table-column
                    label="注册时间"
                    prop="time"
					align="center"
					min-width="15%">
            </el-table-column>
            <el-table-column
                    label="用户名"
                    prop="username"
					align="center"
					min-width="20%">
            </el-table-column>
            <el-table-column
                    label="用户类型"
                    prop="type"
					align="center"
					min-width="10%">
            </el-table-column>
            <el-table-column
                    align="right"
					min-width="30%">
                <!-- <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                </template> -->
                <template slot-scope="scope" v-if="admin_msg.SuperAdmin">
                    <el-button
                            size="mini"
                            type="primary"
                            v-show="!scope.row.SuperAdmin"
                            v-if="!scope.row.isAdmin"
                            @click="setAdmin(scope.$index, scope.row)">设为管理员
                    </el-button>
                    <el-button
                            size="mini"
                            type="warning"
                            v-show="!scope.row.SuperAdmin"
                            v-if="scope.row.isAdmin"
                            @click="removeAdmin(scope.$index, scope.row)">取消管理员
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            v-show="!scope.row.SuperAdmin"
                            @click="deleteAdmin(scope.$index, scope.row)">删除用户
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="user_list_data.count"
                :page-count="user_list_data.pages"
                :page-size="user_list_data.limit"
                :current-page="user_list_data.page"
                @current-change="jump_page"
                @prev-click="prev_page()"
                @next-click="next_page()"
                style="float: left;margin-left: 35%;margin-top: 1rem;">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              user_list_data:{
                user_list: [],
              },
              admin_msg:'',
              search: '',
              page:1
            }
        },
        created: function () {
            //检查缓存中是否记录了登录状态
            const admin_id = localStorage.getItem("admin_id");
            //如果有已登录状态缓存记录，则在刷新页面时将用户信息提交至vuex
            if(admin_id && admin_id !="") {
                this.$axios({
                    method: 'post',
                    url: 'http://zhiyun_server.lilongjin.cn/api/user/userInfo',
                    data: this.qs.stringify({
                      userid: admin_id,
                    })
                }).then((res) => {
                    if (res.data.code == 0) {
                        //将获取成功后的用户信息提交存储到vuex中
                        this.$store.dispatch("change_admin_msg_f", res.data);
                        this.admin_msg = res.data;
//                        console.log(this.admin_msg);
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'error'
                        });
                    }
                    ;
                }).catch((error) => {
                    console.log(error);
                });
            };
            //获取用户列表
            this.user_list();
        },
        methods: {
          user_list(){
            this.$axios({
              method:'post',
              url:'http://zhiyun_server.lilongjin.cn/admin/user_list',
              data: this.qs.stringify({
                page:this.page
              })
            }).then((res) => {
              this.user_list_data = res.data;
              var init_user_list = this.user_list_data.user_list;
              var result_user_list = [];
              for(var i=0;i<init_user_list.length;i++){
                if(init_user_list[i].SuperAdmin){
                  init_user_list[i].type = "超级管理员"
                }else if(init_user_list[i].isAdmin){
                  init_user_list[i].type = "管理员"
                }else{
                  init_user_list[i].type = "普通用户"
                };
                if(init_user_list[i].time){
                  init_user_list[i].time = init_user_list[i].time
                }else{
                  init_user_list[i].time = "暂无"
                }
                result_user_list.push( init_user_list[i]);
              };
              this.user_list_data.user_list = result_user_list;
            }).catch((error) => {
              console.log(error);
            });
          },
          setAdmin(index, row) {
            this.$axios({
              method: 'post',
              url: 'http://zhiyun_server.lilongjin.cn/admin/admin_add',
              data: this.qs.stringify({
                admin_msg:this.admin_msg,
                user_msg:row
              })
            }).then((res) => {
              this.$message({
                showClose: true,
                message: res.data,
                type: 'success'
              });
              this.user_list();
            }).catch((error) => {
              console.log(error);
            });
          },
          removeAdmin(index, row) {
            this.$axios({
              method: 'post',
              url: 'http://zhiyun_server.lilongjin.cn/admin/admin_remove',
              data: this.qs.stringify({
                admin_msg:this.admin_msg,
                user_msg:row
              })
            }).then((res) => {
              this.$message({
                showClose: true,
                message: res.data,
                type: 'success'
              });
              this.user_list();
            }).catch((error) => {
              console.log(error);
            });
          },
          deleteAdmin(index, row) {
            this.$confirm('此操作将删除该用户所有数据并且不可恢复, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios({
                method: 'post',
                url: 'http://zhiyun_server.lilongjin.cn/admin/user_remove',
                data: this.qs.stringify({
                  admin_msg:this.admin_msg,
                  user_msg:row
                })
              }).then((res) => {
                this.$message({
                  showClose: true,
                  message: res.data,
                  type: 'success'
                });
                this.user_list();
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
            this.user_list();
          },
          next_page(){
            this.page++;
            this.user_list();
          },
          jump_page(ac_page){
            this.page = ac_page;
            this.user_list();
          }
        },
    }
</script>
<style lang="less" scoped>
    @import "../../../static/less/main.less";
    .user_list {
        width: 100%;
        float: left;
    }
</style>
