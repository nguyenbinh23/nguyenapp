

const state =  {
    categories: [],
}


const mutations = {
    CHANGE_CATE_NAME(state,payload){
        let index = state.categories.findIndex(item => {
            return item.name === payload.name
        })
        if(index >= 0){
            state.categories[index] = payload.newName
        }
    }
}

const actions = {
    changeCateName({commit},payload){
        return new Promise((res,rej) => {
            setTimeout(() => {
                let a = true
                if(a){
                    commit('CHANGE_NAME',payload)
                    console.log('Đổi thành công')
                    res(payload)
                }else rej("Thất bại")
            },2000)
        })
    },
}

export default {
    namespaced: true,
    state,
    //    getters,
    mutations,
    actions
}