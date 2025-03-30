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
      STAGE: 'getSTAGE',
      CATEGORY: 'getCATEGORY',
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
        api.getDealIdBatch({'deal':param, source:0,})
        .then((rezult) => {
          var deal = rezult.data.result;

          if(this.CATEGORY.hasOwnProperty(deal.CATEGORY_ID)){
            deal.CATEGORY_ID = this.CATEGORY[deal.CATEGORY_ID];
          }

          if(this.STAGE.hasOwnProperty(deal.STAGE_ID)){
            deal.STAGE_ID = this.STAGE[deal.STAGE_ID];
          }else{console.log(param, deal.STAGE_ID);}

          if(this.compare.hasOwnProperty(deal.ASSIGNED_BY_ID)){
            deal.ASSIGNED_BY_ID = this.compare[deal.ASSIGNED_BY_ID];
          }else{ deal.ASSIGNED_BY_ID = 1; }

          if(this.compare.hasOwnProperty(deal.UF_CRM_1600087700)){
            deal.UF_CRM_1600087700 = this.compare[deal.UF_CRM_1600087700];
          }else{ deal.UF_CRM_1600087700 = 1; }

          if(this.compare.hasOwnProperty(deal.UF_CRM_1512624847)){
            deal.UF_CRM_1512624847 = this.compare[deal.UF_CRM_1512624847];
          }else{ deal.UF_CRM_1512624847 = 1; }

          if(this.compare.hasOwnProperty(deal.UF_CRM_1542607606)){
            deal.UF_CRM_1542607606 = this.compare[deal.UF_CRM_1542607606];
          }else{ deal.UF_CRM_1542607606 = 1; }

          if(this.compare.hasOwnProperty(deal.UF_CRM_1542607696)){
            deal.UF_CRM_1542607696 = this.compare[deal.UF_CRM_1542607696];
          }else{ deal.UF_CRM_1542607696 = 1; }

          if(this.compare.hasOwnProperty(deal.UF_CRM_1512624758)){  //Инженер
            deal.UF_CRM_1512624758 = this.compare[deal.UF_CRM_1512624758];
          }else{ deal.UF_CRM_1512624758 = 1; }

          if(this.compare.hasOwnProperty(deal.CREATED_BY_ID)){
            deal.CREATED_BY_ID = this.compare[deal.CREATED_BY_ID];
          }else{ deal.CREATED_BY_ID = 1; }

          if(this.compare.hasOwnProperty(deal.MOVED_BY_ID)){
            deal.MOVED_BY_ID = this.compare[deal.MOVED_BY_ID];
          }else{ deal.MOVED_BY_ID = 1; }

          if(this.compare.hasOwnProperty(deal.LAST_ACTIVITY_BY)){
            deal.LAST_ACTIVITY_BY = this.compare[deal.LAST_ACTIVITY_BY];
          }else{ deal.LAST_ACTIVITY_BY = 1; }

          if(deal.UF_CRM_1512626819.length > 0){
            var arr = [];
            deal.UF_CRM_1512626819.forEach(element => {
              if(this.compare.hasOwnProperty(element)){ arr.push(this.compare[element]) }
              else{ arr.push(1); }
            });
            if(arr.includes(1)){ deal.UF_CRM_1512626819 = [1,]; }
            else{ deal.UF_CRM_1512626819 = arr;}
          }

          if(this.compare.hasOwnProperty(deal.MODIFY_BY_ID)){
            deal.MODIFY_BY_ID = this.compare[deal.MODIFY_BY_ID];
          }else{ deal.MODIFY_BY_ID = 1; }

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
