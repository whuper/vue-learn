import Vue from 'vue'
import Router from 'vue-router'
import Task from '@/components/Task'
import ListPage from '@/components/ListPage'
import DetailPage from '@/components/DetailPage'
import News from '@/components/News'
import Login from '@/components/Login'
import productListPage from '@/pages/productListPage'
import CartPage from '@/pages/CartPage'
import ProductPage from '@/pages/ProductPage'
import Report from '@/pages/Report'

Vue.use(Router)

export default new Router({
  routes: [
	{
      path: '/',
      name: 'index',
      component: Task
    },
	{
      path: '/report',
      name: 'report',
      component: Report
    },
	{
      path: '/login',
      name: 'login',
      component: Login
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
    },
		{
      path: '/productList',
      name: 'productList',
      component: productListPage
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductPage
    }
  ]
})
