<template>
  <div class="container">
    <div>
      <div> <p>Введите id сделки для переноса {{ ID }}</p> </div>
      <div style="float: inline-start;"> <input type="text" v-model.number="ID" ></div>
      <div> <input type="button" value="Найти" @click="find()">  </div>
      <div><button @click="get_deal_transfer()" :disabled="isLoad">Выполнить перенос</button></div>
      <br><br>
      <div>{{ deal }}</div>
    </div>
    <div>{{ deal_new }}</div>
  </div>
</template>

<script>
import api from './ApoService.js';
import { mapGetters } from 'vuex';
export default {
  name:'id-load',
  data(){
    return{
      ID:0,
      isLoad:true,
      deal:{},
      deal_new:{},
    }
  },
  computed:{
    ...mapGetters({
      compare : 'getCompare',
      STAGE: 'getSTAGE',
      CATEGORY: 'getCATEGORY',
    }),
  },
    methods:{
      find(){
        if(this.ID == 0)return;
        api.getDealIdBatch({'deal':this.ID, source:0,})
        .then((rezult) => {
          this.deal = rezult.data.result;
          this.isLoad = false;

          if(this.CATEGORY.hasOwnProperty(this.deal.CATEGORY_ID)){
            this.deal.CATEGORY_ID = this.CATEGORY[this.deal.CATEGORY_ID];
          }

          if(this.STAGE.hasOwnProperty(this.deal.STAGE_ID)){
            this.deal.STAGE_ID = this.STAGE[this.deal.STAGE_ID];
          }else{console.log(this.deal.STAGE_ID);}

          if(this.compare.hasOwnProperty(this.deal.ASSIGNED_BY_ID)){              //Ответственный
            this.deal.ASSIGNED_BY_ID = this.compare[this.deal.ASSIGNED_BY_ID];
          }
          else{ this.deal.ASSIGNED_BY_ID = 1; }

          if(this.compare.hasOwnProperty(this.deal.UF_CRM_1600087700)){
            this.deal.UF_CRM_1600087700 = this.compare[this.deal.UF_CRM_1600087700];
          }
          else{ this.deal.UF_CRM_1600087700 = 1; }

          if(this.compare.hasOwnProperty(this.deal.UF_CRM_1512624847)){
            this.deal.UF_CRM_1512624847 = this.compare[this.deal.UF_CRM_1512624847];
          }
          else{ this.deal.UF_CRM_1512624847 = 1; }

          if(this.compare.hasOwnProperty(this.deal.UF_CRM_1542607606)){
            this.deal.UF_CRM_1542607606 = this.compare[this.deal.UF_CRM_1542607606];
          }
          else{ this.deal.UF_CRM_1542607606 = 1; }

          if(this.compare.hasOwnProperty(this.deal.UF_CRM_1542607696)){
            this.deal.UF_CRM_1542607696 = this.compare[this.deal.UF_CRM_1542607696];
          }
          else{ this.deal.UF_CRM_1542607696 = 1; }

          if(this.compare.hasOwnProperty(this.deal.UF_CRM_1512624758)){  //Инженер
            this.deal.UF_CRM_1512624758 = this.compare[this.deal.UF_CRM_1512624758];
          }
          else{ this.deal.UF_CRM_1512624758 = 1; }

          if(this.compare.hasOwnProperty(this.deal.CREATED_BY_ID)){
            this.deal.CREATED_BY_ID = this.compare[this.deal.CREATED_BY_ID];
          }
          else{ this.deal.CREATED_BY_ID = 1; }

          if(this.compare.hasOwnProperty(this.deal.MOVED_BY_ID)){
            this.deal.MOVED_BY_ID = this.compare[this.deal.MOVED_BY_ID];
          }
          else{ this.deal.MOVED_BY_ID = 1; }

          if(this.compare.hasOwnProperty(this.deal.LAST_ACTIVITY_BY)){
            this.deal.LAST_ACTIVITY_BY = this.compare[this.deal.LAST_ACTIVITY_BY];
          }
          else{ this.deal.LAST_ACTIVITY_BY = 1; }

          if(this.deal.UF_CRM_1512626819.length > 0){
            var arr = [];
            this.deal.UF_CRM_1512626819.forEach(element => {
              if(this.compare.hasOwnProperty(element)){ arr.push(this.compare[element]) }
              else{ arr.push(1); }
            });
            if(arr.includes(1)){ this.deal.UF_CRM_1512626819 = [1,]; }
            else{ this.deal.UF_CRM_1512626819 = arr;}
          }

          if(this.compare.hasOwnProperty(this.deal.MODIFY_BY_ID)){
            this.deal.MODIFY_BY_ID = this.compare[this.deal.MODIFY_BY_ID];
          }
          else{ this.deal.MODIFY_BY_ID = 1; }

        })
        .catch((err) => {
          console.log(err);
          this.isLoad = true;
        });
      },
      get_deal_transfer(){
        if(Object.keys(this.compare).length < 1){ alert("Загрузите пользователей"); return; }
        api.setDealIdBatch({ 'rezult':this.deal })
            .then((rez) => {
              api.getDealIdBatch({'deal':rez.data.result, source:1,})
              .then((rezult) => { this.deal_new = rezult.data.result; })
            })
            .catch((erro) => { console.log(erro);})
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
