import {GRID_VIEW,LIST_VIEW} from './ToggleActionType'
import {SearchNote} from './SearchActionType'

const primaryState={
    toggleView:false,
    keyword:null
}

const Reducer =(state=primaryState,action)=>{
    
    switch(action.type){
        case GRID_VIEW:
            return {
                ...state,
                toggleView:false
            }
        case LIST_VIEW:
            return{
                ...state, 
                toggleView:true
            }
        case SearchNote:
            return{
                ...state,
                keyword:action.payload
            }
        default:return state
    }
}

export default Reducer;