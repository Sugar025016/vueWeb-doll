import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/HelloWorld'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'
import Custom from '@/components/pages/Custom'
import CustomChackout from '@/components/pages/CustomCheckout'

Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {
            path:'*',
            redirect:'/'
        },
        {
            name: '首頁',
            path: '/home',
            component: Home,
            meta:{requiresAuth:true}
        },
        {
            name: 'login',
            path: '/',
            component: Login,
        },
        {
            name: '產品',
            path: '/dashboard',
            component: Dashboard,
            meta:{requiresAuth:true},
            children:[
                {
                    name: '產品',
                    path: 'products',
                    component: Products,
                },
            ]
        },
        {
            name: '產品',
            path: '/',
            component: Dashboard,
            meta:{requiresAuth:true},
            children:[
                {
                    name: '模擬功能',
                    path: 'custom',
                    component: Custom,
                },
                {
                    name: '模擬付款',
                    path: 'customer_checkout/:orderId',
                    component: CustomChackout,
                },
            ]
        },
    ]
});