import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  //设置全局访问state对象
  state:{
    admin_msg:null,
  },

  //实时监听state内值的变化
  getters:{
    adminMsg(state){
      return state.admin_msg
    },
  },

  //实时接收各组件中提交修改值请求并更改state中的值
  mutations:{
    change_admin_msg(state,admin_msg){
      state.admin_msg = admin_msg;
    },
  },

  //实时接收各组件中提交修改值请求(actions与mutations区别是actions提交的是 mutation中的方法，而不是直接更改state中的值)
  actions:{
    change_admin_msg_f(f,admin_msg){
      f.commit("change_admin_msg",admin_msg)
    },
  }
});
