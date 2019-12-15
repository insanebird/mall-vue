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
import AddProduct from "../components/AddProduct"
import AllOrder from "../components/AllOrder"
import TodayOrder from "../components/TodayOrder";
import RetailerList from "../components/RetailerList";
import BecomeRetailer from "../components/BecomeRetailer";
import MyShop from '../components/MyShop'
import RetailerOrder from '../components/RetailerOrder'
import RetailerProduct from '../components/RetailerProduct'
import Forum from '../components/Forum'
import TopicDetail from '../components/TopicDetail'
import AddCategory from '../components/AddCategory'
import UserList from '../components/UserList'
import VIPList from '../components/VIPList'
import SearchProduct from '../components/SearchProduct'
import RetailerInformation from '../components/retailerInformation'
import Images from '../components/Images'

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
        }, {
          path: 'allOrder',
          name: 'allOrder',
          component: AllOrder
        }, {
          path: 'todayOrder',
          name: 'todayOrder',
          component: TodayOrder
        }, {
          path: 'retailerList',
          name: 'retailerList',
          component: RetailerList
        }, {
          path: 'addCategory',
          name: 'addCategory',
          component: AddCategory
        }, {
          path: 'userList',
          name: 'userList',
          component: UserList
        }, {
          path: 'VIPList',
          name: 'VIPList',
          component: VIPList
        }, {
          path: 'images',
          name: 'image',
          component: Images
        }
      ]
    }, {
      path: '/becomeRetailer',
      name: 'becomeRetailer',
      components: {
        header: Header,
        main: BecomeRetailer
      }
    }, {
      path: '/myShop',
      name: 'myShop',
      components: {
        header: MyShop
      },
      children: [
        {
          path: 'retailerInformation',
          name: 'retailerInformation',
          component: RetailerInformation
        }, {
          path: 'todayOrder',
          name: 'todayOrder',
          component: TodayOrder
        }, {
          path: 'retailerOrder',
          name: 'retailerOrder',
          component: RetailerOrder
        }, {
          path: 'addProduct',
          name: 'addProduct',
          component: AddProduct
        }, {
          path: 'retailerProduct',
          name: 'retailerProduct',
          component: RetailerProduct
        }
      ]
    },
    {
      path: '/forum',
      name: 'forum',
      components: {
        header: Forum
      }
    }, {
      path: '/topicDetail/:id',
      name: 'topicDetail',
      components: {
        header: TopicDetail
      }
    }, {
      path: '/searchProduct',
      name: 'searchProduct',
      components: {
        header: Header,
        main: SearchProduct
      }
    }, {
      path: '/retailerInformation',
      name: 'retailerInformation',
      components: {
        header: RetailerInformation
      }
    }
  ]
})
