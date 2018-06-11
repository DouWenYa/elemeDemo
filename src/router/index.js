import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/common/goods/goods'
import Seller from '@/components/common/seller/seller'
import Ratings from '@/components/common/ratings/ratings'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
      {
        path: '/goods',
        name: 'goods',
        component: Goods
      },
      {
        path: '/seller',
        name: 'seller',
        component: Seller
      },
      {
        path: '/ratings',
        name: 'ratings',
        component: Ratings
      }
  ]
})
