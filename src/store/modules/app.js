

const state =  {
    sideBar: false,
    loading: false,
    navbar: false,
    device: 'extraLarge',
    carousel: {
        width: 600,
        height: 450,
        status: true,
    },
    homepage: {
        leftSection: true
    }, 
    modal: {
        width: 0,
        height: 0,
    }
}

const mutations = {
    SET_ISLOADING(state,payload){
        state.loading = payload
    }
}
const actions = {
    toggleDevice({commit,state},payload){
        state.device = payload
    },
    toggleNavbar({commit,state},payload){
        state.navbar = !state.navbar
    },
    resizeCarousel({commit,state}){
        if(state.device === 'extraLarge'){
            state.carousel.width = 550
            state.carousel.height = 350
        }if(state.device === 'large'){
            state.carousel.width = 450
            state.carousel.height = 350
        }if(state.device === 'medium'){
            state.carousel.width = 350
            state.carousel.height = 250
        }if(state.device === 'small'){
            state.carousel.width = 350
            state.carousel.height = 250
        }if(state.device === 'extraSmall'){
            state.carousel.width = 300
            state.carousel.height = 250
        }
    },
    resizeModal({commit,state}){
        if(state.device === 'extraLarge'){
            state.modal.width = 550
            state.modal.height = 550
        }if(state.device === 'large'){
            state.modal.width = 500
            state.modal.height = 550
        }if(state.device === 'medium'){
            state.modal.width = 450
            state.modal.height = 550
        }if(state.device === 'small'){
            state.modal.width = 400
            state.modal.height = 550
        }if(state.device === 'extraSmall'){
            state.modal.width = 350
            state.modal.height = 550
        }
    },
    handleLeftSection({commit,state}){
        state.homepage.leftSection = !state.homepage.leftSection
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}