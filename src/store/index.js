import { createStore } from 'vuex';
import api from '../components/ApoService.js';

const store = createStore({
  state() {
    return{
      servers:{},
      in_users:[],
      out_users:[],
      InDealFields:[],
      OutDealFields:[],
    }
  },
  getters:{
    getInDealFields(state){
      return state.InDealFields;
    },
    getOutDealFields(state){
      return state.OutDealFields;
    },
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
    setInDealFields(context, data){
      context.commit('setInDealFields', data);
    },
    setOutDealFields(context, data){
      context.commit('setOutDealFields', data);
    },
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
    setInDealFields(state, data){
      state.InDealFields = data;
    },
    setOutDealFields(state, data){
      state.OutDealFields = data;
    },

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
