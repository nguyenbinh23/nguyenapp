import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layouts/home'
import adminRoutes from './modules/admin'

Vue.use(Router)

export const basicRoutes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/homepage')
            },
            {
                path: 'categories',
                name: 'home-categories',
                component: () => import('@/views/homepage/categories'),
                props: true,
                children: [
                    {
                        path: ':category/articles',
                        name: 'home-categories-articles',
                        props: true,
                        component: () => import('@/views/homepage/categories/components/ArticleList.vue')        
                    }
                ]
            },
            {
                path: 'students',
                name: 'home-student',
                component: () => import('@/views/homepage/students'),
                props: true,
                children: [
                    {
                        path: 'point-calculator',
                        name: 'student-point-calculator',
                        component: () => import('@/views/homepage/students/point-calculator')        
                    }
                ]
            },
            {
                path: 'chatroom',
                name: 'chatroom',
                component: () => import('@/views/homepage/chatroom') 
            }
        ]
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/views/auth/login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/register.vue')
    },
    {
        path: '*',
        name: '404page',
        component: () => import('@/views/errors/404page.vue')
    }
]

export const asyncRoutes = [
    adminRoutes,
];

const createRoutes = () => new Router({
    mode: 'history',
    routes: basicRoutes
})

const router = createRoutes()

export default router