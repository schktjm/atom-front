import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/list',
            name: 'RouteList',
            component: () => import('./views/RouteList')
        },
        {
            path: '/detail/:id',
            name: 'RouteDetail',
            component: () => import('./views/RouteDetail')
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('./components/DetailSearch')
        },
        {
            path: '*',
            component: Home
        }
    ]
})
