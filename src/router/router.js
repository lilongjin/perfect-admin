// 一级路由文件
import index_content from '../components/one/index_content.vue'
import user_list from '../components/one/user_list.vue'
import blog_list from '../components/one/blog_list.vue'
import question_list from '../components/one/question_list.vue'
import banner_list from '../components/one/banner_list.vue'
import other_content from '../components/one/other_content.vue'
import system_msg from '../components/one/system_msg.vue'
import detail from '../components/one/detail.vue'
// 路由字典
export const routes=[
  {path:'/index_content',name:"index_content",component:index_content},
  {path:'/user_list',name:"user_list",component:user_list},
  {path:'/blog_list',name:"blog_list",component:blog_list},
  {path:'/question_list',name:"question_list",component:question_list},
  {path:'/banner_list',name:"banner_list",component:banner_list},
  {path:'/other_content',name:"other_content",component:other_content},
  {path:'/system_msg',name:"system_msg",component:system_msg},
  {path:'/detail',name:"detail",component:detail},
  // 以上都不匹配默认跳转为首页
  {path:'*',redirect:'/index_content'},
];

