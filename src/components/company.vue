<template>
  <div class="container">
    <div>
      <div class="header">Компании</div>
      <table>
        <thead>
          <tr>
            <th>Всего</th>
            <th>Метка переноса</th>
            <th>Запрос</th>
            <th>Загрузить</th>
            <th>Запрос доп поля</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ total }}</td>
            <td>{{ next }}</td>
            <td>{{ work }}</td>
            <td><button @click="get_company_list()" :disabled="isDisabled">Загрузить список компаний</button></td>
            <td><button @click="get_company_UF()">Загрузить доп поля и перенести на нов сервер</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <table>
        <thead>
          <tr><th>Кол-во Компаний</th><th>Кол-во пользов. полей</th><th>Счётчик Переноса</th></tr>
        </thead>
        <tbody>
          <tr><td>{{ companys.length }}</td><td>{{ UF_count }}</td><td>0</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from './ApoService.js';
import { mapGetters } from 'vuex';
export default {
  name:'company-load',
  data(){
    return{
      total:1,
      next:1,
      work:false,
      companys:[],
      isDisabled:false,
      timer:null,

      UF_count:0,
      timer2:null,
    }
  },
    methods:{
      get_company_UF(){
        if(this.companys.length < 1){ alert("Загрузите сначало список компаний"); return;  }
        //если счётчик добавления пользов.полей меньше то продалжаем запросы
        if(this.UF_count != this.companys.length) {
          this.timer2 = setInterval(() => {
            if(!this.work){ this.get_UF(); }
          }, 500);
        }

      },
      get_UF(){
        this.work = true;
        api.getCompanyID({ 'ID': this.companys[this.UF_count].ID, 'source': 0 })
        .then((rez) => {
          this.companys[this.UF_count].UF_CRM_1742114557 = rez.data.result.UF_CRM_1512640381;
          this.companys[this.UF_count].UF_CRM_1742114596 = rez.data.result.UF_CRM_1512641006;
          this.companys[this.UF_count].UF_CRM_1742114623 = rez.data.result.UF_CRM_1515150501;
          this.set_company(this.UF_count);
          this.UF_count ++;
          if(this.UF_count == this.companys.length){ clearInterval(this.timer2); }
          this.work = false;
        }).catch((err) => {
          console.log(err);
          this.work = false;
          clearInterval(this.timer2);
        })
      },


      get_company_list(){
        if(this.total <= this.companys.length) {  console.log("Загружены все данные"); alert("Загружены все данные"); return; }
        if(Object.keys(this.compare).length < 1) {  console.log("Загружены все данные"); alert("Загрузите пользователей и сравните их"); return; }
        if(this.total == this.companys.length) { alert("Все компании загружены"); return; }
        this.isDisabled = true;
        this.timer = setInterval(() => {
          if(!this.work){ this.get_timer(); }
          }, 1000);
      },

      get_timer(){
        this.work = true;
        api.getCompanyList({'next':this.next})
        .then((res) => {
          this.total = res.data['total'];
          res.data['result'].forEach((elem) => {
            var company = elem;

            company.UF_CRM_1742107565 = company.ID;

            if(this.compare.hasOwnProperty(company.ASSIGNED_BY_ID)){
              company.ASSIGNED_BY_ID = this.compare[company.ASSIGNED_BY_ID];
            }else{ company.ASSIGNED_BY_ID = 1; }

            if(this.compare.hasOwnProperty(company.CREATED_BY_ID)){
              company.CREATED_BY_ID = this.compare[company.CREATED_BY_ID];
            }else{ company.CREATED_BY_ID = 1; }

            if(this.compare.hasOwnProperty(company.MODIFY_BY_ID)){
              company.MODIFY_BY_ID = this.compare[company.MODIFY_BY_ID];
            }else{ company.MODIFY_BY_ID = 1; }

            if(this.compare.hasOwnProperty(company.LAST_ACTIVITY_BY)){
              company.LAST_ACTIVITY_BY = this.compare[company.LAST_ACTIVITY_BY];
            }else{ company.LAST_ACTIVITY_BY = 1; }

            this.companys.push(company);
          });
          this.next = res.data['next'];
          this.work = false;
          if(this.total == this.companys.length) {
            console.log("Загрузка завершена, таймер остановлен.");
            clearInterval(this.timer);
            this.isDisabled = false;
            this.$store.dispatch('setCompanys', this.companys);
          }
        })
        .catch((err) => {
          console.log(err);
          this.work = false;
          this.isDisabled = false;
          clearInterval(this.timer);
        })
      },
      set_company(num){
        api.setCompany({'rezult':this.companys[num]})
        .then()
        .catch((err) => {
          console.log(err);
        })
      },
  },
  mounted(){
    this.companys = this.$store.getters.getCompanys;
  },
  computed:{
    letsave(){
      if(this.companys.length != 0){ return false; }else return true;
    },
    ...mapGetters({
      compare : 'getCompare',
    }),
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
.hedder{
  grid-column: span 2;
  margin: 10px;
  font-size: xx-large;
}
</style>
