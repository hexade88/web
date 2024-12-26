
<template>
  <div>
    <p> Сервер источник {{ SOURCE_IP }}</p>
    <p> Сервер приёмник {{ RECEIVE_IP }}</p>
  </div>
</template>

<script>
import api from './ApoService.js'
  export default {
    name:'StPage',
    data(){
      return{
        SOURCE_IP:"",
        RECEIVE_IP:"",
      }
    },
    mounted(){
      api.get_servers()
      .then((res) => {
        this.SOURCE_IP = res.data.servers.SOURCE_IP;
        this.RECEIVE_IP = res.data.servers.RECEIVE_IP;
        console.log(this.SOURCE_IP);
      });
    }
  }
</script>

<style scoped>
</style>
