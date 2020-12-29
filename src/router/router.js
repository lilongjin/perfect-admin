// 一级路由文件
import home from '../components/one/home.vue'
import category from '../components/one/category.vue'
import goods from '../components/one/goods.vue'
import banner_list from '../components/one/banner_list.vue'
import hot_list from '../components/one/hot_list.vue'
// 路由字典
export const routes=[
  {path:'/home',name:"home",component:home},
  {path:'/category',name:"category",component:category},
  {path:'/goods',name:"goods",component:goods},
  {path:'/banner_list',name:"banner_list",component:banner_list},
  {path:'/hot_list',name:"hot_list",component:hot_list},
  // 以上都不匹配默认跳转为首页
  {path:'*',redirect:'/home'},
];

