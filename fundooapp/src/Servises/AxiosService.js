import axios from 'axios';

export default class AxiosService {
    
    Post(path,data){
       console.log('axiosService data :',data);
       return axios.post(path,data);
    }
}