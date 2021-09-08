
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/ListPage.vue') 
      },
      { 
        path: '/settings', 
        component: () => import('pages/SettingsPage.vue') 
      },
      { 
        path: '/help', 
        component: () => import('pages/HelpPage.vue') 
      },
      { 
        path: '/auth', 
        component: () => import('pages/AuthPage.vue') 
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
