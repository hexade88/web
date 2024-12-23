
const routes = [
  { path:'/', component: () => import('@/components/startPage.vue') },
  { path:'/settings', component: () => import('@/components/settings.vue') },
];

export default routes;
