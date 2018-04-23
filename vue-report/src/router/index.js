import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ListPage from '@/components/ListPage'
import DetailPage from '@/components/DetailPage'
import News from '@/components/News'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
	{
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: HelloWorld
    },
	{
      path: '/list',
      name: 'list',
      component: ListPage
    },
	{
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/news/detail/:id',
      name: 'detail',
      component: DetailPage
    }
  ]
})
