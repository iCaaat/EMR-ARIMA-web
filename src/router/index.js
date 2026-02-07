import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/layout/AppLayout.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'RegistrationHome',
          component: () => import('../views/registration/RegistrationHome.vue'),
          meta: {
            title: '首页',
            icon: 'House'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/Login.vue')
    },
    {
      path: '/register',
      name: 'RegisterLayout',
      component: () => import('../views/auth/Register.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/test.vue'),
    }
  ],
})

export default router
