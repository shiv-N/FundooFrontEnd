import AxiosService from '../Servises/AxiosService';

var axiosObj = new AxiosService();
let tokenObject={
    tokenAuth:''
}
export default class UserService{


    Login(data){
        return axiosObj.Post("Account/login",data,tokenObject.tokenAuth)
    }

    RegisterUser(data){
        return axiosObj.Post("Account/register",data,tokenObject.tokenAuth)
    }

    ForgetPassword(data){
        return axiosObj.Post("Account/forgot",data,tokenObject.tokenAuth)
    }

    resetPassword(data){
        console.log("token check",data);
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.Post("Account/reset",data,tokenObject.tokenAuth)
        
    }

    addUserNote(data){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.Post("Notes",data,tokenObject.tokenAuth)
    }
    getAllNote(){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.GET("Notes",tokenObject.tokenAuth)
    }
}