import AxiosService from '../Servises/AxiosService';

var axiosObj = new AxiosService;
export default class UserService{

    Login(data){
        return axiosObj.Post("https://localhost:44370/api/Account/login",data)
    }

    RegisterUser(data){
        return axiosObj.Post("https://localhost:44370/api/Account/register",data)
    }

    ForgetPassword(data){
        return axiosObj.Post("https://localhost:44370/api/Account/forgot",data)
    }
}