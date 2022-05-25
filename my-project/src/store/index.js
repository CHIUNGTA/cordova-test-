import { createStore } from 'vuex';

export default createStore({
  state() {
    return { 
      count: 0,
      members: [
        {id: '1', name:'jim'},
        {id: '2', name: 'tom'},
      ],
      userName: '',
    }
  },
  /**
   * 取得資料前的加工與參選
   */
  getters: {
    get2Count: (state) => {
      return state.count * 2
    },
    getMemberById: (state) => (id) => {
      return state.members.find(x=> x.id === id)
    }
  },
  /**
   * 事件
   */
  mutations: {
    /**
     * 加法事件
     * @param {*} state 
     */
    increment (state) {
      state.count++
    },
    /**
     * 登入後紀錄使用者的名稱
     * @param {*} state 
     * @param {*} name 
     */
    login (state, name) {
      state.userName = name
    }
  },
  actions: {
    /**
     * 增加參數
     * @param {*} context 
     */
    addAsync(context, item) {
      console.log('item', item)
      setTimeout(() => {
        console.log(context)
        context['commit']('increment')
      }, context.state.count * 100)
    }
  },
  modules: {
  },
});
