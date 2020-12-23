import api from '../../api/product-frontend'
// import router from '../../router';

const state = {
    error: '',
    statusCode:'',
    errorMsg: '',
    indexData: [],
    test: ''
}

const getters = {
    error: (state) =>{
        return state.error
    },
    statusCode: (state) => {
        return state.statusCode
    },
    errorMsg: (state) => {
        return state.errorMsg
    },
    
    indexData: (state) => {
        return state.indexData
    },
}

const actions = {

    async setIndexData({rootState, commit}, parameters){
        const{ token } = rootState.auth
        const response = await api.getData(token, parameters[0])
        commit('setResponse', response)
    },

    async store({ rootState, commit},parameters){
        const { token } = rootState.auth
        const response = await api.storeData(token, parameters[0], parameters[1])
        commit('setTest', response)
    },
    
    async delete({rootState, commit}, parameters){
        const { token } = rootState.auth
        const response = await api.deleteData(token, parameters[0], parameters[1])
        commit('setResponse', response)
    },
    
    setErrorZero({commit}){
        commit('setErrorToZero')
    }
    
}

const mutations = {
    setResponse: (state, responseData) => {
        // state.test = responseData
        if(responseData.data.error){
            state.statusCode = responseData.data.statusCode
            state.error = responseData.data.error
            state.errorMsg = responseData.data.message
        }else{
            state.error = responseData.data.error
            state.statusCode = responseData.data.statusCode
            state.errorMsg = responseData.data.message
            state.indexData = responseData.data.data
        }
    },
    setErrorToZero: (state) => {
        state.error = 0
        state.responseMsg = ""
    },
    setTest: (state, credentials) => {
        state.test = credentials
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}