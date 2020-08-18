export default {
    carousel: state => state.app.carousel,
    modal: state => state.app.modal,
    device: state => state.app.device,
    navbar: state => state.app.navbar,
    users: state => state.user.users,
    login: state => state.user.handleLogin,
    currentUser: state => state.user.currentUser,
    sideBar: state => state.app.sideBar,
    loading: state => state.app.loading,
    categories: state => state.category.categories,
    roles: state => state.user.currentUser.roles,
    permissions: state => state.user.currentUser.permissions,
    homepage: state => state.app.homepage
}