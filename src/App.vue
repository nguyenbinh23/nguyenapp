<template>
  <div id="app" data-app>
    <v-app>
      <v-navigation-drawer
        color="grey darken-4"
        :width="'auto'"
        v-model="navigationDrawer.drawer"
        dark
        app
      >
            <v-list>
              <v-list-item
                v-for="item in routes"
                :key="item.title"
                link
                :to="{ path: item.path }"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                @click="navigationDrawer.drawer = !navigationDrawer.drawer">
                <v-list-item-icon>
                  <v-icon>mdi-arrow-left</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Đóng</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
      </v-navigation-drawer>

      <v-app-bar
        elevate-on-scroll
        dark
        app>
          <v-app-bar-nav-icon 
          @click="navigationDrawer.drawer = !navigationDrawer.drawer">
          </v-app-bar-nav-icon>

          <v-toolbar-title>nguyenapp</v-toolbar-title>
      
          <v-spacer></v-spacer>
          <template v-if="currentUser && currentUser.name !== ''">
            <v-btn :to="{path: '/auth'}" icon>
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>

            <v-btn
              @click="handleLogout"
              icon>
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-btn :to="{path: '/auth', query: { redirectUrl: $route.path }}" icon>
              <v-icon>mdi-login</v-icon>
            </v-btn>
          </template>
      </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main>

        <!-- Provides the application the proper gutter -->
          <v-container 
          fluid>
            <!-- If using vue-router -->
            <router-view></router-view>
          </v-container>
        </v-main>

        <v-footer app dark>
          <!-- -->
        </v-footer>
        <v-overlay
            z-index="1000" 
            absolute
            :value="app.loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-app>
  </div>
</template>

<script>
import { logout } from '@/api/auth'
import { mapState , mapGetters } from 'vuex'
export default {
  name: 'App',
  data(){
    return {
      navigationDrawer: {
        drawer: true,
      },
      routes: [
        { title: 'Trang chủ' , icon: 'mdi-view-dashboard' , path: '/' },
        { title: 'Giỏ hàng' , icon: 'mdi-cart' , path: '/cart'},
        { title: 'Các bài viết' , icon: 'mdi-newspaper' , path: '/articles' },
        { title: 'Phần mềm tính điểm đại học' , icon: 'mdi-calculator' , path: '/students/calculator' }
      ]
    }
  },
  computed: {
    ...mapState([
      'app'
    ]),
    ...mapGetters([
      'currentUser'
    ])
  },
  methods: {
    handleLogout(){
        logout()
            .then(res => this.$store.commit('user/LOGOUT_USER'))
            .catch(err => this.$store.commit('user/LOGOUT_USER'))
    },
  }
}
</script>

<style lang="scss">
  @import '~vuetify/src/styles/main.sass';
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');

  $color-pack: false;
  body {
    font-family: 'Roboto'
  }


 
</style>
