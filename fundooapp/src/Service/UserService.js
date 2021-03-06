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
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.Post("Account/reset",data,tokenObject.tokenAuth)
        
    }
    AddImageOnNote(data){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.Post("Notes/AddImageOnNote",data,tokenObject.tokenAuth)
        
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
    addUserLabel(data){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.Post("Labels",data,tokenObject.tokenAuth)
    }
    addNoteLabel(noteId,data){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.Post("Notes/AddNoteLabel/"+noteId,data,tokenObject.tokenAuth)
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

    getLabelNote(labelName){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.GET("Notes/NoteLabel/"+labelName,tokenObject.tokenAuth)
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

    getAllLabels(){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.GET("Labels",tokenObject.tokenAuth)
    }
    getAllSearchNotes(data){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.Post("Notes/search",data,tokenObject.tokenAuth)
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

    CollaborateUserNote(noteId,data){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        } 
        return axiosObj.Post("Notes/AddCollaborators/"+noteId,data,tokenObject.tokenAuth)
    }
    SetProfilePhoto(data){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        } 
        return axiosObj.Post("Account/AddProfilePhoto",data,tokenObject.tokenAuth)
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

    AddImage(data,noteId){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.PUT("Notes/Image/"+noteId,data,tokenObject.tokenAuth)
    }
    TrashNote(noteId){
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
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.DELETE("Notes/"+noteId,tokenObject.tokenAuth)
    }
    DeleteNoteLabel(NotelabelId){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.DELETE("Notes/DeleteNoteLabel/"+NotelabelId,tokenObject.tokenAuth)
    }
    PinNote(noteId){
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
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.PUT("Notes/Reminder/"+noteId,data,tokenObject.tokenAuth)
    }

    DeleteReminder(data,noteId){
        tokenObject.tokenAuth={
            headers: {
                            'Content-Type':'application/json',
                            'Accept':'*',
                             Authorization: 'Bearer '+localStorage.getItem('Token')
                     }
        }
        return axiosObj.PUT("Notes/deleteReminder/"+noteId,data,tokenObject.tokenAuth)
    }

    EditNote(data,noteId){
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