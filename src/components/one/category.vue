<template>
	<div>
		<div class="content_header">
			<span>{{header_title}}</span>
			<el-button type="success" style="float: right;" @click="edit()">新增分类</el-button>
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
				<div class="blog" v-for="item in category_list">
					<p>{{item.category_name}}</p>
					<p>{{item.category_id}}</p>
					<p>
						<span @click="edit(item.category_id)">修改</span>
						<span @click="deletes(item.category_id)">删除</span>
					</p>
				</div>
			</div>
			<div v-if="category_list.length == 0" style="line-height: 3rem;text-align: center;">暂无数据！</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
        category_list: [],
				header_title: ""
			}
		},
		created: function() {
			this.get_category_list();
			var ac_title = sessionStorage.getItem("ac_title");
			if (ac_title && ac_title != "") {
				this.header_title = ac_title;
			} else {
				this.header_title = "后台首页";
			};
		},
		methods: {
			get_category_list() {
				//获取全部分类
				this.$axios({
					method: 'post',
					url: 'https://perfect.lilongjin.cn/admin/category/list',
					data: {}
				}).then((res) => {
					this.category_list = res.data;
				}).catch((error) => {
					console.log(error);
				});
			},
			edit(id) {
				if (id && id != "") {
					this.$prompt('请输入新分类名称', '修改分类', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						this.$axios({
							method: 'post',
							url: 'https://perfect.lilongjin.cn/admin/category/edit',
							data: this.qs.stringify({
								category_name: value,
								category_id: id
							})
						}).then((res) => {
							if (res.data.code == 0) {
								this.$message({
									showClose: true,
									duration: 2000,
									message: res.data.message,
									type: 'success'
								});
								this.get_category_list()
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

					});
				} else {
					this.$prompt('请输入新分类名称', '新增分类', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						this.$axios({
							method: 'post',
							url: 'https://perfect.lilongjin.cn/admin/category/add',
							data: this.qs.stringify({
								name: value,
							})
						}).then((res) => {
							if (res.data.code == 0) {
								this.$message({
									showClose: true,
									duration: 2000,
									message: res.data.message,
									type: 'success'
								});
								this.get_category_list()
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

					});
				}
			},
			deletes(id) {
				this.$confirm('此操作将永久删除该分类和当前分类下所有商品且不可恢复，是否继续？', '危险操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: 'https://perfect.lilongjin.cn/admin/category/delete',
						data: this.qs.stringify({
							category_id: id,
						})
					}).then((res) => {
						if (res.data.code == 0) {
							this.$message({
								showClose: true,
								duration: 2000,
								message: res.data.message,
								type: 'success'
							});
              this.get_category_list()
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
				width: 60%;
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
					width: 60%;
					box-sizing: border-box;
					border-left: 1px solid #F5F7FA;
					border-right: 1px solid #F5F7FA;
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
