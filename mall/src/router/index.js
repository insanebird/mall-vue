import Vue from 'vue'
import Router from 'vue-router'
import Header from '../components/Header'
import Index from '../components/Index'
import ProductInfo from '../components/ProductInfo'
import CartList from '../components/Cart'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import OrderList from '../components/OrderList'
import Admin from '../components/Admin'
import AllProduct from '../components/AllProduct'
import Category from '../components/Category'
import AddProduct from "../components/AddProduct";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      components: {
        header: Header,
        main: Index
      }
    }, {
      path: '/productInfo/:id',
      name: 'productInfo',
      components: {
        header: Header,
        main: ProductInfo
      }
    }, {
      path: '/cartList',
      name: 'cartList',
      components: {
        header: Header,
        main: CartList
      }
    }, {
      path: '/signUp',
      name: 'signUp',
      components: {
        header: SignUp
      }
    }, {
      path: '/signIn',
      name: 'signIn',
      components: {
        header: SignIn
      }
    }, {
      path: '/orderList',
      name: 'orderList',
      components: {
        header: Header,
        main: OrderList
      }
    }, {
      path: '/admin',
      name: 'admin',
      components: {
        header: Admin,
      },
      children: [
        {
          path: 'allProduct',
          name: 'allProduct',
          component: AllProduct
        }, {
          path: 'category',
          name: 'category',
          component: Category
        }, {
          path: 'addProduct',
          name: 'addProduct',
          component: AddProduct
        }
      ]
    }
  ]
})
