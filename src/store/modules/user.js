import { getUserByToken } from '@/api/auth'
import { getToken , setToken , removeToken } from '@/util/auth'

const state =  {
    users: [
        { id: 1, name: 'Nguyễn', yearOfBirth: 1998 , job: 'developer'},
        { id: 2, name: 'Tèo', yearOfBirth: 1980 , job: 'teacher'},
        { id: 3, name: 'ABC', yearOfBirth: 1922 , job: 'worker'},
        { id: 4, name: 'Lý', yearOfBirth: 1922 , job: 'worker'},
        { id: 5, name: 'Trọng', yearOfBirth: 1922 , job: 'developer'},
        { id: 6, name: 'Duy', yearOfBirth: 1922 , job: 'teacher'},
        { id: 7, name: 'ABc', yearOfBirth: 1922 , job: 'teacher'},
    ],
    currentUser: {
        id: '',
        email: '',
        name: '',
        token: '',
        phone: '',
        type: '',
        permissions: [],
        roles: [],
    },
}
const mutations = {
    CHANGE_NAME(state,payload){
        let index = state.users.findIndex(item => {
            return item.name === payload.name
        })
        if(index >= 0){
            state.users[index] = payload.newName
        }
    },
    LOGOUT_USER(state){
        state.currentUser = {
            id: '',
            email: '',
            name: '',
            token: '',
            phone: '',
            type: '',
            permissions: [],
            roles: [],
        }
        removeToken()
    },
    SET_CURRENT_USER(state,payload){
        state.currentUser.id = payload.user.id
        state.currentUser.name = payload.user.name
        state.currentUser.email = payload.user.email
        state.currentUser.phone = payload.user.phone
        state.currentUser.type = payload.user.type
        state.currentUser.token = payload.token

        
        //Thêm roles và permissions vào user
        payload.user.roles.forEach(role => {
            //Thêm role
            state.currentUser.roles.push(role.name)   
            // trong mỗi role có nhiều permissions , chỉ cần push vào
            role.permissions.forEach(item => {
                state.currentUser.permissions.push(item.name)  
            })
        })
    },
    SET_TOKEN(state,token){
        setToken(token)
    }
}
const actions = {
    setCurrentUser({commit,state},token){
        return new Promise((res,rej) => {
            commit('SET_TOKEN',token)
            getUserByToken(token)
                .then(response => {           
                    commit('SET_CURRENT_USER',{token: token, user: response.data })             
                    res(state.currentUser)
                })
                .catch(error => rej(error))
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}