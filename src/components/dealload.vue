<template>
  <div class="container">
    <div class="hedder">
      <div> <p>Список id сделок для переноса {{ dealID.length }}</p> </div>
      <div> <p>Сравнение пользователей для подмены id в сделках {{ Object.keys(compare).length }}</p> </div>
      <div> <p>Пользовательские поля {{ getInDealFields.length }} - {{ getOutDealFields.length }}</p> </div>
    </div>
    <div><button @click="get_deal_transfer()" :disabled="isLoad">Выполнить перенос</button></div>
    <div>
      <p>Кол-во сделок за 1 запрос </p>{{ this.step }}
      <p>Работа ведётся - запрос </p>{{ this.workIn }}
      <p>Работа ведётся - сохранение </p>{{ this.workOut }}
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
      step: 2,
      next: 0,
      workIn:false,
      workOut:false,
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
        this.workIn = true;
        this.load();
        this.workIn = false;
      },
      load(){
        var param = {}
        for(var i = 0; i < this.step; i++){
          var name = 'deal_' + this.dealID[this.next].ID;
          param[name] = 'crm.deal.get?ID=' + this.dealID[this.next].ID ;
          this.next ++;
        };
        api.getDealIdBatch({'deals':param})
        .then((rezult) => {
          console.log(rezult);
        })
        .catch((err) => {
          console.log(err);
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
