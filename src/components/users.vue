<template>
  <div class="container">
    <div>
      <table class="table">
        <tr>
          <th><p>IN</p></th>
          <th><button @click="get_in_user()" :disabled='isDisabled'>загрузить</button></th>
        </tr>
        <tr>
          <th>Всего</th>
          <td>{{ total }}</td>
        </tr>
        <tr>
          <th>Счётчик</th>
          <td>{{ count }}</td>
        </tr>
        <tr>
          <th>Загружено</th>
          <td>{{ webhook.length }}</td>
        </tr>
      </table>
      <br>
      <table class="table">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>ID</th>
            <th>NEW_ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="wh in lookWH" :key="wh.ID">
            <td>{{ wh.NAME }} {{ wh.LAST_NAME }}</td>
            <td>{{ wh.ID }}</td>
            <td>{{ wh.NEW_ID }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <table class="table">
        <tr>
          <th><p>OUT</p></th>
          <th><button @click="get_out_user()" :disabled='outisDisabled'>загрузить</button></th>
          <th><button @click="compare()">Сравнить</button></th>
        </tr>
        <tr>
          <th>Всего</th>
          <td>{{ outtotal }}</td>
        </tr>
        <tr>
          <th>Счётчик</th>
          <td>{{ outcount }}</td>
        </tr>
        <tr>
          <th>Загружено</th>
          <td>{{ outwebhook.length }}</td>
        </tr>
      </table>
      <br>
      <table class="table">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>ID</th>
            <th>NEW_ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="wh in outwebhook" :key="wh.ID">
            <td>{{ wh.NAME }} {{ wh.LAST_NAME }}</td>
            <td>{{ wh.ID }}</td>
            <td>{{ wh.NEW_ID }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from './ApoService.js';
export default {
  name:'users-employe',
  data(){
      return {
        webhook:[],
        outwebhook:[],
        count:0,
        outcount:0,
        total:1,
        outtotal:1,
        isDisabled:false,
        outisDisabled:false,
      }
    },
  methods:{

    compare(){
      let compareArr = {};
      this.webhook.forEach((elem) => {
        this.outwebhook.forEach((elem2) => {
          if(elem.NAME == elem2.NAME && elem.LAST_NAME == elem2.LAST_NAME){ elem.NEW_ID = elem2.ID; compareArr[elem.ID] = elem2.ID;}
        });
        if(!elem.NEW_ID){ elem.NEW_ID = "1"; compareArr[elem.ID] = "1"; }
      });
      this.saveStore();
      this.$store.dispatch('setCompare', compareArr);
    },

    get_out_user(){
      if(this.outwebhook.length == this.outtotal) { alert("Загружены все данные"); return; }
      this.outisDisabled = true;
      api.get_webhook({'source':1, 'count':this.outcount})
      .then((res) => {
        if(!res.data['result']){ alert("Нет данных"); return;}
        this.outtotal = res.data['total'];
        this.outcount = res.data['next'];
        res.data['result'].forEach(elem => {
          this.outwebhook.push(elem);
        });
        this.outisDisabled = false;
        this.outsaveStore();
      })
      .catch((err) => {
        console.log(err);
        this.outisDisabled = false;
      });
    },

    outsaveStore(){
    this.$store.dispatch('setOutUser', this.outwebhook);
   },

    get_in_user(){
      if(this.webhook.length == this.total) { alert("Загружены все данные"); return; }
      this.isDisabled = true;
      api.get_webhook({'source':0, 'count':this.count})
      .then((res) => {
        if(!res.data['result']){ alert("Нет данных"); return;}
        this.total = res.data['total'];
        this.count = res.data['next'];
        res.data['result'].forEach(elem => {
          this.webhook.push(elem);
        });
        this.isDisabled = false;
        this.saveStore();
    })
    .catch((err) => {
      console.log(err);
      this.isDisabled = false;
    });
   },
   saveStore(){
    this.$store.dispatch('setInUser', this.webhook);
   }
 },
 mounted(){
  if(this.$store.state.in_users.length > 0){ this.webhook = this.$store.getters.getInUser; this.isDisabled = true; };
  if(this.$store.state.out_users.length > 0){ this.outwebhook = this.$store.getters.getOutUser; this.outisDisabled = true; };
 },
 computed:{
    lookWH(){
      return this.$store.getters.getInUser;
    }
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
.table {
	width: 100%;
	margin-bottom: 20px;
	border: 1px solid #dddddd;
	border-collapse: collapse;
  th {
   font-weight: bold;
   padding: 5px;
   background: #efefef;
   border: 1px solid #dddddd;
 }
  td {
   border: 1px solid #dddddd;
   padding: 5px;
 }
}
</style>
