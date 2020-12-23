import axios from 'axios'


const ROOT_URL = 'http://local.product-backend.com/api';


export default{
    getData(secondUrl){
        return axios.post(`${ROOT_URL}/${secondUrl}`,{
            headers:{
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    },

    login(loginCredentials, secondUrl){
        return axios.post(`${ROOT_URL}/${secondUrl}`, loginCredentials,{
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },

    register(regCredentials, secondUrl){
        return axios.post(`${ROOT_URL}/${secondUrl}`, regCredentials,{
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },

    logout(token){
        return axios.get(`${ROOT_URL}/logout`,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    },

    fetchAllData(token, apiUrl, fundingStatusId){
        return axios.get(`${ROOT_URL}/${apiUrl}/${fundingStatusId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }, 

    fetchData(token, apiUrl){
        return axios.get(`${ROOT_URL}/${apiUrl}`,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }, 

    storeData(token, secondUrl, storeData){
        return axios.post(`${ROOT_URL}/${secondUrl}`, storeData,{
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    },

    updateData(token, id, updateData, secondUrl){
        return axios.put(`${ROOT_URL}/${secondUrl}/${id}`, updateData,{
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    },
    
    deleteData(token, secondUrl, item){
        return axios.delete(`${ROOT_URL}/${secondUrl}/${item}`,{
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    },

    getQuestion(token, apiUrl, lessonId){
        return axios.get(`${ROOT_URL}/${apiUrl}/${lessonId}` , {
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    },

    changeDataStatus(token, itemId, apiUrl){
        return axios.get(`${ROOT_URL}/${apiUrl}/${itemId}` , {
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }
}