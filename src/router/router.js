// 一级路由文件
import home from '../components/one/home.vue'
import category from '../components/one/category.vue'
import goods from '../components/one/goods.vue'
import detail from '../components/one/detail.vue'
// 路由字典
export const routes=[
  {path:'/home',name:"home",component:home},
  {path:'/category',name:"category",component:category},
  {path:'/goods',name:"goods",component:goods},
  {path:'/detail',name:"detail",component:detail},
  // 以上都不匹配默认跳转为首页
  {path:'*',redirect:'/home'},
];

