<template>
  <div class="container">
    <div class="hedder">
      <div> <p>Список id сделок для переноса {{ dealID.length }}</p> </div>
      <div> <p>Сравнение пользователей для подмены id в сделках {{ Object.keys(compare).length }}</p> </div>
      <div> <p>Пользовательские поля {{ getInDealFields.length }} - {{ getOutDealFields.length }}</p> </div>
    </div>
    <div><button @click="get_deal_transfer()" :disabled="isLoad">Выполнить перенос</button></div>
    <div>
      <p>Запрос сделки из источника </p>{{ this.workIn }}
      <p>Загрузка сделки в приёмник </p>{{ this.workOut }}
      <p>Счётчик переноса </p>{{ this.next }}
    </div>
  </div>
</template>

<script>
import api from './ApoService.js';
import { mapGetters } from 'vuex';
export default {
  name:'deal-load',
  data(){
    return{
      isLoad:false,
      next: 0,
      workIn:false,
      workOut:false,
      timer:null,
    }
  },
  computed:{
    ...mapGetters({
      compare : 'getCompare',                   //объект idOld:idNew
      dealID : 'getDeal',                       //array
      getInDealFields : 'getInDealFields',      //array
      getOutDealFields : 'getOutDealFields',    //array
    }),
  },
    methods:{
      get_deal_transfer(){
        if(Object.keys(this.compare).length == 0){ console.log("Необходимо загрузить пользователей и сравнить их ID"); return; }
        if(this.dealID.length == 0){ console.log("Необходимо загрузить аписок ID сделок"); return; }
        if(this.getInDealFields.length == 0 || this.getOutDealFields.length == 0){ console.log("Необходимо загрузить/перенести пользовательские поля"); return; }
        this.timer = setInterval(() => {
        if(!this.workIn && !this.workOut){ this.load(); }
          }, 500);
        },
      load(){
        if(this.next >= this.dealID.length){ clearInterval(this.timer); return; }
        this.workIn = true;
        var param = this.dealID[this.next].ID; //21626;
        api.getDealIdBatch({'deal':param})
        .then((rezult) => {
          var deal = rezult.data.result;
          if(this.compare.hasOwnProperty(deal.ASSIGNED_BY_ID)){
            deal.ASSIGNED_BY_ID = this.compare[deal.ASSIGNED_BY_ID];
          }
          else{ deal.ASSIGNED_BY_ID = 1; }
          this.workOut = true;
          api.setDealIdBatch({ 'rezult':deal })
            .then((rez) => { console.log(rez.data.result); this.workOut = false; })
            .catch((erro) => { console.log(erro); this.workOut = false; clearInterval(this.timer); })

          this.next++;
          this.workIn = false;
        })
        .catch((err) => {
          console.log(err);
          clearInterval(this.timer);
          this.workIn = false;
        });
      },
  }
}
</script>

<style scoped>
.container{
  display: grid;
  width: 1200px;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.hedder{
  grid-column: span 2;
}
</style>
