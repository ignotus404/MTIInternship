import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import User from '../views/User.vue'
import DiaryViewer from '../views/DiaryViewer.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // ホーム画面
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    // ログイン(新規登録)画面
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login'
      }
    },
    // プロフィール更新画面
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        title: 'Profile'
      }
    },
    // ユーザー一覧画面
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        title: 'User'
      }
    },
    //日記一覧画面
    {
      path:'/diaries',
      name:'diaries',
      component: DiaryViewer,
      meta: 
      {
        title: 'diaries'
      }
    }
  ]
})

const DEFAULT_TITLE = 'TITLE';

router.afterEach((to) => {
  document.title = to.meta.title ?? DEFAULT_TITLE
})

export default router
