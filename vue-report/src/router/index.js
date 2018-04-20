import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ListPage from '@/components/ListPage'
import DetailPage from '@/components/DetailPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: HelloWorld
    },
	{
      path: '/list',
      name: 'list',
      component: ListPage
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailPage
    }
  ]
})
