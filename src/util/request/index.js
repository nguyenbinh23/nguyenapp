import store from '@/store';
import axios from 'axios'
import { getToken } from '@/util/auth'

// Create axios instance  // 
/*tạo ra: 
    axios({
        baseURL: process.env.VUE_APP_BASE_API_URL,
        timeout: 10000, // Request timeout
    })
*/
const service = axios.create({   
    baseURL: process.env.VUE_APP_BASE_API_URL,
    timeout: 15000, // Request timeout
});


  // Request intercepter
service.interceptors.request.use(
    config => {
        store.commit('app/SET_ISLOADING',true)
        const token = getToken();
        if(token) {
            config.headers['Authorization'] = 'Bearer ' +token; // Set JWT token
        }
        return config;
    },
    error => {
        // Do something with request error
        console.log(error); // for debug
        Promise.reject(error);
    }
);
  
  // response pre-processing
service.interceptors.response.use(
    response => {
        store.commit('app/SET_ISLOADING',false)
        return Promise.resolve(response)
    },
    error => {
        store.commit('app/SET_ISLOADING',false)
        let message = error.message;
        if (error.response.data && error.response.data.errors) {
            message = error.response.data.errors;
        } else if (error.response.data && error.response.data.error) {
            message = error.response.data.error;
        }
        return Promise.reject(error);
});
  
export default service;
  