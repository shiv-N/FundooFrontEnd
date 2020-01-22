import axios from 'axios';
var Baseurl="https://localhost:44370/api/";

export default class AxiosService {
    
    Post(path,data,tokenAuth){
       console.log('axiosService data of post:',data,tokenAuth);
       return axios.post(Baseurl+path,data,tokenAuth);
    }
    
    GET(path,data,tokenAuth){
        console.log('axiosService data of get:',path,data,tokenAuth);
        return axios.get(Baseurl+path,data,tokenAuth);
     }
     
     PUT(path,data,tokenAuth){
        console.log('axiosService data of put:',path,data,tokenAuth);
        return axios.put(Baseurl+path,data,tokenAuth)
     }

     DELETE(path,tokenAuth){
        console.log('axiosService data of delete:',path,tokenAuth);
        return axios.delete(Baseurl+path,tokenAuth);
     }
}