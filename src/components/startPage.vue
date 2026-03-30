
<template>
  <div>
    {{ variable }}
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

var variable = ref('');

onMounted(() => {
  window.onload = function(){
    console.log(window.B24Js);
   window.B24Js.init(function () {
      var placementInfo = window.B24Js.placement.info();
       variable.value = placementInfo["options"];
      console.log(placementInfo["options"].ID); 
    });
  }
});

</script>

<style scoped>

</style>
