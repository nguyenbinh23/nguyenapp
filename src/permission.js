import router from './router';
import store from './store';
import { getToken , removeToken } from '@/util/auth'

// attention : 

// Make sure to only ever call next() one time or you could run into errors or incorrect path resolution!


const configPermission = (async(to,from,next) => {
    const token = getToken()
    if(token){
        if(to.path === '/auth' || to.path === '/register'){
            next({ path: '/'})
        }
        else{
            const hasRoles = store.getters.currentUser.roles && store.getters.currentUser.roles.length > 0
            if(hasRoles){
                next()
            }else {
                try {
                    const user = await store.dispatch('user/setCurrentUser',token)
                    const { roles , permissions } = await user
                    store.dispatch('permission/generateRoutes', { roles, permissions })
                        .then(response => {
                            // dynamically add accessible routes
                            router.addRoutes(response);
                            // hack method to ensure that addRoutes is complete
                            // set the replace: true, so the navigation will not leave a history record
                        })
                        .then(() => next({ ...to, replace: true }));
                }catch(e){
                    removeToken()
                    next('/auth')
                }
            }
        }
    }else{
        next()
    }
})


export default configPermission