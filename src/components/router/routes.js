
const routes = [
  { path:'/', component: () => import('@/components/startPage.vue') },
  { path:'/settings', component: () => import('@/components/settings.vue') },
  { path:'/users', component: () => import('@/components/users.vue') },
];

export default routes;
