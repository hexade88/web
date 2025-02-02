
const routes = [
  { path:'/', component: () => import('@/components/startPage.vue') },
  { path:'/settings', component: () => import('@/components/settings.vue') },
  { path:'/users', component: () => import('@/components/users.vue') },
  { path:'/deal', component: () => import('@/components/deal.vue') },
  { path:'/dealload', component: () => import('@/components/dealload.vue') },
];

export default routes;
