import {GRID_VIEW,LIST_VIEW} from './ToggleActionType'

const primaryState={
    toggleView:false
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
        default:return state
    }
}

export default Reducer;