import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Map from './views/Map';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/map',
            name: 'map',
            component: Map
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
