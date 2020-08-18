import AdminLayout from '@/layouts/admin'

const adminRoutes = {
    path: '/admin',
    name: 'admin-main',
    component: AdminLayout,
    meta: {
        roles: ['admin']
    },
    children: [
        {
            path: 'user',
            name: 'user-main',
            meta: {
                permissions: ['manage user']
            },
            component: () => import('@/views/admin/users')
        },
        {
            path: 'category',
            meta: {
                permissions: ['manage category']
            },
            component: () => import('@/views/admin/categories')
        },
    ]
}

export default adminRoutes