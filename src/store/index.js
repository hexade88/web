import { createStore } from 'vuex';
import api from '../components/ApoService.js';

const store = createStore({
  state() {
    return{
      servers:{},
      in_users:[],
      out_users:[],
    }
  },
  getters:{
    getServers(state){
      return state.servers;
    },
    getInUser(state){
      return state.in_users;
    },
    getOutUser(state){
      return state.out_users;
    }
  },
  actions:{
    setServers(context){
      api.get_servers()
      .then((res) => {
        context.commit('setServers', res.data);
      });
    },
    setInUser(context, data){
      context.commit('setInUser', data);
    },
    setOutUser(context, data){
      context.commit('setOutUser', data);
    }

  },
  mutations:{
    setServers(state, data){
      state.servers = data;
    },
    setInUser(state, data){
      state.in_users = data;
    },
    setOutUser(state, data){
      state.out_users = data;
    },
  },
});

export default store;
