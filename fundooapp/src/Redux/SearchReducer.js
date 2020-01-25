import {SearchNote} from './SearchActionType'

const primaryState={
    keyword:null
}

const searchReducer=(state=primaryState,action)=>{
    if(action.Type===SearchNote){
        console.log('in redux',action.payload);
        return {
            ...state,
            keyword:action.payload
        }
    }
    else{
        return state;
    }
}

export default searchReducer