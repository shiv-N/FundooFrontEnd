import AxiosService from './AxiosService';

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

    getAllArchiveNotes(){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.GET("Notes/archive",tokenObject.tokenAuth)
    }

    getAllTrashNotes(){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.GET("Notes/trash",tokenObject.tokenAuth)
    }

    GetSearchCollaborators(data){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        } 
        return axiosObj.Post("Notes/SearchCollaborators",data,tokenObject.tokenAuth)
    }

    CollaborateNote(noteId,data){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        } 
        return axiosObj.Post("Notes/AddCollaborators/"+noteId,data,tokenObject.tokenAuth)
    }
    getCollaborators(){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.GET("Notes/Collabrators",tokenObject.tokenAuth)
    }

    ChangeColor(data,noteId){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.PUT("Notes/color/"+noteId,data,tokenObject.tokenAuth)
    }

    Archive(noteId){
        console.log(noteId);
        var data={}
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.PUT("Notes/archive/"+noteId,data,tokenObject.tokenAuth)
    }

    TrashNote(noteId){
        console.log(noteId);
        var data={}
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.PUT("Notes/Trash/"+noteId,data,tokenObject.tokenAuth)
    }

    DeleteNote(noteId){
        console.log(noteId);
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.DELETE("Notes/"+noteId,tokenObject.tokenAuth)
    }

    PinNote(noteId){
        console.log(noteId);
        var data={}
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.PUT("Notes/Pin/"+noteId,data,tokenObject.tokenAuth)
    }

    AddReminder(data,noteId){
        console.log(noteId);
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.PUT("Notes/Reminder/"+noteId,data,tokenObject.tokenAuth)
    }

    EditNote(data,noteId){
        console.log(noteId);
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.PUT("Notes/"+noteId,data,tokenObject.tokenAuth)
    }
}