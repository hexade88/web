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
      STAGE:{
        'WON': 'WON',            //проект Сделка успешна
        'EXECUTING': 'EXECUTING', //Тендер
        '5':'5',                  //Деньги на счету
        '1':'1',
        '3':'3',
        '4':'4',
        '2':'2',
        '6':'6',
        'NEW': 'NEW',
        'C4:NEW':'C1:NEW',
        'C4:PREPARATION':'C1:PREPARATION',
        'C4:PREPAYMENT_INVOICE': 'C1:PREPAYMENT_INVOICE',
        'C4:EXECUTING': 'C1:EXECUTING',
        'C4:1': 'C1:FINAL_INVOICE',
        'C4:FINAL_INVOICE': 'C1:UC_DJMHDO',
        'C4:2': 'C1:UC_WXN01F',
        'C4:3': 'C1:UC_PURQSM',
        'C4:4': 'C1:UC_NSBONW',
        'C4:5': 'C1:UC_PHO887',
        'C4:WON': 'C1:WON',
        'C4:LOSE': 'C1:LOSE',
        'C1:NEW': 'C2:NEW',
        'C1:PREPARATION': 'C2:PREPARATION',
        'C1:PREPAYMENT_INVOICE': 'C2:PREPAYMENT_INVOICE',
        'C1:EXECUTING': 'C2:EXECUTING',
        'C1:FINAL_INVOICE': 'C2:FINAL_INVOICE',
        'C1:1': 'C2:UC_L7TOA9',
        'C1:2': 'C2:UC_N4NOPY',
        'C1:3': 'C2:UC_JVYTQO',
        'C1:4': 'C2:UC_MY01F2',
        'C1:5': 'C2:UC_WVB3VD',
        'C1:WON': 'C2:WON',
        'C1:LOSE': 'C2:LOSE',
        'C2:NEW': 'C3:NEW',    //Продажа товара
        'C2:PREPARATION':'C3:PREPARATION',
        'C2:PREPAYMENT_INVOICE':'C3:PREPAYMENT_INVOICE',
        'C2:EXECUTING': 'C3:EXECUTING',
        'C2:1': 'C3:FINAL_INVOICE',
        'C2:2': 'C3:UC_GN5ST1',
        'C2:FINAL_INVOICE': 'C3:UC_1KF328',
        'C2:4': 'C3:UC_GUWQBA',
        'C2:5': 'C3:UC_BJBTV3',
        'C2:7': 'C3:UC_DQPN0P',
        'C2:8': 'C3:UC_Q288XO',
        'C2:6': 'C3:UC_IAAJUL',  //Дубликат
        'C2:9': 'C3:UC_IAAJUL',  //Другое
        'C2:WON':'C3:WON',   //заморожен
        'C2:LOSE': 'C3:LOSE',
        'C5:NEW': 'C4:NEW',
        'C5:PREPARATION': 'C4:PREPARATION',
        'C5:PREPAYMENT_INVOICE': 'C4:PREPAYMENT_INVOICE',
        'C5:EXECUTING': 'C4:EXECUTING',
        'C5:FINAL_INVOICE': 'C4:FINAL_INVOICE',
        'C5:1': 'C4:UC_A6WNQV',
        'C5:WON': 'C4:WON',
        'C5:LOSE': 'C4:LOSE',
        'C6:NEW': 'C5:NEW',
        'C6:PREPARATION': 'C5:PREPARATION',
        'C6:PREPAYMENT_INVOICE': 'C5:PREPAYMENT_INVOICE',
        'C6:EXECUTING': 'C5:EXECUTING',
        'C6:FINAL_INVOICE': 'C5:FINAL_INVOICE',
        'C6:1': 'C5:UC_6EETE4',
        'C6:WON': 'C5:WON',
        'C6:LOSE': 'C5:LOSE',
        'C6:4': 'C5:UC_MSUJSN',
      },
      CATEGORY:{
        '0':0,
        '4':1,
        '1':2,
        '2':3,
        '5':4,
        '6':5,
        'null':0
      },
    }
  },
  getters:{
    getCATEGORY(state){
      return state.CATEGORY;
    },
    getSTAGE(state){
      return state.STAGE;
    },
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
