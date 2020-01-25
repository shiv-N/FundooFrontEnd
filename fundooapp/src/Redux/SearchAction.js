import {SearchNote} from './SearchActionType'

export const Search=(data)=>{
    console.log('in search=>',data);
    
    return{
        type:SearchNote,
        payload:data
    }
}