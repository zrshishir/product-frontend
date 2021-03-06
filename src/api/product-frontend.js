import axios from 'axios'

//write your laravel project url like local.product.com or localhost url
const ROOT_URL = 'local.product-backend.com/api';


export default{
    
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

    getData(token, apiUrl){
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
    
    deleteData(token, secondUrl, item){
        return axios.delete(`${ROOT_URL}/${secondUrl}/${item}`,{
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    },   
}