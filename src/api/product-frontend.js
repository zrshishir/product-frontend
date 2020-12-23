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

    storeData(token, secondUrl, storeData){
        return axios.post(`${ROOT_URL}/${secondUrl}`, storeData,{
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
}