import Vue from 'vue'
import Router from 'vue-router'
import utils from '@/utils/utils.js'
import Layout from '../views/Layout/Layout'
import HomeLayout from '../views/Layout/HomeLayout'
Vue.use(Router)
export default new Router({
  routes: [
      { path: '/', redirect: 'Login'},
      //todo Dome
      utils.importVueInit("Dome/Dome"),
      //todo 登陆
      utils.importVueInit("Login/Login"),
      utils.importVueInit({
          name:"Layout/Layout",
          path:"/app",
          component: Layout,
          redirect: '/app/HomeLayout',
          children:[
              utils.importVueInit("Login/Register","register","注册"),
              utils.importVueInit("Login/ForgetPwd","forgetPwd","忘记密码"),
              utils.importVueInit({
                  name:"Layout/HomeLayout",
                  path:"/app/HomeLayout",
                  component: HomeLayout,
                  redirect: '/app/HomeLayout/home',
                  children:[

                      //todo 分期与订单
                      utils.importVueInit("Home/Home","/app/HomeLayout/home","车险分期",{
                          meta:{
                              showBack:false,
                              head_type:1,
                              icon_url:'/app/HomeLayout/messages'
                          },
                      }),
                      utils.importVueInit("Order/Order","/app/HomeLayout/order","分期订单",{
                          meta:{
                              showBack:false,
                          }
                      }),
                      utils.importVueInit("Home/SelectType","/app/HomeLayout/selectType","分期付款",{meta:{navShow:false}}),
                      utils.importVueInit("Home/Upload","/app/HomeLayout/upload","上传影像资料",{meta:{navShow:false}}),
                      utils.importVueInit("Home/Authentication","/app/HomeLayout/authentication","实名认证",{meta:{navShow:false}}),
                      utils.importVueInit("Home/Pending","/app/HomeLayout/pending","等待审核",{meta:{navShow:false}}),
                      utils.importVueInit("Order/OrderDetails","/app/HomeLayout/orderdetails","订单详情",{meta:{navShow:false}}),
                      utils.importVueInit("Messages/Messages","/app/HomeLayout/messages","消息中心",{meta:{navShow:false}}),
                      utils.importVueInit("Messages/OrderMessages","/app/HomeLayout/orderMessages","订单消息",{meta:{navShow:false}}),
                      utils.importVueInit("Messages/SystemMessages","/app/HomeLayout/systemMessages","系统消息",{meta:{navShow:false}}),
                      utils.importVueInit("Messages/MessageDetails","/app/HomeLayout/messageDetails","消息详情",{meta:{navShow:false}}),
                      utils.importVueInit("Pay/Pay","/app/HomeLayout/pay","支付手续费",{meta:{navShow:false}}),

                      //todo 工具
                      utils.importVueInit("Tool/Tool","/app/HomeLayout/Tool","工具",{
                          meta:{
                              showBack:false,
                          }
                      }),
                      utils.importVueInit("Tool/Cxjsq","/app/HomeLayout/cxjsq","车险分期计算器",{meta:{navShow:false}}),
                      utils.importVueInit("Tool/Hljs","/app/HomeLayout/hljs","汇率计算",{meta:{navShow:false}}),
                      utils.importVueInit("Tool/SelectRate","/app/HomeLayout/selectrate","币种切换",{meta:{navShow:false}}),

                      //todo 用户中心
                      utils.importVueInit("User/User","/app/HomeLayout/User","我的",{
                          meta:{
                              showBack:false,
                          }
                      }),
                      utils.importVueInit("User/Wdtd","/app/HomeLayout/wdtd","我的团队",{meta:{navShow:false}}),
                      utils.importVueInit("User/Tdxq","/app/HomeLayout/tdxq","我的客户",{meta:{navShow:false}}),
                      utils.importVueInit("User/Wdrw","/app/HomeLayout/wdrw","详情",{meta:{navShow:false}}),
                      utils.importVueInit("User/Wdyj","/app/HomeLayout/wdyj","我的佣金",{meta:{navShow:false}}),
                      utils.importVueInit("User/Tx","/app/HomeLayout/tx","佣金提现",{meta:{navShow:false}}),
                      utils.importVueInit("User/Xzzh","/app/HomeLayout/xzzh","选择账户",{meta:{
                          navShow:false,
                          head_type:2,
                          head_txt:"管理",
                          icon_url:'/app/HomeLayout/wdyhk'
                      }}),
                      utils.importVueInit("User/Lsyj","/app/HomeLayout/lsyj","历史累计佣金",{meta:{
                          navShow:false,
                      }}),
                      utils.importVueInit("User/Wdyhk","/app/HomeLayout/wdyhk","我的银行卡",{meta:{
                          navShow:false,
                      }}),
                  ]
              }),

          ]
      }),
  ]
})
