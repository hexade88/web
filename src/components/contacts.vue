<template>
  <div class="container">
    <div>
      <div class="header">Контакты</div>
      <table>
        <tbody>
          <tr><th>Всего</th><td>{{ total }}</td></tr>
          <tr><th>Метка переноса</th><td>{{ next }}</td></tr>
          <tr><th>Запрос</th><td>{{ work }}</td></tr>
          <tr><th>Загрузить Контакты</th><td><button @click="get_contacts_list()" :disabled="isDisabled">Загрузить</button></td></tr>
          <tr><th>Загрузить Связи компаний</th><td><button @click="get_company_relations()" >Загрузить</button></td></tr>
          <tr><th>Перенести Контакты</th><td><button @click="set_contacts()" :disabled="letsave">Перенести</button></td></tr>
        </tbody>
      </table>
    </div>
    <div>
      <table>
        <tbody>
          <tr><th>Контакты</th><td>{{ contacts.length }}</td><td></td></tr>
          <tr><th>Связи с компанией</th><td>{{ Object.keys(compareCompanys).length }}</td><td></td></tr>
          <tr><th>Загрузка связей</th><td>{{ work2 }}</td><td></td></tr>
          <tr><th>Перенос контактов</th><td>{{ work3 }}</td><td>{{ setCount }}</td></tr>
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
      work2:false,
      work3:false,
      contacts:[],
      isDisabled:false,
      timer:null,
      timer2:null,
      timer3:null,
      compareCompanys:{},
      companys:[],
      companyCount:0,
      setCount:0,
    }
  },
    methods:{
      set_contacts(){
        if(this.companys.length == 0){ alert("Загрузите компании"); return; }
        if(this.contacts.length == 0){ alert("Загрузите Контакты для переноса"); return; }
        if(this.contacts == this.setCount){ alert("Перенос выполнен ранее"); return; }
        if(this.contacts.length == 0){ alert("Загрузите Контакты для переноса"); return; }
        this.timer3 = setInterval(() => {
          if(!this.work3){ this.set_con(); }
          }, 500);
      },
      set_con(){
        this.work3 = true;
        var contact = this.contacts[this.setCount];
        if(this.compareCompanys.hasOwnProperty(contact.COMPANY_ID)){
          contact.COMPANY_ID = this.compareCompanys[contact.COMPANY_ID];
        } else{ contact.COMPANY_ID = 0; }
        api.setContact({'rezult':contact})
        .then((rez) => {
          this.setCount ++;
          if(this.contacts == this.setCount){ clearInterval(this.timer3); }
          this.work3 = false;
        })
        .catch((err) => {
          clearInterval(this.timer3);
          this.work3 = false;
          console.log(err);
        })
      },
      get_company_relations(){
        if(this.companys.length == 0) { alert("Загрузите список компаний"); return; }
        if(this.companyCount == this.companys.length){ alert("Загрузка выполнена"); return;  }
        this.timer2 = setInterval(() => {
          if(!this.work2){ this.getRelations(); }
          }, 500);

      },
      getRelations(){
        this.work2 = true;
        api.getCompanyID({ 'ID': this.companys[this.companyCount].ID, 'source': 1}) //грузим с нового так как там есть и старый id и новый
                                                                                    // (this.companys должен содержать id сделок нового битрикса)
        .then((rez) => {
          this.compareCompanys[rez.data.result.UF_CRM_1742107565] = rez.data.result.ID   //{старый id: новый id}
          //console.log(rez.data.result.UF_CRM_1742107565, rez.data.result.ID);
          this.work2 = false;
          this.companyCount ++;
          if(this.companyCount == this.companys.length) { clearInterval(this.timer2); console.log("clearInterval") }
        })
        .catch((err) => {
          this.work2 = false;
          clearInterval(this.timer2);
          console.log(err);
        })
      },
      get_contacts_list(){
        if(this.total <= this.contacts.length) {  console.log("Загружены все данные"); alert("Загружены все данные"); return; }
        this.isDisabled = true;
        this.timer = setInterval(() => {
          if(!this.work){ this.get_timer(); }
          }, 500);
      },

      get_timer(){
        this.work = true;
        api.getContactList({'next':this.next})
        .then((res) => {
          this.total = res.data['total'];
          res.data['result'].forEach((elem) => {

            var cont = elem;
            cont.UF_CRM_1742134416 = cont.ID;

            if(this.compare.hasOwnProperty(cont.ASSIGNED_BY_ID)){
              cont.ASSIGNED_BY_ID = this.compare[cont.ASSIGNED_BY_ID];
            }else{ cont.ASSIGNED_BY_ID = 1; }

            if(this.compare.hasOwnProperty(cont.CREATED_BY_ID)){
              cont.CREATED_BY_ID = this.compare[cont.CREATED_BY_ID];
            }else{ cont.CREATED_BY_ID = 1; }

            if(this.compare.hasOwnProperty(cont.MODIFY_BY_ID)){
              cont.MODIFY_BY_ID = this.compare[cont.MODIFY_BY_ID];
            }else{ cont.MODIFY_BY_ID = 1; }

            if(this.compare.hasOwnProperty(cont.LAST_ACTIVITY_BY)){
              cont.LAST_ACTIVITY_BY = this.compare[cont.LAST_ACTIVITY_BY];
            }else{ cont.LAST_ACTIVITY_BY = 1; }

            this.contacts.push(cont);

          });
          this.next = res.data['next'];
          this.work = false;
          if(this.total == this.contacts.length) {
            console.log("Загрузка завершена, таймер остановлен.");
            clearInterval(this.timer);
            this.isDisabled = false;
            this.$store.dispatch('setContacts', this.contacts);
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
    //this.contacts = this.$store.getters.getContacts;
    this.companys = this.$store.getters.getCompanys;
  },
  computed:{
    letsave(){
      if(this.contacts.length != 0){ return false; }else return true;
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
