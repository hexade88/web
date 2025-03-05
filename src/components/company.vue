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
            <th>Перенести</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ total }}</td>
            <td>{{ next }}</td>
            <td>{{ work }}</td>
            <td><button @click="get_company_list()" :disabled="isDisabled">Загрузить</button></td>
            <td><button :disabled="letsave">Перенести</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      {{ companys.length }}
    </div>
  </div>
</template>

<script>
import api from './ApoService.js';
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
    }
  },
    methods:{
      get_company_list(){
        if(this.total <= this.companys.length) {  console.log("Загружены все данные"); alert("Загружены все данные"); return; }
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
            this.companys.push(elem);
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
  },
  mounted(){
    this.companys = this.$store.getters.getCompanys;
  },
  computed:{
    letsave(){
      if(this.companys.length != 0){ return false; }else return true;
    },
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
