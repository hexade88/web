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
      deal:[],
      compare:{},
      companys:[],
      contacts:[],
    }
  },
  getters:{
    getContacts(state){
      return state.contacts;
    },
    getCompanys(state){
      return state.companys;
    },
    getCompare(state){
      return state.compare;
    },
    getDeal(state){
      return state.deal;
    },
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
    setContacts(context, data){
      context.commit('setContacts', data);
    },
    setCompanys(context, data){
      context.commit('setCompanys', data);
    },
    setCompare(context, data){
      context.commit('setCompare', data);
    },
    setDeal(context, data){
      context.commit('setDeal', data);
    },
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
    setContacts(state, data){
      state.contacts = data;
    },
    setCompanys(state, data){
      state.companys = data;
    },
    setCompare(state, data){
      state.compare = data;
    },
    setDeal(state, data){
      state.deal = data;
    },
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
