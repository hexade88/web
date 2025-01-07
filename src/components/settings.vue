
<template>
  <div>
    <h3>
      Settings
    </h3>
    <div>
      <p>{{ webhook }}</p>
    </div>
  </div>
</template>

<script>
import api from './ApoService.js'
  export default {
    name:'StPage',
    data(){
      return {
        webhook:"undefined",
      }
    },
    mounted(){
      this.get_user();
    },
    methods:{
      get_user(){
        api.get_webhook()
        .then((res) => {
          if(!res.data['result']){ this.webhook = "Нет данных"; return;}
          //res.data['result'].
          this.webhook = res.data['result'].length;
      });
      }
    },
  }
</script>

<style scoped>

</style>
