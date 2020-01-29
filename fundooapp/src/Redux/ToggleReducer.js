import {GRID_VIEW,LIST_VIEW} from './ToggleActionType'
import {SearchNote} from './SearchActionType'
import {Label} from './LabelActionType'
const Display="display";

const primaryState={
    toggleView:false,
    keyword:null,
    UserLabels: [],
    labelValue:null
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
        case Label:{
            return{
                ...state,
                UserLabels:action.payload
            }
        }
        case Display:{
            return{
                ...state,
                labelValue:action.payload
            }
        }
        default:return state
    }
}

export default Reducer;