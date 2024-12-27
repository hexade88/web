import { createStore } from 'vuex';
import api from '../components/ApoService.js';

const store = createStore({
  state() {
    return{
      servers:{}
    }
  },
  getters:{
    getServers(state){
      return state.servers;
    }
  },
  actions:{
    setServers(context){
      api.get_servers()
      .then((res) => {
        context.commit('setServers', res.data.servers);
      });
    }
  },
  mutations:{
    setServers(state, data){
      state.servers = data;
    }
  }
});

export default store;
