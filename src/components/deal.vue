<template>
  <div class="container">
    <div>
      <table class="table">
        <tr>
          <th><p>IN Пользовательские поля</p></th>
          <th>
            <button @click="get_user_fields()" :disabled="isDisabled">Загрузить Пользовательские поля</button>
          </th>
        </tr>
        <tr>
          <th>Всего</th>
          <td>{{ total }}</td>
        </tr>
      </table>
      <br>
      <table>
        <thead>
          <tr>
            <th>FIELD_NAME</th>
            <th>USER_TYPE_ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fld in in_fields" :key="fld.ID">
            <td>{{ fld.FIELD_NAME }}</td>
            <td>{{ fld.USER_TYPE_ID }}</td>
            <td><button @click="outloadfields(fld.ID)" :disabled="fld.ok">Отправить</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <table class="table">
        <tr>
          <th><p>OUT Пользовательские поля</p></th>
          <th>
            <button @click="get_user_fields_out()" :disabled="isOutDisabled">Загрузить Пользовательские поля</button>
          </th>
        </tr>
        <tr>
          <th>Всего</th>
          <td>{{ outtotal }}</td>
        </tr>
      </table>
      <table>
        <thead>
          <tr>
            <th>FIELD_NAME</th>
            <th>USER_TYPE_ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fld in out_fields" :key="fld.ID">
            <td>{{ fld.FIELD_NAME }}</td>
            <td>{{ fld.USER_TYPE_ID }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <table class="table">
        <tr>
          <th><p>IN Сделки</p></th>
          <th>
            <button @click="get_deal_list()" :disabled="isDisabledFields">Загрузить ID Сделок</button>
          </th>
        </tr>
        <tr>
          <th>Всего</th>
          <td>{{ totalDealList }}</td>
        </tr>
        <tr>
          <th>Загружено</th>
          <td>{{ resultDeal.length }}</td>
        </tr>
        <tr>
          <th>Загрузка с номера</th>
          <td>{{ nextDeal }}</td>
        </tr>
        <tr>
          <th>Запрос</th>
          <td>{{ work }}</td>
        </tr>
      </table>
      <br>

    </div>
    <div>
    </div>
  </div>
</template>

<script>
import api from './ApoService.js';
export default {
  name:'deal-list',
  data(){
    return{
      isDisabled:false,
      isOutDisabled:false,
      in_fields:[],
      out_fields:[],
      total:1,
      outtotal:1,

      isDisabledFields:false,
      resultDeal:[],
      totalDealList: 1,
      nextDeal:1,
      work:false,
      timer:null,

      compare:{},
      keyss:{},
    }
  },
  computed:{
    letsave(){
      if(Object.keys(this.compare).length != 0 & this.resultDeal.length > 0){ return false; }else return true;
      //return false;
    },
  },
  methods:{
    get_deal_list(){
      if(this.totalDealList == this.resultDeal.length) { console.log("Загружены все сделки"); alert("Загружены все сделки"); return; }
      this.isDisabledFields = true;
      this.timer = setInterval(() => {
        if(!this.work){ this.getOnTimer(); }
      }, 1000);
    },

    getOnTimer(){
      this.work = true;
      api.getDealList({'next':this.nextDeal})
      .then((res) => {
        this.totalDealList = res.data['total'];
        res.data['result'].forEach((elem) => {
          this.resultDeal.push(elem);
        });
        this.nextDeal = res.data['next'];
        this.work = false;
        if(this.totalDealList == this.resultDeal.length) {
          console.log("Загрузка завершена, таймер остановлен.");
          clearInterval(this.timer);
          this.isDisabledFields = false;
          this.$store.dispatch('setDeal', this.resultDeal);
        }
      })
      .catch((err) => {
        console.log(err);
        this.work = false;
        this.isDisabledFields = false;
        clearInterval(this.timer);
      })
    },

    get_user_fields(){
      if(this.in_fields.length == this.total) { alert("Загружены все данные"); return; }
      this.isDisabled = true;
      api.get_dealfields({'source':0})
      .then((res) => {
        if(!res.data['result']){ alert("Нет данных"); return;}
        this.total = res.data['total'];
        res.data['result'].forEach(elem => {
          this.in_fields.push(elem);
        });
        this.isDisabled = false;
        this.saveStore();
      })
      .catch((err) => {
        console.log(err);
        this.isDisabled = false;
      });
    },
    get_user_fields_out(){
      if(this.out_fields.length == this.total) { alert("Загружены все данные"); return; }
      this.isOutDisabled = true;
      api.get_dealfields({'source':1})
      .then((res) => {
        if(!res.data['result']){ alert("Нет данных"); return;}
        this.outtotal = res.data['total'];
        res.data['result'].forEach(elem => {
          this.out_fields.push(elem);
        });
        this.isOutDisabled = false;
        this.outsaveStore();
      })
      .catch((err) => {
        console.log(err);
        this.isOutDisabled = false;
      });
    },
    saveStore(){
      this.$store.dispatch('setInDealFields', this.in_fields);
    },
    outsaveStore(){
      this.$store.dispatch('setOutDealFields', this.out_fields);
    },
    outloadfields(id){
      var field = null;
      this.in_fields.forEach((el) => {
        if(el.ID == id){ field = el; }
      });
      if(field != null){
        api.dealID({'id':id})
        .then((res) => {
          api.setdealfields(res.data['result'])
          .then((res2) => {
            console.log(res2);
            this.out_fields.push(field);
            this.outsaveStore();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            field = null;
          })
        })
      }
    },

  },
  mounted(){
    if(this.$store.state.InDealFields.length > 0){ this.in_fields = this.$store.getters.getInDealFields; this.isDisabled = true; };
    if(this.$store.state.OutDealFields.length > 0){ this.out_fields = this.$store.getters.getOutDealFields; this.isOutDisabled = true; };
    if(this.$store.state.deal.length > 0){ this.resultDeal = this.$store.getters.getDeal; }
    this.compare = this.$store.getters.getCompare;
 },
}
</script>

<style scoped>
.container{
  display: grid;
  width: 1200px;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>
