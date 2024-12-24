
<template>
  <div>
    <p> Сервер источник {{VITE_SOURCE_IP}}</p>
    <p> Сервер приёмник {{VITE_RECEIVE_IP}}</p>
  </div>
</template>

<script>

  export default {
    name:'StPage',
    data(){
      return{
        VITE_SOURCE_IP:import.meta.env.VITE_SOURCE_IP,
        VITE_RECEIVE_IP:import.meta.env.VITE_RECEIVE_IP
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>
</style>
