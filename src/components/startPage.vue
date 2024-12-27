
<template>
  <div>
    <p> Сервер источник {{ getServers.SOURCE_IP }}</p>
    <p> Сервер приёмник {{ getServers.RECEIVE_IP }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";;
  export default {
    name:'StPage',
    data(){
      return{

      }
    },
    mounted(){
      this.$store.dispatch('setServers');
    },
    computed:{
      ...mapGetters([
        'getServers'
      ])
    }
  }
</script>

<style scoped>

</style>
