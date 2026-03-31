
const routes = [
  { path:'/', component: () => import('@/components/startPage.vue') },
   { path:'/about', component: () => import('@/components/about.vue') },
  { path:'/bx24', component: () => import('@/components/startPage.vue') },
  /*{ path:'/deal', component: () => import('@/components/deal.vue') },
  { path:'/dealload', component: () => import('@/components/dealload.vue') },
  { path:'/idload', component: () => import('@/components/idload.vue') },
  { path:'/company', component: () => import('@/components/company.vue') },
  { path:'/contacts', component: () => import('@/components/contacts.vue') },
  { path:'/correct', component: () => import('@/components/correct.vue') }, */
];

export default routes;
