<template>
	<div>
		<div class="content_header">
			<span>{{header_title}}</span>
			<el-button type="success" size="mini" style="float: right;height:2rem;margin: .5rem;" @click="edit()">新增分类</el-button>
		</div>
		<div class="blog_list">
			<div class="blog_list_header">
				<p>分类名称</p>
				<p>ID</p>
				<p>
					<span>操作</span>
				</p>
			</div>
			<div class="blog_box">
				<div class="blog" v-for="item in content_list">
					<p>{{item.category_name}}</p>
					<p>{{item.category_id}}</p>
					<p>
						<span @click="edit(item.category_id)">修改</span>
						<span @click="deletes(item.category_id)">删除</span>
					</p>
				</div>
			</div>
			<div v-if="content_list.length == 0" style="line-height: 3rem;text-align: center;">暂无数据！</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				centerDialogVisible: false,
				content_list: [],
				header_title:""
			}
		},
		created: function() {
			this.get_content_list();
			var ac_title = sessionStorage.getItem("ac_title");
			if(ac_title && ac_title !=""){
			  this.header_title = ac_title;
			}else{
			  this.header_title = "后台首页";
			};
		},
		methods: {
			get_content_list() {
				//获取全部分类
				this.$axios({
					method: 'post',
					url: 'https://perfect.lilongjin.cn/admin/category_list',
					data: {}
				}).then((res) => {
					this.content_list = res.data;
				}).catch((error) => {
					console.log(error);
				});
			},
			edit(id) {
				// this.centerDialogVisible = true;
				// alert(id)
				 this.$prompt('请输入邮箱', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
				          inputErrorMessage: '邮箱格式不正确'
				        }).then(({ value }) => {
				          this.$message({
				            type: 'success',
				            message: '你的邮箱是: ' + value
				          });
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '取消输入'
				          });       
				        });
			},
			deletes(id) {
				this.$confirm('此操作将永久删除该文章并且不可恢复, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: 'http://zhiyun_server.lilongjin.cn/api/content/delete',
						data: this.qs.stringify({
							contentid: id,
						})
					}).then((res) => {
						if (res) {
							this.$message({
								showClose: true,
								message: res.data,
								type: 'success'
							});
							this.get_content_list();
						} else {
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
			prev_page() {
				this.page--;
				this.get_content_list();
			},
			next_page() {
				this.page++;
				this.get_content_list();
			},
			jump_page(ac_page) {
				this.page = ac_page;
				this.get_content_list();
			}
		}
	}
</script>
<style lang="less" scoped>
	@import "../../../static/less/main.less";

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
				width: 30%;
			}

			p:nth-child(3) {
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
					height: 3rem;
					line-height: 3rem;
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
					width: 30%;
				}

				p:nth-child(3) {
					width: 20%;
					float: right;
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
