<template>
  <div class="container">
    <div class="hedder">
      <br>
      <button @click="loadID()">Загрузить сделки нов.битрикса</button>
      <button @click="get_bugfix()">Запустить правки</button>
    </div>
    <div>
      <p>Кол-во Сделок</p>{{ this.deals_list.length }}
      <p>Всего для загрузки Сделок </p>{{ this.totalDealList }}
      <p>Всего Сделок обработано </p>{{ this.next }}
    </div>
  </div>
</template>

<script>
import api from './ApoService.js';
import { mapGetters } from 'vuex';
export default {
  name:'correct-deal',
  data(){
    return{
      timer: null,
      work: false,
      next: 0,
      obj: {},

      deals_list:[],
      deal_work:false,
      totalDealList:1,   //Всего - для выгрузки
      hextDealList:1,    //счётчик с которого начнётся следующая пачка для загрузки
      timer_deal:{},
    }
  },
  computed:{
    ...mapGetters({
      SROK_DEAL:'SROK_DEAL',
      CONTACTS: 'CONTACTS',
      COMPANYS: 'COMPANYS'
    }),
  },
    methods:{
      loadID(){
        if(this.totalDealList == this.deals_list.length) { console.log("Загружены все сделки"); alert("Загружены все сделки"); return; }
        this.timer_deal = setInterval(() => {
          if(!this.deal_work){ this.getOnTimer(); }
        }, 500);
      },

      getOnTimer(){
        this.deal_work = true;
        api.getAllDealNewBX({'next':this.hextDealList})
        .then((res) => {
          this.totalDealList = res.data['total'];
          res.data['result'].forEach((elem) => {
            this.deals_list.push(elem);
          });
          this.hextDealList = res.data['next'];
          this.deal_work = false;
          if(this.totalDealList == this.deals_list.length) {
            console.log("Загрузка завершена, таймер остановлен.");
            clearInterval(this.timer_deal);
          }
        })
        .catch((err) => {
          console.log(err);
          this.deal_work = false;
          clearInterval(this.timer_deal);
        })
      },


      //---------------------------------

      get_bugfix(){
        this.timer = setInterval(() => {
        if(!this.work){ this.load_bugfix(); }
          }, 500);
        },
      load_bugfix(){
        this.work = true;
        var deal = this.deals_list[this.next];
        this.obj = {};

          if(this.SROK_DEAL.hasOwnProperty(deal.UF_CRM_1530002202)){            //срок сделки
            this.obj.UF_CRM_1530002202 = this.SROK_DEAL[deal.UF_CRM_1530002202];
          }//else{ deal.UF_CRM_1530002202 = ''; }

          if(this.CONTACTS.hasOwnProperty(deal.CONTACT_ID)){                    //контакты
            this.obj.CONTACT_ID = this.CONTACTS[deal.CONTACT_ID];
          }else{ deal.CONTACT_ID = ''; }

          if(this.COMPANYS.hasOwnProperty(deal.COMPANY_ID)){                    //Компания
            this.obj.COMPANY_ID = this.COMPANYS[deal.COMPANY_ID];
          }else{ deal.COMPANY_ID = ''; }

          /* if(deal.UF_CRM_1512626819.length > 0){
            var arr = [];
            deal.UF_CRM_1512626819.forEach(element => {
              if(this.compare.hasOwnProperty(element)){ arr.push(this.compare[element]) }
              else{ arr.push(1); }
            });
            if(arr.includes(1)){ deal.UF_CRM_1512626819 = [1,]; }
            else{ deal.UF_CRM_1512626819 = arr;}
          } */



          api.updDealIdLoad({ 'deal':deal.ID, 'rezult':this.obj })
            .then(() => {
              this.work = false;
              this.next ++;
            })
            .catch((erro) => {
              console.log(erro);
              this.work = false;
              clearInterval(this.timer); })

          if(this.next >= this.deals_list.length){
            console.log("Работа завершена");
            this.work = false;
            clearInterval(this.timer);
          }
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
