<template>
  <div>
    <nav>
      <RouterLink to="/" class="nav">Главная</RouterLink>
      <RouterLink to="/settings" class="nav">Настройки</RouterLink>
      <RouterLink to="/users" class="nav">Пользователи</RouterLink>
      <RouterLink to="/deal" class="nav">Парам-Сделки</RouterLink>
      <RouterLink to="/dealload" class="nav">Загрузка-Сделок</RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {

    }
  },
  methods: {

    },
}
</script>

<style scoped>
nav {
  position: sticky;
  top: 1px;
}
.nav{
  background-color: antiquewhite;
}
.nav:focus{ background-color: white; }
</style>
