import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../components/Home-View.vue'
import AccountmView from '../components/Accountm-View.vue'
import LoginView from '../components/auth/Login-View.vue'
import global_ from '../components/config/Global-View.vue'


Vue.use(VueRouter)
// 定義全域變數
Vue.prototype.GLOBAL = global_//掛載到Vue例項上面

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
    meta:{
      keepAlive: false
    }
  },
  {
    path: '/Home',
    name: 'Home',
    component: HomeView,
    meta:{
      keepAlive: true
    }
  },
  {
    path: '/Accountm',
    name: 'Accountm',
    component: AccountmView,
    meta:{
      keepAlive: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
