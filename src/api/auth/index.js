import request from '../../util/request'

export function login(credentitals){
    return request({
        url: '/auth/login',
        method: 'POST',
        data: credentitals,
    })
}

export function getUserByToken(){
    return request({
        url: '/auth/get-user',
        method: 'GET', 
    })
}

export function logout(){
    return request({
        url: '/auth/logout',
        method: 'POST',
    })
}

export function register(data){
    return request({
        url: '/auth/register',
        method: 'POSt'
    })
}

export function checkUniqueMail(email){
    return request({
        url: `/auth`,
        params: {
            q: {
                email: email
            }
        },
        method: 'GET',
    })
}