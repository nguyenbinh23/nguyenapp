<template>
    <v-row
    justify="center"
    >
        <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
        >
            <v-card>
                <v-card-title>
                    Đăng nhập
                </v-card-title>
                <v-card-text>
                <form>
                    <v-text-field
                        v-model="email"
                        :error-messages="emailErrors"
                        label="E-mail"
                        required
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                    ></v-text-field>
                    <v-text-field
                        class="mb-5"
                        type="password"
                        v-model="password"
                        :error-messages="passwordErrors"
                        label="Mật khẩu"
                        required
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                    ></v-text-field>
                    <p class="red--text" v-if="redirectError">{{redirectError}}</p>
                    <v-btn class="mr-2" @click="submit">Đăng nhập</v-btn>
                    <v-btn class="mr-2" @click="clear">Làm mới</v-btn>
                    <v-btn 
                        class="mr-2" 
                        icon
                        @click="$store.commit('app/SET_ISLOADING',true)" link href="https://nguyenbinh.sharedwithexpose.com/api/socialite/facebook/redirect">
                            <v-icon color="light-blue">
                                mdi-facebook
                            </v-icon>
                    </v-btn>
                    <v-btn 
                        @click="$store.commit('app/SET_ISLOADING',true)" 
                        link 
                        href="https://nguyenbinh.sharedwithexpose.com/api/socialite/github/redirect"  
                        icon>
                            <v-icon>
                                mdi-github
                            </v-icon>
                    </v-btn>
                    <v-btn v-if="redirectUrl" @click="$router.push(redirectUrl)" class="float-right">Trở về</v-btn>
                </form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex' 
import { login } from '@/api/auth' 
import { validationMixin } from 'vuelidate'
import { required , email } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    validations: {
        password: { required },
        email: { required, email },
    },
    data(){
        return {
            redirectData: this.$route.query.data ||  null,
            redirectError: this.$route.query.error ||  null,
            redirectUrl: this.$route.query.redirectUrl || null,
            password: '',
            email: '',
        }
    },
    computed: {
        passwordErrors () {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Hãy nhập mật khẩu')
            return errors
        },
        emailErrors () {
            const errors = []
            if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Email chưa phù hợp')
                !this.$v.email.required && errors.push('Hãy nhập email')
            return errors
        },
    },
    created(){
        this.handleRedirectData()
    },
    methods: {
        ...mapActions('user', [
            'setCurrentUser'
        ]),
        async submit () {
            this.$v.$touch()
            if(!this.$v.$invalid){
                try {
                    let credentitals = {
                        password: this.password,
                        email: this.email
                    }
                    const { data } = await login(credentitals)
                    const user = await this.$store.dispatch('user/setCurrentUser',data.token)
                    //Kiểm tra và đưa đến route đúng với quyền hạn
                        user.roles.find(v => v.name === 'admin') 
                        ? this.$router.push({ path: '/admin'})
                        : this.$router.push('/')
                    }
                catch (error) {
                    console.log(error)
                }
            }
        },
        handleRedirectData(){
            if(this.redirectData !== null){
                this.setCurrentUser(this.redirectData)
                    .then(res => {
                        const user = res
                        user.roles.find(v => v.name === 'admin') 
                        ? this.$router.push({ path: '/admin'})
                        : this.$router.push('/')
                        this.$store.commit('app/SET_ISLOADING',false)
                    })
                    .catch(err => {
                        this.$store.commit('app/SET_ISLOADING',false)
                    })
            }
        },
        clear () {
            this.$v.$reset()
            this.password = ''
            this.email = ''
        },
    },
}
</script>