import { asyncRoutes , basicRoutes  } from '@/router'


//kiểm tra có thể truy cập vào đường route
function canAccess(roles, permissions , route){
    if(route.meta){
        //mặc định cho true nếu có thẻ meta
        let hasRole = true
        let hasPermission = true
        if(route.meta.roles || route.meta.permissions){

            hasRole = false
            hasPermission = false
            if(route.meta.roles){
                hasRole = roles.some(role => route.meta.roles.includes(role))
            }

            if(route.meta.permissions){
                hasPermission = permissions.some(permission => route.meta.permissions.includes(permission))
            }
        }
        return hasRole || hasPermission
    }
}

//tìm các routes của role
function filterAsyncRoutes(routes, roles, permissions){
    const res = [];
    routes.forEach(route => {
        const tmp = { ...route }
        if(canAccess( roles, permissions, tmp)){
            //Kiểm tra có route con? nếu có thì cho tiếp tục kiểm tra permissions và quyền
            if(tmp.children){
                tmp.children = filterAsyncRoutes(tmp.children,roles,permissions)
            }
            res.push(tmp)
        }
    })
    return res  // trả về các routes được quyền truy cập và sử dụng
}
const state = {
    routes: [],
    addRoutes: []
}
const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes;
        state.routes = basicRoutes.concat(routes);
    },
}
const actions = {
    generateRoutes({commit}, { roles , permissions }){
        return new Promise(res => {
            let accessedRoutes;
            if(roles.includes('áds')){
                accessedRoutes = asyncRoutes
            }else 
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles , permissions)

            commit('SET_ROUTES',accessedRoutes)
            res(accessedRoutes);
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}