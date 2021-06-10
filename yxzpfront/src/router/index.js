import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import vueX from '../store/index.js'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
	component:login
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
	  path:'/register',
	  name:'register',
	  component:()=>(import(/* webpackChunkName: "hrpage" */ '../views/register.vue'))
  },
  {
	  path:'/hr/:id',
	  name:'hrpage',
	  component: () => import(/* webpackChunkName: "hrpage" */ '../views/hrpage.vue')
  },
  {
	  path:'/position',
	  name :'position',
	  component:()=> import(/* webpackChunkName: "position" */ '../views/position.vue')
  },
  {
	  path:'/chat/:employeeid/:hrid',
	  name:'chat',
	  component:()=>import(/* webpackChunkName: "chat" */ '../views/chat.vue')
  },
  {
	  path:'/chat/:employeeid',
	  name:'chat1',
	  component:()=>import(/* webpackChunkName: "chat" */ '../views/chat.vue')
  },
  {
	  path:'/person',
	  name:'person',
	  component:()=>import(/* webpackChunkName: "person" */ '../views/personmessage.vue')
  },
  {
	  path:'/hrchat',
	  name:'hrchat',
	  component:()=>import(/* webpackChunkName: "hrchat" */ '../views/hrchat.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
