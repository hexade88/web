
const routes = [
  { path:'/', component: () => import('@/components/startPage.vue') },
  { path:'/settings', component: () => import('@/components/settings.vue') },
  { path:'/users', component: () => import('@/components/users.vue') },
  { path:'/deal', component: () => import('@/components/deal.vue') },
];

export default routes;
