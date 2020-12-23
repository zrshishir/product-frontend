import api from '../../api/product-frontend'
import router from '../../router'


const state = {
    token: window.localStorage.getItem('e-token'),
    error: "",
    errorStatus: "",
    successStatus: "",
    responseMsg: "",
    userType: window.localStorage.getItem('userType'),
    test: ""
};

const getters = {
    isLoggedIn: (state) => {
        return !!state.token;
    },
    getMenus: (state) => {
        if(! state.token){
            return [
                {
                    title: 'Authentication', items:[
                        {icon:'face', title: 'Sign up', link: '/signup'},
                        {icon: 'lock_open', title: 'Sign in', link: '/signin'}
                    ]
                }
            ]
        }else{
            return [
                {
                    title: 'Product', items:[
                        {icon:'face', title: 'Product', link: '/product'},
                    ]
                },
            ]
        }
    },
    getAuthResponse: (state) => {
        if(state.error){
            return state.responseMsg
        }
    },
    getAuthSigninResponse: (state) => {
        if(state.error){
            return state.responseMsg
        }
    },
};

const actions = {
    async login ({commit}, allLogData) {
        const response = await api.login(allLogData, 'login')
        if(response.data.error == 1){
            commit('setAuthResponse', response)
            router.push('/signin')
        }else{
            commit('setToken', response)
            window.localStorage.setItem('e-token', response.data.data.users.api_token)
            window.localStorage.setItem('userType', response.data.data.users.user_type_id)
            router.push('/')
        }
    },

    async register ({commit},allRegData) {
       const response = await api.register(allRegData, 'signup')
        if(response.data.error){
         commit('setAuthResponse', response)
         router.push('/signup')
        }else{
            commit('setToken', response)
            window.localStorage.setItem('e-token', response.data.data.users.api_token)
            window.localStorage.setItem('userType', response.data.data.users.user_type_id)
            router.push('/')
        }
    },

    async logout({ commit }){ // we use commit instead of mutations there are several reasons for that. there might be several request  
        commit('setToken', "")
        window.localStorage.removeItem('e-token')
        router.push('/')
    },

    setErrorZero({commit}){
        commit('setErrorToZero')
    }
};

const mutations = {
    setToken: (state, response) => {
        if(response == ""){
            state.token = ""
        }else{
            state.token = response.data.data.users.api_token
            state.successStatus = response.statusCode
            state.responseMsg = response.errorMsg
            state.test = response.data.data.users
            state.userType = response.data.data.users.user_type_id
        }
       
    },
    setTest: (state, response) => {
        state.test = response
    },
    setAuthResponse: (state, response) => {
        state.test = response
        state.error = response.data.error
        state.errorStatus = response.data.statusCode
        state.responseMsg = response.data.errorMsg
    },
    setErrorToZero: (state) => {
        state.error = 0
        state.responseMsg = ""
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}