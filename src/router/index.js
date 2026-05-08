import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/layout/AppLayout.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'RegistrationHome',
          component: () => import('@/views/registration/RegistrationHome.vue'),
        },
        {
          path: 'me',
          name: 'PersonalCenter',
          component: () => import('@/views/info-center/me/Me.vue'),
        },
        {
          path: 'appointment',
          name: 'AppointmentRegistration',
          component: () => import('@/views/registration/AppointmentRegistration.vue'),
        },
        {
          path: 'patient',
          name: 'PatientManage',
          component: () => import('@/views/user/PatientManage.vue')
        },
        {
          path: 'record',
          name: 'Record',
          component: () => import('@/views/medical-record/MyMedicalRecord.vue')
        },
        {
          path: 'user-registration',
          name: 'UserRegistration',
          component: () => import('@/views/registration/UserRegistration.vue')
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('@/views/user/UserManager.vue')
        },
        {
          path: 'admin/doctor-add',
          name: 'DoctorAdd',
          component: () => import('@/views/user/DoctorRegister.vue')
        },
        {
          path: 'admin/doctor-schedule',
          name: 'DoctorSchedule',
          component: () => import('@/views/schedule/DoctorSchedule.vue')
        },
        {
          path: 'admin/schedule-assist',
          name: 'ScheduleAssist',
          component: () => import('@/views/schedule/ScheduleAssist.vue')
        },
        {
          path: 'doctor/schedule',
          name: 'ScheduleView',
            component: () => import('@/views/schedule/ScheduleView.vue')
        }
      ],
      meta: {
        requiresAuth: true
      }
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
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    },
    {
      path: '/404',
      name: 'Not Found',
      component: () => import('@/views/404.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/test.vue'),
    }
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    return '/login'
  }

  if (to.path === '/login' && token) {
    return '/'
  }
})

export default router
