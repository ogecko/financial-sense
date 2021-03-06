
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'equity/:ticker?', component: () => import('pages/Equity.vue') },
      { path: 'portfolio', component: () => import('pages/Portfolio.vue') },
      { path: 'palette', component: () => import('pages/Palette.vue') },
      { path: 'home', component: () => import('pages/Home.vue') }
    ]
  },
  { path: '/movies', component: () => import('pages/Movies.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
