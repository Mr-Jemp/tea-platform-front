import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/Home.vue'
import Sort from '../components/sort/Sort.vue'
import Shop from '../components/shop/Shop.vue'
import Car from '../components/car/Car.vue'
import Me from '../components/me/Me.vue'

import Search from '../components/new/Search.vue'
import Select_pay from '../components/new/Select_pay.vue'
import Confirm_order from '../components/new/Confirm_order.vue'
import Shop_address from '../components/new/Shop_address.vue'
import Set from '../components/new/Set.vue'
import About from '../components/new/About.vue'
import Contact from '../components/new/Contact.vue'
import Friend from '../components/new/Friend.vue'
import Network from '../components/new/Network.vue'
import Login from '../components/new/Login.vue'
import Reg from '../components/new/Reg.vue'
import Binding from '../components/new/Binding.vue'
import Bill_detail from '../components/new/Bill_detail.vue'
import Personal from '../components/new/Personal.vue'
import Grade from '../components/new/Grade.vue'
import Wallet from '../components/new/Wallet.vue'
import Withdraw from '../components/new/Withdraw.vue'
import Record from '../components/new/Record.vue'
import Invite from '../components/new/Invite.vue'
import Compile from '../components/new/Compile.vue'
import Seckill from '../components/new/Seckill.vue'
import Integral from '../components/new/Integral.vue'
import Video from '../components/new/Video.vue'
import Video_play from '../components/new/Video_play.vue'
import Result from '../components/new/Result.vue'
import Details from '../components/new/Details.vue'
import Logist from '../components/new/Logist.vue'
import Evaluate from '../components/new/Evaluate.vue'
import Return from '../components/new/Return.vue'
import Bill from '../components/new/Bill.vue'
import My_order from '../components/new/My_order.vue'
import Order_detail from '../components/new/Order_detail.vue'
import Idea from '../components/new/Idea.vue'
import Allowinvite from '../components/new/Allowinvite.vue'
import Open_shop from '../components/new/Open_shop.vue'


Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/sort',
      name: 'sort',
      component: Sort
    }, {
      path: '/shop',
      name: 'shop',
      component: Shop
    }, {
      path: '/car',
      name: 'car',
      component: Car
    }, {
      path: '/me',
      name: 'me',
      component: Me
    }

    ,{
      path: '/search',
      name: 'search',
      component: Search
    },{
      path: '/select_pay',
      name: 'select_pay',
      component: Select_pay
    },{
      path: '/confirm_order',
      name: 'confirm_order',
      component: Confirm_order
    },{
      path: '/shop_address',
      name: 'shop_address',
      component: Shop_address
    },{
      path: '/set',
      name: 'set',
      component: Set
    },{
      path: '/about',
      name: 'about',
      component: About
    },{
      path: '/contact',
      name: 'contact',
      component: Contact
    },{
      path: '/friend',
      name: 'friend',
      component: Friend
    },{
      path: '/network',
      name: 'network',
      component: Network
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/reg',
      name: 'reg',
      component: Reg
    },{
      path: '/binding',
      name: 'binding',
      component: Binding
    },{
      path: '/bill_detail',
      name: 'bill_detail',
      component: Bill_detail
    },{
      path: '/personal',
      name: 'personal',
      component: Personal
    },{
      path: '/grade',
      name: 'grade',
      component: Grade
    },{
      path: '/wallet',
      name: 'wallet',
      component: Wallet
    },{
      path: '/withdraw',
      name: 'withdraw',
      component: Withdraw
    },{
      path: '/record',
      name: 'record',
      component: Record
    },{
      path: '/invite',
      name: 'invite',
      component: Invite
    },{
      path: '/compile',
      name: 'compile',
      component: Compile
    },{
      path: '/seckill',
      name: 'seckill',
      component: Seckill
    },{
      path: '/integral',
      name: 'integral',
      component: Integral
    },{
      path: '/video',
      name: 'video',
      component: Video
    },{
      path: '/video_play',
      name: 'video_play',
      component: Video_play
    },{
      path: '/result',
      name: 'result',
      component: Result
    },{
      path: '/details',
      name: 'details',
      component: Details
    },{
      path: '/logist',
      name: 'logist',
      component: Logist
    },{
      path: '/evaluate',
      name: 'evaluate',
      component: Evaluate
    },{
      path: '/return',
      name: 'return',
      component: Return
    },{
      path: '/bill',
      name: 'bill',
      component: Bill
    },{
      path: '/my_order',
      name: 'my_order',
      component: My_order
    },{
      path: '/order_detail',
      name: 'order_detail',
      component: Order_detail
    },{
      path: '/idea',
      name: 'idea',
      component: Idea
    },{
      path: '/allowinvite',
      name: 'allowinvite',
      component: Allowinvite
    },{
      path: '/open_shop',
      name: 'open_shop',
      component: Open_shop
    }


  ]
})
