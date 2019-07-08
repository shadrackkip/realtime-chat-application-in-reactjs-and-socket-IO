import Axios from 'axios'

export  function getUser(id){
   
    const request = Axios.get('/api/getUser?id='+id).then((response)=>response.data)
    return{
        type:'GET_USER_DETAILS',
        payload:request
    }
}