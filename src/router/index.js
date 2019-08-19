import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
import Detail from '../components/Detail/Index.vue'

Vue.use(Router)


export default new Router({
    routes: [{
        path: '/',
        component: Index,
        children: [
            {
                path: '',
                component: Detail,
                name: 'default'
            },
            {
                path: '/detail/creat',
                component: Detail,
                name: 'creat'
            },
            {
                path: '/detail/add',
                component: Detail,
                name: 'add'
            },
            {
                path: '/detail/list',
                component: Detail,
                name: 'list'
            }
        ]
    }]
})
